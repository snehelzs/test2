import datetime
from decimal import Decimal
import numpy as np
import sqlalchemy
import pandas as pd
import json
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError, OperationalError
from dotenv import load_dotenv
import os
import math
from datetime import date


load_dotenv()
today = str(date.today())


openemr = os.getenv('openemr')
LHPProd = os.getenv('LHPProd')
LHP_VendorData = os.getenv('LHP_VendorData')



def get_error_sum(data):
    error_sum = 0
    for item in data:
        error_sum += item.get('Error Flag',0)
    return error_sum



def test_case_num(x) :
    if x < 10:
        result_string = f"TC00{x}"
    elif x < 100:
        result_string = f"TC0{x}"
    else:
        result_string = f"TC{x}"
    return result_string



def convert_2_flt(value):
    try: 
        return float(value)
    except ValueError:
        return 0.0



def convert_to_serializable(data):
    if isinstance(data, dict):
        return {k: convert_to_serializable(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [convert_to_serializable(i) for i in data]
    elif isinstance(data, np.ndarray):
        return data.tolist()
    elif isinstance(data, (np.int64, np.float64)):
        return data.item()
    else:
        return data



def LAB_RESULTS_CHECK(source, df, measure):
    try:        
        lab_df = pd.read_csv('./configs/lionic.csv')
        for col in ['Acceptable Value (MIN)', 'Acceptable Value (MAX)']:
            lab_df[col] = pd.to_numeric(lab_df[col], errors='coerce')

        value_list = []
    
        source_rows = df[df['DataSource'] == source]
        for index, row in source_rows.iterrows():
            test_case_id = row['TC_ID']
            data_source = row['DataSource']
            table_name = row['TableName']
            columnname = row['Column']
            base_table_member = row['BaseTableMember']
            check_column = row['check_column']
            schema = row['Schema']
            conn = openemr
            if row['Schema'] == 'LHPProd':
                conn = LHPProd
            elif row['Schema'] == 'LHP_VendorData':
                conn = LHP_VendorData

            engine = create_engine(conn)

            if data_source == 'HXG':
                data_source = 'dbo'
                
            with engine.connect() as conn:
                members_ids = pd.read_sql_query(f"SELECT {columnname} as 'LOINC', {check_column} as 'LAB_VALUE' FROM {table_name}", conn)

            merged_df = pd.merge(members_ids, lab_df, on='LOINC', how='left')
            merged_df = merged_df.fillna(0)
            merged_df['LAB_VALUE'] = merged_df['LAB_VALUE'].apply(convert_2_flt)
            merged_df['LAB_VALUE'] = merged_df['LAB_VALUE'].astype(float)

            error_flag = []
            for i, r in merged_df.iterrows():
                if (r['LAB_VALUE'] < r['Acceptable Value (MIN)']) or (r['LAB_VALUE'] > r['Acceptable Value (MAX)']):
                    error_flag.append(1)
                else:
                    error_flag.append(0)
            merged_df['Error'] = error_flag

            result_dict = {}
            error_flag = 0
            for loinc in merged_df['LOINC'].unique():
                loinc_data = merged_df[merged_df['LOINC'] == loinc]
                outside_count = ((loinc_data['LAB_VALUE'] < loinc_data['Acceptable Value (MIN)']) |
                                 (loinc_data['LAB_VALUE'] > loinc_data['Acceptable Value (MAX)'])).sum()
                result_dict[loinc] = {
                    'Acceptable Min Value': loinc_data['Acceptable Value (MIN)'].iloc[0],
                    'Acceptable Max Value': loinc_data['Acceptable Value (MAX)'].iloc[0],
                    'Number of Values Outside Min Max Value': outside_count,
                    'Error flag': 1 if outside_count > 0 else 0
                }
                value_list.append(result_dict) 
                if outside_count > 0:
                    error_flag += 1
                else:
                    error_flag += 0

        error_flag_percentage = (error_flag / len(merged_df['LOINC'].unique())) * 100

        # Convert data to serializable format
        serializable_value_list = convert_to_serializable(value_list)
        serializable_error_flag_percentage = convert_to_serializable(error_flag_percentage)

        return serializable_value_list, serializable_error_flag_percentage
    
    except FileNotFoundError:
        return json.dumps({"error": "CSV file not found."})
    except SQLAlchemyError as e:
        return json.dumps({"error": f"Database error: {str(e)}"})
    except Exception as e:
        return json.dumps({"error": f"An error occurred: {str(e)}"})




def lab_check_main(measure, function):
    try:
        df = pd.read_csv('./configs/config3.csv')
        
        df = df[df['Primary_Key'] == 'Lab Results']
        final_dict = {}

        universe_dictionary, error_percentage = LAB_RESULTS_CHECK('LWCC', df, measure)

        serializable_universe_dictionary = []
        for item in universe_dictionary:
            if isinstance(item, dict):
                serializable_item = {k: (v.item() if isinstance(v, (np.int64, np.float64)) else v) for k, v in item.items()}
                serializable_universe_dictionary.append(serializable_item)
            else:
                serializable_universe_dictionary.append(item)

        final_dict['Measure'] = measure
        final_dict['Test Case Description'] = '% of numerical lab results that are outside plausible ranges'
        final_dict['Function'] = 'Lab Results'
        final_dict['Error']= error_percentage
        final_dict['LAB CHECK Dictionary'] = serializable_universe_dictionary

        final_list = [serializable_universe_dictionary]
        return final_list

    except FileNotFoundError:
        return json.dumps({"error": "CSV file not found."})
    except Exception as e:
        return json.dumps({"error": f"An error occurred: {str(e)}"})




def POS_pre(sources,schema,table_name,columnname, base_table_member,threshold = 0.1,previous_results = {}):
    try:
        
        today = date.today()
            # print(current_counts)
        # today = datetime.now().strftime('%m%d%Y')
        conn = openemr
        if schema == 'LHPProd':
            conn = LHPProd
        elif schema == 'LHP_VendorData':
            conn = LHP_VendorData

        engine = create_engine(conn)
        if sources == 'HXG':
            sources= 'dbo'

        if sources == 'dbo':
            query = f"""
                    Select {columnname} , count(distinct [{base_table_member}]) as counts from
                    {schema}.{sources}.{table_name} group by [{columnname}]
                    """
            
        elif sources == 'LWCC':
            query = f"""
                    Select {columnname} , count(distinct {base_table_member}) as counts from
                    {table_name} group by {columnname}
            """
                    
        # print(query)    
        # print('\n')
        with engine.connect() as conn:
            current_year_results = conn.execute(text(query)).fetchall()
        # print(current_year_results)
        current_year_total = sum(row[1] for row in current_year_results)
        current_year_counts = {row[0]: row[1] for row in current_year_results}
        today = date.today().strftime('%m%d%Y')
        
        if today in previous_results:
            previous_counts = previous_results[today]
        else:
            if previous_results:
                latest_date = max(previous_results.keys())
                       
                previous_counts = previous_results[latest_date]
            else:
                previous_counts = current_year_counts.copy()
                
       
                
        error_flag = 0
        error_flag_list = []
        # for category,current_count in current_year_counts.items():
        #     previous_count = previous_counts.get(category,0)
        #     if previous_count>0:
        #         percentage_change = abs((current_count - previous_count)/previous_count)
        #     else:
        #         percentage_change = current_count
        #     if percentage_change>threshold:
        #         error_flag = 1
        #         error_flag_list.append(1)
                
        #     else:
        #         error_flag_list.append(0)
        for category, current_count in current_year_counts.items():
            previous_count = previous_counts.get(category, 0)
            if previous_count > 0:
                percentage_change = abs((current_count - previous_count) / previous_count)
            else:
                percentage_change = current_count
            if percentage_change > threshold:
                error_flag = 1
                error_flag_list.append(1)
            else:
                error_flag_list.append(0)  
                      
        previous_results[today] = current_year_counts
        return current_year_counts,previous_results,error_flag ,error_flag_list
    
    except FileNotFoundError:
        return json.dumps({"error": "Excel file not found."})
    except SQLAlchemyError as e:
        return json.dumps({"error": f"Database error: {str(e)}"})
    except Exception as e:
        return json.dumps({"error": f"An error occurred: {e}"})



def POS_CHECK_calling_main(sources,final_list,df,measure):

    # df = pd.read_csv('config3.csv')
    age_check_rows = df[(df['Function_Type'] == 'Frequency Check') & (df['DataSource'] == sources)]
    value_set_final_list = []
    source_rows = age_check_rows[age_check_rows['DataSource'] == sources]

    # for index, row in source_rows.iterrows():
    #     value_set_final_dict = {}
    #     test_case_id = row['TC_ID']
    #     table_name = row['TableName']
    #     columnname = row['Column']  
    #     base_table_member = row['BaseTableMember']
    #     schema = row['Schema']
        
    #     # filtered_data = [d for d in final_list]
    #     result = None
    #     # for d in filtered_data:
    #     #     if code_system in d['Previous Count']:
    #     if len(final_list) !=0:
    #         result = final_list[0]
                
    #     if result is not None:  
    #         previous_results = {}
    #         date_prev = result['DVE Run Date']
    #         previous_results[date_prev] = result['Previous Count']
    #     else:
    #         previous_results = {}
    #     current_counts,previous_results,error_flag,error_flag_list = POS_pre(sources,schema,table_name,columnname,base_table_member, threshold = 0.1,previous_results = {})

    #     # print(list(previous_results.keys())[0])
    #     row_dictionary_list = []
    #     prev_key = list(previous_results.keys())[0]
    #     for i,j,k in zip(current_counts.items(),previous_results[prev_key].items(),error_flag_list):
    #         if j[1]!=0:
    #             row_dictionary_list.append({
    #                 'POS Code' : i[0],
    #                 'Current Run' : i[1],
    #                 'Previous Run' : j[1],
    #                 '% change in claims': (j[1]-i[1])/j[1]*100,
    #                 'Error Flag' : k
    #             })
    #         else:
    #             row_dictionary_list.append({
    #                 'POS Code' : i[0],
    #                 'Current Run' : i[1],
    #                 'Previous Run' : j[1],
    #                 '% change in claims': j[1],
    #                 'Error Flag' : k
    #             })
    #     percentage = (error_flag_list.count(1)/len(error_flag_list)) *100
    #     # print(row_dictionary_list)
        
    #     value_set_final_dict['DVE Run Date'] = date.today().strftime('%m%d%Y')
    #     value_set_final_dict['Test Case ID'] = test_case_id
    #     value_set_final_dict['Measure'] = measure
    #     value_set_final_dict['Function'] = "POS"
    #     value_set_final_dict['Comparision'] = "% of claims billed from a Place of Service"
    #     value_set_final_dict['Datasource'] = sources
    #     value_set_final_dict['TableName'] = table_name
    #     value_set_final_dict['ColumnName'] = columnname
    #     value_set_final_dict['Percentage'] = percentage
        
        
    #     value_set_final_dict['Previous Count'] = previous_results
    #     value_set_final_dict['Values'] = percentage
    #     value_set_final_dict['Details'] = row_dictionary_list

    #     value_set_final_list.append(value_set_final_dict)
    # return value_set_final_list
    for index, row in source_rows.iterrows():
        value_set_final_dict = {}
        test_case_id = row['TC_ID']
        table_name = row['TableName']
        columnname = row['Column']
        base_table_member = row['BaseTableMember']
        schema = row['Schema']
        
        # Ensure previous_results is properly initialized
        if len(final_list) != 0:
            result = final_list[0]
        else:
            result = None
        
        if result is not None:
            previous_results = {}
            date_prev = result['DVE Run Date']
            previous_results[date_prev] = result['Previous Count']
        else:
            previous_results = {}
        
        current_counts, previous_results, error_flag, error_flag_list = POS_pre(
            sources, schema, table_name, columnname, base_table_member, threshold=0.1, previous_results=previous_results
        )
        
        row_dictionary_list = []
        prev_key = list(previous_results.keys())[0] if previous_results else None
        
        if prev_key:
            for i, j, k in zip(current_counts.items(), previous_results.get(prev_key, {}).items(), error_flag_list):
                if j[1] != 0:
                    row_dictionary_list.append({
                        'POS Code': i[0],
                        'Current Run': i[1],
                        'Previous Run': j[1],
                        '% change in claims': (j[1] - i[1]) / j[1] * 100,
                        'Error Flag': k
                    })
                else:
                    row_dictionary_list.append({
                        'POS Code': i[0],
                        'Current Run': i[1],
                        'Previous Run': j[1],
                        '% change in claims': j[1],
                        'Error Flag': k
                    })
        else:
            # Handle case when prev_key is None
            row_dictionary_list = []
        
        percentage = (error_flag_list.count(1) / len(error_flag_list)) * 100 if error_flag_list else 0

        value_set_final_dict.update({
            'DVE Run Date': date.today().strftime('%m%d%Y'),
            'Test Case ID': test_case_id,
            'Measure': measure,
            'Function': "POS",
            'Comparision': "% of claims billed from a Place of Service",
            'Datasource': sources,
            'TableName': table_name,
            'ColumnName': columnname,
            'Percentage': percentage,
            'Previous Count': previous_results,
            'Values': percentage,
            'Details': row_dictionary_list
        })
        
        value_set_final_list.append(value_set_final_dict)
    
    return value_set_final_list



def pos_main(measure,function,final_list,final_list2):

        df = pd.read_csv('./configs/config3.csv')
        df = df[df['Primary_Key']=='Place of Service (HXG Data)']
        universe_dictionary = POS_CHECK_calling_main('HXG',final_list,df,measure)
        df = pd.read_csv('./configs/config3.csv')
        df2 = df[df['Primary_Key']=='Place of Service (LWCC Data)']
        universe_dictionary2 = POS_CHECK_calling_main('LWCC',final_list,df2,measure)
        # print(df2.head())
        final_dict = {}
        final_dict1 = {}
        # db_connection_string = 'mssql+pyodbc://zsaudit:9v]3>SYv1C20@lhp-db-copy.database.windows.net:1433/HEDIS_2023_Copy?driver=ODBC+Driver+17+for+SQL+Server'
        
        
        # print('\n')    
        # print(universe_dictionary)
        # print('\n')
        # print(universe_dictionary2)
        errorlwcc = universe_dictionary2[0]['Percentage']
        errorhxg = universe_dictionary[0]['Percentage']
        final_list = []
        final_dict['Measure'] = measure
        final_dict['DVE Run Date'] = date.today().strftime('%m%d%Y')
        final_dict['Function'] = 'POS'
        final_dict['Test Case Description'] = '% of claims billed from a Place of Service'
        final_dict['Value'] = errorhxg 
        final_dict['Error Flag'] = 1 if errorhxg > 0 else 0
        final_dict['Details'] = universe_dictionary
    
        final_dict1['Measure'] = measure
        final_dict1['DVE Run Date'] = date.today().strftime('%m%d%Y')
        final_dict1['Function'] = 'POS'
        final_dict1['Test Case Description'] = '% of claims billed from a Place of Service'
        final_dict1['Value'] = errorlwcc
        final_dict1['Error Flag'] = 1 if errorhxg > 0 else 0
        final_dict1['Details'] = universe_dictionary2
        final_list = [final_dict,final_dict1]
        # final_dict['Future Date Check'] = future_date_dictionary
    
        # final_list = [universe_dictionary]
        return final_list
  


def FUTURE_DATE_CHECK(sources,df,measure):
    try:
        future_date_check_rows = df[(df['Function_Type'] == 'Dates in Future') & (df['DataSource'] == sources)]
        # engine = create_engine(db_connection_string)
        threshold_percentage = 0
        result_list = []

        for index, row in future_date_check_rows.iterrows():
            test_case_id = row['TC_ID']
            data_source = row['DataSource']
            table_name = row['TableName']
            column_name = row['Column']
            schema = row['Schema']
            base_table_member = row['BaseTableMember']
            check_data_source = row['checkdatasource']
            check_table = row['check_table']
            check_column = row['check_column']
            check_table_member = row['CheckTableMember']
            # schema = 'dbo' if data_source == 'HXG' else data_source
            conn = openemr
            if row['Schema'] == 'LHPProd':
                conn = LHPProd
            elif row['Schema'] == 'LHP_VendorData':
                conn = LHP_VendorData

            engine = create_engine(conn)
            if data_source == 'HXG':
                data_source = 'dbo'
                check_data_source = "dbo"
            # print(data_source)
            query = f"""
            WITH base_data AS (
                SELECT   [{base_table_member}], max([{column_name}]) as column_name
                FROM [{schema}].[{data_source}].[{table_name}] group by [{base_table_member}]
            ),
            check_data AS (
                SELECT  [{check_table_member}], max([{check_column}]) as check_column
                FROM [{schema}].[{check_data_source}].[{check_table}] group by [{check_table_member}]
            ),
            inconsistent_members AS (
                SELECT distinct(b.[{base_table_member}]),b.column_name, c.check_column
                FROM base_data b
                JOIN check_data c ON cast(b.[{base_table_member}] as nvarchar) = cast(c.[{check_table_member}] as nvarchar)
                WHERE cast(b.column_name as date) < cast(c.check_column as date) 
                
            )
            SELECT * from inconsistent_members
                
            """
            query2 = f"""
            WITH base_data AS (
                SELECT DISTINCT  [{base_table_member}], [{column_name}]
                FROM [{schema}].[{data_source}].[{table_name}]
            ),
            check_data AS (
                SELECT DISTINCT [{check_table_member}], [{check_column}]
                FROM [{schema}].[{check_data_source}].[{check_table}]
            ),
            inconsistent_members AS (
                SELECT b.[{base_table_member}], b.[{column_name}], c.[{check_column}]
                FROM base_data b
                JOIN check_data c ON cast(b.[{base_table_member}] as nvarchar) = cast(c.[{check_table_member}] as nvarchar)
                WHERE cast(b.{column_name} as date) < cast(c.{check_column} as date)
            )
            SELECT count(distinct [{base_table_member}]) from [{data_source}].[{table_name}]
                
            """
            query_3 = f"""
                            WITH base_data AS (
                                SELECT DISTINCT 
                                    {base_table_member}, 
                                    {column_name} AS base_date
                                FROM [{schema}].{data_source}.{table_name}
                                WHERE {column_name} IS NOT NULL
                            ),
                            check_data AS (
                                SELECT DISTINCT 
                                    {check_table_member}, 
                                    {check_column} AS check_date
                                FROM [{schema}].{check_data_source}.{check_table}
                                WHERE {check_column} IS NOT NULL
                            ),
                            inconsistent_members AS (
                SELECT b.[{base_table_member}], b.base_date, c.check_date
                FROM base_data b
                JOIN check_data c ON cast(b.[{base_table_member}] as nvarchar) = cast(c.[{check_table_member}] as nvarchar)
                WHERE cast(b.base_date as date) < cast(c.check_date as date)
            )
                            SELECT count(distinct {base_table_member} ) from inconsistent_members
                        
                    
                """

            if data_source == 'LWCC':
                query = f"""
                        WITH base_data AS (
                            SELECT DISTINCT 
                                {base_table_member}, 
                                DATE({column_name}) AS base_date
                            FROM {table_name}
                            WHERE DATE({column_name}) IS NOT NULL
                        ),
                        check_data AS (
                            SELECT DISTINCT 
                                {check_table_member}, 
                                DATE({check_column}) AS check_date
                            FROM {check_table}
                            WHERE DATE({check_column}) IS NOT NULL
                        ),
                        inconsistent_members AS (
                            SELECT 
                                b.{base_table_member}, 
                                b.base_date, 
                                c.check_date
                            FROM base_data b
                            JOIN check_data c 
                                ON b.{base_table_member} = c.{check_table_member}
                            WHERE b.base_date < c.check_date
                        )
                        SELECT * from inconsistent_members
                    
                """
                query2 = f"""
               WITH base_data AS (
                    SELECT DISTINCT 
                        {base_table_member}, 
                        DATE({column_name}) AS base_date
                    FROM {table_name}
                    WHERE DATE({column_name}) IS NOT NULL
                ),
                check_data AS (
                    SELECT DISTINCT 
                        {check_table_member}, 
                        DATE({check_column}) AS check_date
                    FROM {check_table}
                    WHERE DATE({check_column}) IS NOT NULL
                ),
                inconsistent_members AS (
                    SELECT 
                        b.{base_table_member}, 
                        b.base_date, 
                        c.check_date
                    FROM base_data b
                    JOIN check_data c 
                        ON b.{base_table_member} = c.{check_table_member}
                    WHERE b.base_date < c.check_date
                )
                SELECT count(distinct {base_table_member}) from {table_name}
                    
                """
                query_3 = f"""
                            WITH base_data AS (
                                SELECT DISTINCT 
                                    {base_table_member}, 
                                    DATE({column_name}) AS base_date
                                FROM {table_name}
                                WHERE DATE({column_name}) IS NOT NULL
                            ),
                            check_data AS (
                                SELECT DISTINCT 
                                    {check_table_member}, 
                                    DATE({check_column}) AS check_date
                                FROM {check_table}
                                WHERE DATE({check_column}) IS NOT NULL
                            ),
                            inconsistent_members AS (
                                SELECT 
                                    b.{base_table_member}, 
                                    b.base_date, 
                                    c.check_date
                                FROM base_data b
                                JOIN check_data c 
                                    ON b.{base_table_member} = c.{check_table_member}
                                WHERE b.base_date < c.check_date
                            )
                            SELECT count(distinct {base_table_member} ) from inconsistent_members
                        
                    
                """
            
            with engine.connect() as conn:
                result = conn.execute(text(query)).fetchall()                
                result2 = conn.execute(text(query2)).fetchone()# Fetch all rows
                result3 = conn.execute(text(query_3)).fetchone()     

                total_rows = result2[0]
                invalid_rows = 0
                invalid_member_data = []  # Store member ids and dates

                for row in result:
                    # print(row[1])
                    # total_rows += 1
                    invalid_rows += 1
                    invalid_member_data.append({
                        'MemberId': row[0],
                        'Primary Date': row[1].strftime('%m/%d/%Y') if row[1] else None,
                        'Comparing Date': row[2].strftime('%m/%d/%Y') if row[2] else None,
                        'Error Flag' : 1
                    })

                if total_rows > 0:
                    invalid_percentage = (result3[0] / total_rows) * 100
                else:
                    invalid_percentage = 0

                error_flag = 1 if invalid_rows > 0 else 0
                result_list.append({
                    'TestCaseID': test_case_id,
                    'Measure': measure,
                    'DataSource': data_source,
                    'Comparision': '% of dates in future',
                    'TableName': table_name,
                    'ColumnName': column_name,
                    'CheckTableName': check_table,
                    'CheckColumnName': check_column,
                    'Total Unique Member IDs': total_rows,
                    'Future Date Member IDs': result3[0],
                    'Values': f"{invalid_percentage:.2f}%",
                    'Error Flag': error_flag,
                    'Details': invalid_member_data
                })

        result_json = json.dumps(result_list)
        return result_list

    except FileNotFoundError:
        return json.dumps({"error": "Excel file not found."})
    except SQLAlchemyError as e:
        return json.dumps({"error": f"Database error: {str(e)}"})
    except Exception as e:
        return json.dumps({"error": f"An error occurred: {str(e)}"})

# ehu = FUTURE_DATE_CHECK('HXG',df,'cbp')
# print(ehu)


def dod_main(measure,function):
    try:
        df = pd.read_csv('./configs/config3.csv')
        df = df[df['Primary_Key']=='Deceased Date']
        final_dict = {}
        final_dict_details = {}
        #db_connection_string = 'mssql+pyodbc://zsaudit:9v]3>SYv1C20@lhp-db-copy.database.windows.net:1433/HEDIS_2023_Copy?driver=ODBC+Driver+17+for+SQL+Server'
        future_date_check = FUTURE_DATE_CHECK('LWCC',df,measure)
        future_date_check2 = FUTURE_DATE_CHECK('HXG',df,measure)
        # print(future_date_check)
        future_date_check_dos = []
        future_date_check_doe = []
       
        for i in future_date_check:
            future_date_check_doe.append(i)
            # if i['CheckColumnName'] == 'date':
            #     future_date_check_doe.append(i)
            # else:
            #     future_date_check_dos.append(i)
                
        sum_error_a = 0
        # sum_error_b = 0
    
        for a in future_date_check_dos:
            sum_error_a += a['Error Flag']
    
        error = sum_error_a 
        
        final_dict['Measure'] = measure
        final_dict['Function'] = function
        final_dict['Test Case Description'] = 'Records with incorrect or inconsistent Date of Deceased'
        final_dict['Errors'] = error
        final_dict['Result'] = 'Fail' if error >0 else 'Pass'
        final_dict['Details'] = future_date_check_doe
        final_dict['Other Details'] =  future_date_check2
        # final_dict['Details'] = final_dict_details

        return final_dict
    except Exception as e:
        return e
   


def dos_main(measure,function):
    try:
        df = pd.read_csv('./configs/config3.csv')
        df = df[df['Primary_Key']=='Date of Service']
        final_dict = {}
        final_dict_details = {}
        #db_connection_string = 'mssql+pyodbc://zsaudit:9v]3>SYv1C20@lhp-db-copy.database.windows.net:1433/HEDIS_2023_Copy?driver=ODBC+Driver+17+for+SQL+Server'
        future_date_check = FUTURE_DATE_CHECK('HXG',df,measure)
        # print(future_date_check)
        future_date_check2 = FUTURE_DATE_CHECK('LWCC',df,measure)
        # print(future_date_check)
        future_date_check_dos = []
        future_date_check_doe = []
       
        for i in future_date_check:
            future_date_check_dos.append(i)
            # if i['CheckColumnName'] == 'date':
                
            #     future_date_check_dos.append(i)
            # else:
            #     future_date_check_doe.append(i)
                
        sum_error_a = 0
        # sum_error_b = 0
    
        for a in future_date_check_dos:
            sum_error_a += a['Error Flag']
    
        error = sum_error_a 
        
        final_dict['Measure'] = measure
        final_dict['Function'] = function
        final_dict['Test Case Description'] = 'Records with incorrect or inconsistent Date of Deceased'
        final_dict['Errors'] = error
        final_dict['Result'] = 'Fail' if error >0 else 'Pass'
        final_dict['Details'] = future_date_check_dos
        final_dict['Other Details'] =  future_date_check2
        # final_dict['Details'] = final_dict_details

        return final_dict
    except Exception as e:
        return e



def doe_main(measure,function):
    try:
        df = pd.read_csv('./configs/config3.csv')
        df = df[df['Primary_Key']=='Enrollment End Date & Start Date']
        final_dict = {}
        final_dict_details = {}
        #db_connection_string = 'mssql+pyodbc://zsaudit:9v]3>SYv1C20@lhp-db-copy.database.windows.net:1433/HEDIS_2023_Copy?driver=ODBC+Driver+17+for+SQL+Server'
        future_date_check = FUTURE_DATE_CHECK('LWCC',df,measure)
        # print(future_date_check)
        future_date_check_dos = []
        future_date_check_doe = []
       
        for i in future_date_check:
            future_date_check_dos.append(i)
            # if i['CheckColumnName'] == 'date':
            #     future_date_check_dos.append(i)
            # else:
            #     future_date_check_doe.append(i)
                
        sum_error_a = 0
        # sum_error_b = 0
    
        for a in future_date_check_dos:
            sum_error_a += a['Error Flag']
    
        error = sum_error_a 
        
        final_dict['Measure'] = measure
        final_dict['Function'] = function
        final_dict['Test Case Description'] = 'Records with incorrect or inconsistent Date of Deceased'
        final_dict['Errors'] = error
        final_dict['Result'] = 'Fail' if error >0 else 'Pass'
        final_dict['Details'] = future_date_check_dos
        final_dict['Other Details'] =  future_date_check_doe
        # final_dict['Details'] = final_dict_details

        return final_dict
    except Exception as e:
        return e
  


def dop_main(measure,function):
    try:
        df = pd.read_csv('./configs/config3.csv')
        df = df[df['Primary_Key']=='Enrollment End Date & Start Date']
        final_dict = {}
        final_dict_details = {}
        #db_connection_string = 'mssql+pyodbc://zsaudit:9v]3>SYv1C20@lhp-db-copy.database.windows.net:1433/HEDIS_2023_Copy?driver=ODBC+Driver+17+for+SQL+Server'
        future_date_check = FUTURE_DATE_CHECK('RX Claims',df,measure)
        # print(future_date_check)
        future_date_check_dos = []
        future_date_check_doe = []
       
        for i in future_date_check:
            future_date_check_dos.append(i)
            # if i['CheckColumnName'] == 'date':
            #     future_date_check_dos.append(i)
            # else:
            #     future_date_check_doe.append(i)
                
        sum_error_a = 0
        # sum_error_b = 0
    
        for a in future_date_check_dos:
            sum_error_a += a['Error Flag']
    
        error = sum_error_a 
        
        final_dict['Measure'] = measure
        final_dict['Function'] = function
        final_dict['Test Case Description'] = 'Records with incorrect or inconsistent Date of Deceased'
        final_dict['Errors'] = error
        final_dict['Result'] = 'Fail' if error >0 else 'Pass'
        final_dict['Details'] = future_date_check_dos
        final_dict['Other Details'] =  future_date_check_doe
        # final_dict['Details'] = final_dict_details

        return final_dict
    except Exception as e:
        return e




def doa_main(measure,function):
    try:
        df = pd.read_csv('./configs/config3.csv')
        df = df[df['Primary_Key']=='Admission and Discharge Dates']
        final_dict = {}
        final_dict_details = {}
        #db_connection_string = 'mssql+pyodbc://zsaudit:9v]3>SYv1C20@lhp-db-copy.database.windows.net:1433/HEDIS_2023_Copy?driver=ODBC+Driver+17+for+SQL+Server'
        future_date_check = FUTURE_DATE_CHECK('HXG',df,measure)
        # print(future_date_check)
        future_date_check_dos = []
        future_date_check_doe = []
       
        for i in future_date_check:
            future_date_check_dos.append(i)
            # if i['CheckColumnName'] == 'date':
            #     future_date_check_dos.append(i)
            # else:
            #     future_date_check_doe.append(i)
                
        sum_error_a = 0
        # sum_error_b = 0
    
        for a in future_date_check_dos:
            sum_error_a += a['Error Flag']
    
        error = sum_error_a 
        
        final_dict['Measure'] = measure
        final_dict['Function'] = function
        final_dict['Test Case Description'] = 'Records with incorrect or inconsistent Date of Deceased'
        final_dict['Errors'] = error
        final_dict['Result'] = 'Fail' if error >0 else 'Pass'
        final_dict['Details'] = future_date_check_dos
        final_dict['Other Details'] =  future_date_check_doe
        # final_dict['Details'] = final_dict_details

        return final_dict
    except Exception as e:
        return e



def AGE_CHECK_pre(sources,schema,table_name,columnname,base_table_member, threshold = 0.1,previous_results = {}):
    try:
        # engine = create_engine(db_connection_string)
        schema = 'LHPProd' if sources == 'HXG' else sources
        conn = openemr
        if schema == 'LHPProd':
            conn = LHPProd
        elif schema == 'LHP_VendorData':
            conn = LHP_VendorData

        engine = create_engine(conn)
        
        today = date.today()
            # print(current_counts)
        # today = datetime.now().strftime('%m%d%Y')
        query =f"""
                SELECT age_group,count(distinct {base_table_member}) as members from
                (select {base_table_member},
                    CASE
                        WHEN DATEDIFF(YEAR, {columnname}, cast(GETDATE() as date)) BETWEEN 0 AND 5 THEN '0-5'
                        WHEN DATEDIFF(YEAR, {columnname}, cast(GETDATE() as date)) BETWEEN 6 AND 10 THEN '6-10'
                        WHEN DATEDIFF(YEAR, {columnname}, cast(GETDATE() as date)) BETWEEN 11 AND 15 THEN '11-15'
                        WHEN DATEDIFF(YEAR, {columnname}, cast(GETDATE() as date)) BETWEEN 16 AND 20 THEN '16-20'
                        WHEN DATEDIFF(YEAR, {columnname}, cast(GETDATE() as date)) BETWEEN 21 AND 25 THEN '21-25'
                        WHEN DATEDIFF(YEAR, {columnname}, cast(GETDATE() as date)) BETWEEN 26 AND 30 THEN '26-30'
                        WHEN DATEDIFF(YEAR, {columnname}, cast(GETDATE() as date)) BETWEEN 31 AND 35 THEN '31-35'
                        WHEN DATEDIFF(YEAR, {columnname}, cast(GETDATE() as date)) BETWEEN 36 AND 40 THEN '36-40'
                        WHEN DATEDIFF(YEAR, {columnname}, cast(GETDATE() as date)) BETWEEN 41 AND 45 THEN '41-45'
                        WHEN DATEDIFF(YEAR, {columnname}, cast(GETDATE() as date)) BETWEEN 46 AND 50 THEN '46-50'
                        WHEN DATEDIFF(YEAR, {columnname}, cast(GETDATE() as date)) BETWEEN 51 AND 55 THEN '51-55'
                        WHEN DATEDIFF(YEAR, {columnname}, cast(GETDATE() as date)) BETWEEN 56 AND 60 THEN '56-60'
                        ELSE 'Other'
                    END AS age_group
                    FROM dbo.{table_name}
                     )as subquery
                    
                GROUP BY age_group
            """
        if sources == 'LWCC':
            query = f"""
                SELECT age_group,count(distinct {base_table_member}) as members from
                (select memberID,
                    CASE
                        WHEN TIMESTAMPDIFF(YEAR, {columnname}, CURDATE()) BETWEEN 0 AND 5 THEN '0-5'
                        WHEN TIMESTAMPDIFF(YEAR, {columnname}, CURDATE()) BETWEEN 6 AND 10 THEN '6-10'
                        WHEN TIMESTAMPDIFF(YEAR, {columnname}, CURDATE()) BETWEEN 11 AND 15 THEN '11-15'
                        WHEN TIMESTAMPDIFF(YEAR, {columnname}, CURDATE()) BETWEEN 16 AND 20 THEN '16-20'
                        WHEN TIMESTAMPDIFF(YEAR, {columnname}, CURDATE()) BETWEEN 21 AND 25 THEN '21-25'
                        WHEN TIMESTAMPDIFF(YEAR, {columnname}, CURDATE()) BETWEEN 26 AND 30 THEN '26-30'
                        WHEN TIMESTAMPDIFF(YEAR, {columnname}, CURDATE()) BETWEEN 31 AND 35 THEN '31-35'
                        WHEN TIMESTAMPDIFF(YEAR, {columnname}, CURDATE()) BETWEEN 36 AND 40 THEN '36-40'
                        WHEN TIMESTAMPDIFF(YEAR, {columnname}, CURDATE()) BETWEEN 41 AND 45 THEN '41-45'
                        WHEN TIMESTAMPDIFF(YEAR, {columnname}, CURDATE()) BETWEEN 46 AND 50 THEN '46-50'
                        WHEN TIMESTAMPDIFF(YEAR, {columnname}, CURDATE()) BETWEEN 51 AND 55 THEN '51-55'
                        WHEN TIMESTAMPDIFF(YEAR, {columnname}, CURDATE()) BETWEEN 56 AND 60 THEN '56-60'
                        
                        ELSE 'Other'
                    END AS age_group
                    FROM {table_name}
                     )as subquery 
                GROUP BY age_group
            """
            
            
        with engine.connect() as conn:
            current_year_results = conn.execute(text(query)).fetchall()

        # print(current_year_results)
        current_year_total = sum(row[1] for row in current_year_results)
        
        current_year_counts = {row[0]: row[1] for row in current_year_results}
        # for row in current_year_results:
        #     print(row)
        today = date.today().strftime('%m%d%Y')
        
        if today in previous_results:
            previous_counts = previous_results[today]
        else:
            if previous_results:
                latest_date = max(previous_results.keys())
                       
                previous_counts = previous_results[latest_date]
            else:
                previous_counts = current_year_counts.copy()
                
       
                
        error_flag = 0
        error_flag_list = []
        for category,current_count in current_year_counts.items():
            
            previous_count = previous_counts.get(category,0)
            # print(category,current_count,previous_count)
            if previous_count>0:
                percentage_change = abs((current_count - previous_count)/previous_count)
            else:
                percentage_change = current_count
            if percentage_change>threshold:
                error_flag = 1
                error_flag_list.append(1)
            else:
                error_flag_list.append(0)
        # print(error_flag_list)
            
                      
        previous_results[today] = current_year_counts

                # print(current_year_counts)
                # print("--------")
                # print(previous_results)
        return current_year_counts,previous_results,error_flag,error_flag_list

    except FileNotFoundError:
        return json.dumps({"error": "Excel file not found."})
    except SQLAlchemyError as e:
        return json.dumps({"error": f"Database error: {str(e)}"})
    except Exception as e:
        return json.dumps({"error": f"An error occurred: {e}"})
        


def AGE_CHECK_main(sources,final_list,df,measure):
    # measure_to_value_filtered = measure_to_value[measure_to_value['Measure ID']==measure]
    # df = pd.read_csv('config3.csv')
    age_check_rows = df[(df['Function_Type'] == 'Age Check') & (df['DataSource'] == sources)]
    # engine = create_engine(db_connection_string)
    value_set_final_list = []
    source_rows = age_check_rows[age_check_rows['DataSource'] == sources]
    for index, row in source_rows.iterrows():
        value_set_final_dict = {}
        test_case_id = row['TC_ID']
        table_name = row['TableName']
        columnname = row['Column'] 
        schema = row['Schema']
        base_table_member = row['BaseTableMember'] 
        
        # filtered_data = [d for d in final_list]
        result = None
        # for d in filtered_data:
        #     if code_system in d['Previous Count']:
        if len(final_list) !=0:
            result = final_list[0]
                
        if result is not None:  
            previous_results = {}
            date_prev = result['DVE Run Date']
            previous_results[date_prev] = result['Previous Count']
        else:
            previous_results = {}
        current_counts,previous_results,error_flag,error_flag_list = AGE_CHECK_pre(sources,schema,table_name,columnname,base_table_member, threshold = 0.1,previous_results = {})

        # print(list(previous_results.keys())[0])
        row_dictionary_list = []
        prev_key = list(previous_results.keys())[0]
        for i,j,k in zip(current_counts.items(),previous_results[prev_key].items(),error_flag_list):
            
            row_dictionary_list.append({
                'Age groups' : i[0],
                'Current Run' : i[1],
                'Previous Run' : j[1],
                'Error Flag' : k
            })
        percentage = (error_flag_list.count(1)/len(error_flag_list)) *100
        # print(row_dictionary_list)
        
        value_set_final_dict['DVE Run Date'] = date.today().strftime('%m%d%Y')
        value_set_final_dict['Test Case ID'] = test_case_id
        value_set_final_dict['Measure'] = measure
        value_set_final_dict['Function'] = "Age Check"
        value_set_final_dict['Comparision'] = "% of members with inconsistent Age"
        value_set_final_dict['Datasource'] = sources
        value_set_final_dict['TableName'] = table_name
        value_set_final_dict['ColumnName'] = columnname
        value_set_final_dict['Values'] = percentage
        value_set_final_dict['Error Flag'] = error_flag
        value_set_final_dict['Details'] = row_dictionary_list
        value_set_final_dict['Previous Count'] = previous_results
        # value_set_final_dict['Error Flag Individual'] = error_flag_list

        value_set_final_list.append(value_set_final_dict)
    return value_set_final_list
        


def dob_main(measure,function,final_list):
    try:
        # print(final_list)
        df = pd.read_csv('./configs/config3.csv')
        # print(df.head())
        df = df[df['Primary_Key']=='Date of Birth']
        final_dict = {}
        final_dict_details = {}
        
        age_check_dictionary = AGE_CHECK_main('HXG',final_list,df,measure)
        previous_count = age_check_dictionary[0]['Previous Count']
        age_check_dictionary2 = AGE_CHECK_main('LWCC',final_list,df,measure)# function with final_list (this means previous result)
        # print(age_check_dictionary)
        final_dict['DVE Run Date'] = date.today().strftime('%m%d%Y')
        final_dict['Measure'] = measure
        final_dict['Attribute'] = function
        final_dict['Test Case Description'] = 'Records with age less than 20 and more than 100'
        sum_error_a = 0

        for a in age_check_dictionary:
            # print(a)
            sum_error_a += a['Error Flag']

           
        error = sum_error_a
            
        final_dict['Errors'] = error
        final_dict['Result'] = 'Fail' if error >0 else 'Pass'
        final_dict['Details'] = age_check_dictionary
        final_dict['Other Details'] = age_check_dictionary2
        # final_dict['Details'] = final_dict_details
    
        # final_list = [inconsistent_dictionary,date_format_check,age_check_dictionary]
        return final_dict
    except Exception as e:
        return e
    



def value_checker(measure_list, function_list) :
    x = 0
    results = []
    for function in function_list:
        x += 1
        tc = test_case_num(x)
        if function=='Lab Results':
            output = lab_check_main(measure_list, function)
            description = 'records with incorrect or inconsistent lab results'
        elif function=='POS':
            output = pos_main(measure_list,function,[],[])
            description = 'records with incorrect or inconsistent place of service'
        elif function=='Deceased Date':
            output = dod_main(measure_list,function)
            description = 'Records with incorrect or inconsistent deceased date'
        elif function=='Service Date':
            output = dos_main(measure_list,function)
            description = 'Records with incorrect or inconsistent date of service'
        elif function=='Enrollment Date':
            output = doe_main(measure_list,function)
            description = 'Records with incorrect or inconsistent date of enrollment'
        elif function=='Prescription Date':
            output = dop_main(measure_list,function)
            description = 'Records with incorrect or inconsistent date of prescription or dispense dates'
        elif function=='Admission Date':
            output = doa_main(measure_list,function)
            description = 'Records with incorrect or inconsistent date of Admission or Discharge dates'
        elif function=='Date of Birth':
            final_list = []
            output = dob_main(measure_list,function,final_list)
            description = 'Records with incorrect or inconsistent date of birth'
        vc_dict = {
            'Test Case Id': tc,
            'DVE Run Date': today,
            'Measure': measure_list,
            'Attributes': function,
            'Details': output['Details'],
            'Number of Errors': output['Errors'],
            'Result': output['Result'],
            'Description': description
        }
        results.append(vc_dict)
    return results