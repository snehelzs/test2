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

# db_connection_string = os.getenv('DATABASE_URL')       HEDIS DB Copy being used by Hitashu
openemr = os.getenv('openemr')
LHPProd = os.getenv('LHPProd')
LHP_VendorData = os.getenv('LHP_VendorData')


# def check_connection(connection_string):
#     """ Check if the connection to the database is valid. """
#     engine = create_engine(connection_string)
#     try:
#         # Try to connect to the database
#         with engine.connect() as connection:
#             print(f"Connection to {connection_string} is successful.")
#             return True
#     except OperationalError as e:
#         print(f"Connection to {connection_string} failed: {e}")
#         return False

# print("Checking connection to LHPProd...")
# check_connection(LHPProd)

# print("Checking connection to LHP_VendorData...")
# check_connection(LHP_VendorData)

# print("Checking connection to openemr...")
# check_connection(openemr)




def convert_nan_to_string(data):
    if isinstance(data, dict):
        return {key: convert_nan_to_string(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [convert_nan_to_string(item) for item in data]
    elif isinstance(data, float) and math.isnan(data):
        return "NaN"
    else:
        return data



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



def availablity_check(source): 
    try:
        df = pd.read_csv('./configs/availability.csv')
        result_list =[]
        source_rows = df[df['Data Source']==source]
        for table,row in source_rows.iterrows():
            table_name = row['Table Name']
            schema = source
            if source=='HXG' or source=='RX Claims':
                schema = 'dbo' 
            conn = openemr
            if row['Schema']=='LHPProd':
                conn = LHPProd
            elif row['Schema']=='LHP_VendorData':
                conn = LHP_VendorData
                
            engine =  create_engine(conn)
            query = f"select count(*) from information_schema.tables where table_schema = '{schema}' and table_name = '{table_name}'"
            if source=='LWCC':
                query = f"select count(*) from information_schema.tables where table_schema = 'openemr' and table_name = '{table_name}'"
            with engine.connect() as conn:
                result = conn.execute(text(query)).fetchone()
            table_exists = result[0]>0
            error_flag = 0 if table_exists else 1
            result_list.append(
                {
                    'DVE Run Date': today,
                    'Data Source': "HXG" if source=='dbo' else source,
                    'Table Name': table_name,
                    'Availability': 'Yes' if table_exists else 'No',
                    'Error Flag': error_flag,
                    'Associated Measure': row['Associated Meassure'],
                    'Table Last Refresh': today
                }
            )
        return result_list

    except FileNotFoundError:
        return json.dumps({"error": "Excel file not found."})
    except SQLAlchemyError as e:
        return json.dumps({"error": f"Database error: {str(e)}"})
    except Exception as e:
        return json.dumps({"error": f"An error occurred: {str(e)}"})



def schema_check(source): 
    try:
        df = pd.read_csv('./configs/schema.csv')
        schema_check_rows = df[df['Data Source']==source]
        schema = 'dbo' if source=='HXG' else source
        result_list = []
        for index,row in schema_check_rows.iterrows():
            # test_case_id = row['TestCaseId']
            # data_source = row['Data Source']
            conn = openemr
            if row['Schema']=='LHPProd':
                conn = LHPProd
            elif row['Schema']=='LHP_VendorData':
                conn = LHP_VendorData

            engine =  create_engine(conn)

            table_name = row['Table']
            column_name = row['Column']
            expected_data_type = row['Expected Data Type']

           
            with engine.connect() as conn:
                query = text(f"""Select DATA_TYPE from INFORMATION_SCHEMA.COLUMNS where
                TABLE_SCHEMA = '{schema}' AND
                TABLE_NAME = '{table_name}' AND
                COLUMN_NAME = '{column_name}'                
                """)
                if source=='LWCC':
                    query = text(f"""Select DATA_TYPE from INFORMATION_SCHEMA.COLUMNS where
                    TABLE_SCHEMA = 'openemr' AND
                    TABLE_NAME = '{table_name}' AND
                    COLUMN_NAME = '{column_name}'                
                    """)
                result = conn.execute(query).fetchone()

                if result:
                    current_data_type = result[0]
                    error_flag = 1 if current_data_type.upper() != expected_data_type.upper() else 0

                    result_list.append({
                        # 'TestCaseID':test_case_id,
                        'DVE Run Date': today,
                        'Data Source':"HXG" if source=='dbo' else source,
                        'Table Name':table_name,
                        'Column Name':column_name,
                        'Associated Measure': row['Associated Meassure'],
                        'Expected Data Type': expected_data_type,
                        'Current Data Type' : current_data_type,
                        'Error Flag':error_flag
                    })
            
                else:
                    result_list.append({
                        # 'TestCaseID':test_case_id,
                        'DVE Run Date': today,
                        'Data Source':"HXG" if source=='dbo' else source,
                        'Table Name':table_name,
                        'Column Name':column_name,
                        'Associated Measure': row['Associated Meassure'],
                        'Expected Data Type': expected_data_type,
                        'Current Data Type' : 'Column Not Found',
                        'Error Flag':1
                    })
        return result_list

        # return result_list
    except FileNotFoundError:
        return json.dumps({'Error':"Excel file not found"}) 
    except Exception as e:
        return json.dumps({'Error':f"An Error Occured :{str(e)}"})     



def column_value_consistency_check(source,tc_num):
    df = pd.read_csv('./configs/cvc.csv')
    filtered_df = df[df['Data Source'] == source]
    results = []
    x = 0
    for index, row in filtered_df.iterrows():
        x += 1
        num = f"{x:02d}"
        test_id = f"{tc_num}.{num}"
        function = row['Test Type']
        table = row['Table Name']
        column = row['Column Name']
        db = row['Schema']
        comparision = ''
        # print(function, table, column)
        details = []
        match function:
            case 'Null Check':
                details = NULL_CHECK(source,table,column,db)
                comparision = '% of null records'
            case 'Frequency Check':
                details = FREQUENCY_CHECK(source,table,column,db)
                comparision = '% change in frequency of values'
            case 'Future Date Check':
                check_data_source = row['Data Source']
                check_table = row['Secondary table']
                check_column = row['Secondary column']
                base_table_member = row['Primary Key']
                check_table_member = row['Secondary key']
                # print(source,table,column,check_data_source, check_table, check_column, base_table_member, check_table_member, db)
                details = FUTURE_DATE_CHECK(source,table,column,check_data_source, check_table, check_column, base_table_member, check_table_member, db)
                comparision = '% of dates in future'
            case 'Invalid Date check':
                details = INVALID_DATE_CHECK(source,table,column,table,db)
                comparision = '% of values with invalid date'
            case 'Universe Check':
                valid_values = row['Valid Set']
                details = UNIVERSE_CHECK(source,table,column,valid_values,db)
                comparision = '% of values not in the defined universe'
            case 'Duplicate Check':
                details = DUPLICATE_CHECK(source,table,column,table,db)
                comparision = '% of duplicate values detected'
        
        
        cvc_dict = {
            "CheckNo" : test_id,
            "DVE Run Date": today,
            "Data Source" : source,
            "Table Name" : table,
            "Column Name" : column,
            "Data Type" : row['Data Type'],
            "Test Type": function,
            "Comparision" : comparision,
            "Error Flag": 0 if len(details)==0 else 1,
            "Description" : details
        }  
        results.append(cvc_dict)
    
    return results




def NULL_CHECK(data_source, table_name, column_name, db):
    try:
        # Create a database engine
        conn = openemr
        if db=='LHPProd':
            conn = LHPProd
        elif db=='LHP_VendorData':
            conn = LHP_VendorData
        engine =  create_engine(conn)
        schema = data_source
        if data_source=='HXG' or data_source=='RX Claims':
            schema = 'dbo' 
        # Construct the SQL query
        query = f"""
        SELECT COUNT(*) as total_rows, 
               SUM(CASE WHEN {column_name} IS NULL THEN 1 ELSE 0 END) as null_rows 
        FROM {schema}.{table_name}
        """
        if data_source=='LWCC':
            query = f"""
            SELECT COUNT(*) as total_rows, 
                SUM(CASE WHEN {column_name} IS NULL THEN 1 ELSE 0 END) as null_rows 
            FROM {table_name}
            """
        
        # Execute the query
        with engine.connect() as conn:
            result = conn.execute(text(query)).fetchone()
        
        # Process the results
        total_rows = result[0]
        null_rows = result[1]

        if isinstance(null_rows, Decimal):
            null_rows = int(null_rows)
        
        if total_rows > 0:
            null_percentage = (null_rows / total_rows) * 100
        else:
            null_percentage = 0
        
        error_flag = 1 if null_rows > 0 else 0        
        result_dict = {
            'DVE Run Date': today,
            'Data Source': "HXG" if data_source=='dbo' else data_source,
            'Table Name': table_name,
            'Column Name': column_name,
            'Total rows': total_rows,
            'Null Rows': null_rows,
            # 'Percentage': f"{null_percentage:.2f}%",
            'Error Flag': error_flag
        }     
        return [result_dict]
    except SQLAlchemyError as e:
        return {"error": f"Database error: {str(e)}"}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

# print(NULL_CHECK('HXG','Member','DateOfBirth','LHPProd'))



def UNIVERSE_CHECK(data_source, table_name, column_name, valid_values, db):
    try:
        # Create the database engine
        conn = openemr
        if db=='LHPProd':
            conn = LHPProd
        elif db=='LHP_VendorData':
            conn = LHP_VendorData

        engine =  create_engine(conn)
        schema = 'dbo' if data_source=='HXG' else data_source
        
        # Prepare valid values for the SQL query
        valid_values_list = [value.strip() for value in valid_values.split(',')]

        query = f"""
                SELECT 
                distinct [{column_name}] as out_of_uni_rows
                FROM {schema}.{table_name}
                where  {column_name} NOT IN ({','.join([f"'{value}'" for value in valid_values_list])}) 
            """
        if data_source=='LWCC':
            query = f"""
                SELECT 
                distinct {column_name} as out_of_uni_rows
                FROM {table_name}
                where  {column_name} NOT IN ({','.join([f"'{value}'" for value in valid_values_list])}) 
            """
        
        # Execute the query
        with engine.connect() as conn:
                result = conn.execute(text(query)).fetchall()

        values = []
        for i in result:
            # final_dict[i[0]] = ['NO',{"Error Flag" : 1}]
            values.append((i[0],'No'))
        for i in valid_values_list :
            i = i.replace("[","")
            i = i.replace("]","")
            # final_dict[i] = ['Yes',{"Error Flag" : 0}]
            values.append((i,'Yes'))
        
        
        # Construct and return the result dictionary
        result_list = []
        for val,part in values:
            result_list.append({
                'DVE Run Date' : today,
                'Table Name': table_name,
                'Column Name': column_name,
                'Value': val,
                'Part of the defined set?': part,
                'Error Flag': 0 if part=='Yes' else 1
            })
        
        return result_list

    except SQLAlchemyError as e:
        return {"error": f"Database error: {str(e)}"}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

# print(UNIVERSE_CHECK('LWCC','patient_data','sex','[Male,Female]','openemr'))




def FREQUENCY_CHECK(data_source, tablename, columnname, db):
  
    try:
        # Create the database engine
        conn = openemr
        if db=='LHPProd':
            conn = LHPProd
        elif db=='LHP_VendorData':
            conn = LHP_VendorData
            
        engine =  create_engine(conn)
        schema = 'dbo' if data_source=='HXG' else data_source

        threshold = 10
        result_list = []
        date_column = 'DOSTo'  
        start_of_year = date(today.year, 1, 1)

        # Query to get the latest date available in the table
        conn2 = LHPProd
        engine2 =  create_engine(conn2)
        latest_date_query = f"""
        SELECT MAX({date_column}) 
        FROM dbo.ClaimLineItemDetail
        """

        with engine2.connect() as conn2:
            latest_date_result = conn2.execute(text(latest_date_query)).fetchone()

        # If latest_date is None, skip this source and continue to the next one
        if latest_date_result and latest_date_result[0]:
            latest_date = latest_date_result[0]
        # print(latest_date.date())
        # if isinstance(latest_date,datetime.datetime):
        #     latest_date = latest_date.date()
        # Ensure latest_date is not in the future
        # today = date.today()
        latest_date = min(latest_date.date(), today)
        # print(start_of_year)

        # Construct the query to calculate category counts for the current year
        current_year_query = f"""
        SELECT {columnname}, COUNT(*) as count
        FROM {schema}.{tablename}
        WHERE date >= '{start_of_year}' AND date <= '{latest_date}'
        GROUP BY {columnname}
        """

        # Construct the query to calculate category counts for the previous year (based on date)
        previous_year_query = f"""
        SELECT {columnname}, COUNT(*) as count
        FROM {schema}.{tablename}
        WHERE date >= '{start_of_year - datetime.timedelta(days=365)}' 
        AND date <= '{latest_date - datetime.timedelta(days=365)}'
        GROUP BY {columnname}
        """

        if data_source=='LWCC':
            current_year_query = f"""
            SELECT {columnname}, COUNT(*) as count
            FROM {tablename}
            WHERE date >= '{start_of_year}' AND date <= '{latest_date}'
            GROUP BY {columnname}
            """

            previous_year_query = f"""
            SELECT {columnname}, COUNT(*) as count
            FROM {tablename}
            WHERE date >= '{start_of_year - datetime.timedelta(days=365)}' 
            AND date <= '{latest_date - datetime.timedelta(days=365)}'
            GROUP BY {columnname}
            """


        # Execute the queries
        with engine.connect() as conn:
            current_year_results = conn.execute(text(current_year_query)).fetchall()
            previous_year_results = conn.execute(text(previous_year_query)).fetchall()


        for (current_column, current_count), (previous_column, previous_count) in zip(current_year_results, previous_year_results):
            if previous_count != 0:
                percentage_diff = ((current_count - previous_count) / previous_count) * 100
            
            result_list.append({
                'DVE Run Date' : str(today),
                'Table Name': tablename,
                'Column Name': columnname,
                'Value': current_column,
                'Current Count': current_count,
                'Previous Count': previous_count,
                'Error flag': 1 if abs(percentage_diff)>threshold else 0
            })

        return result_list

    except FileNotFoundError:
        return json.dumps({"error": "Excel file not found."})
    except SQLAlchemyError as e:
        return json.dumps({"error": f"Database error: {str(e)}"})
    except Exception as e:
        return json.dumps({"error": f"An error occurred: {e}"})

# print(FREQUENCY_CHECK('LWCC','patient_data','sex','openemr'))



def INVALID_DATE_CHECK(data_source, table_name, column_name, base_table_member, db):
    try:
        conn = openemr
        if db=='LHPProd':
            conn = LHPProd
        elif db=='LHP_VendorData':
            conn = LHP_VendorData
            
        engine =  create_engine(conn)
        schema = 'dbo' if data_source=='HXG' else data_source

        result_list = []

        # Modified query to get member ids and dates with incorrect format or 1/1/1900
        # query = f"""
        #     SELECT
        #         {column_name},
        #         [{base_table_member}]
        #     FROM {schema}.{table_name}
        #     WHERE
        #         {column_name} is NULL
        #         OR TRY_CONVERT(DATE, {column_name}) IS NULL
        #         OR {column_name} = '1900-01-01'  
        # """
        query2 = f"""
            SELECT
                {column_name},
                count(*) as counts
            FROM {schema}.{table_name}
            WHERE
                {column_name} is NULL
                OR TRY_CONVERT(DATE, {column_name}) IS NULL
                OR {column_name} = '1900-01-01'  
                group by {column_name}
        """

        if data_source=='LWCC':
            # query = f"""
            #     SELECT
            #         {column_name},
            #         [{base_table_member}]
            #     FROM {schema}.{table_name}
            #     WHERE
            #         {column_name} is NULL
            #         OR TRY_CONVERT(DATE, {column_name}) IS NULL
            #         OR {column_name} = '1900-01-01'  
            # """
            query2 = f"""
                SELECT
                    {column_name},
                    count(*) as counts
                FROM {schema}.{table_name}
                WHERE
                    {column_name} is NULL
                    OR TRY_CONVERT(DATE, {column_name}) IS NULL
                    OR {column_name} = '1900-01-01'  
                    group by {column_name}
            """


        with engine.connect() as conn:
            # result = conn.execute(text(query)).fetchall()  # Fetch all rows
            result2 = conn.execute(text(query2)).fetchall()

        invalid_date_counts = []
        for row in result2:
            # invalid_date_counts.append({
            #     'Date' : row[0].strftime('%m/%d/%Y') ,
            #     'Counts' : row[1]
            # })
            result_list.append({
            'DVE Run Date' : today,
            'Table Name': table_name,
            'Column Name': column_name,
            'Value': row[0].strftime('%m/%d/%Y'),
            'Count': row[1]
        })

        return result_list

    except FileNotFoundError:
        return json.dumps({"error": "Excel file not found."})
    except SQLAlchemyError as e:
        return json.dumps({"error": f"Database error: {str(e)}"})
    except Exception as e:
        return json.dumps({"error": f"An error occurred: {str(e)}"})




def FUTURE_DATE_CHECK(data_source, table_name, column_name, check_data_source, check_table, check_column, base_table_member, check_table_member,db):
    try:
        conn = openemr
        if db=='LHPProd':
            conn = LHPProd
        elif db=='LHP_VendorData':
            conn = LHP_VendorData
        engine =  create_engine(conn)

        # threshold_percentage = 0
        # df = df[df['Primary_Key']=='Date of Deceased']
        result_list = []
        schema = 'dbo' if data_source=='HXG' else data_source

        # WITH base_data AS (
            #     SELECT DISTINCT  [{base_table_member}], {column_name}
            #     FROM [{schema}].[{table_name}]
            # ),
            # check_data AS (
            #     SELECT DISTINCT [{check_table_member}], {check_column}
            #     FROM [{schema}].[{check_table}]
            # ),
            # inconsistent_members AS (
            #     SELECT b.[{base_table_member}], b.{column_name} as base_date, c.{check_column} as check_date
            #     FROM base_data b
            #     JOIN check_data c ON cast(b.[{base_table_member}] as nvarchar) = cast(c.[{check_table_member}] as nvarchar)
            #     WHERE cast(b.{column_name} as date) < cast(c.{check_column} as date)
            # )
            # select base_date , count(*) as counts from inconsistent_members group by base_date

        # above query was giving an error pyodbc.DataError Conversion failed when converting date and/or time from character string

        query3 = f"""
            WITH base_data AS (
                SELECT DISTINCT [{base_table_member}], TRY_CONVERT(DATE, {column_name}) AS base_date
                FROM [{schema}].[{table_name}]
                WHERE TRY_CONVERT(DATE, {column_name}) IS NOT NULL
            ),
            check_data AS (
                SELECT DISTINCT [{check_table_member}], TRY_CONVERT(DATE, {check_column}) AS check_date
                FROM [{schema}].[{check_table}]
                WHERE TRY_CONVERT(DATE, {check_column}) IS NOT NULL
            ),
            inconsistent_members AS (
                SELECT b.[{base_table_member}], b.base_date, c.check_date
                FROM base_data b
                JOIN check_data c ON CAST(b.[{base_table_member}] AS NVARCHAR) = CAST(c.[{check_table_member}] AS NVARCHAR)
                WHERE b.base_date < c.check_date
            )
            SELECT base_date, COUNT(*) AS counts
            FROM inconsistent_members
            GROUP BY base_date
            """

        if data_source=='LWCC':
            query3 = f"""
            WITH base_data AS (
    SELECT DISTINCT 
        {base_table_member}, 
        STR_TO_DATE({column_name}, '%Y-%m-%d') AS base_date
    FROM {table_name}
    WHERE STR_TO_DATE({column_name}, '%Y-%m-%d') IS NOT NULL
),
check_data AS (
    SELECT DISTINCT 
        {check_table_member}, 
        STR_TO_DATE({check_column}, '%Y-%m-%d') AS check_date
    FROM {check_table}
    WHERE STR_TO_DATE({check_column}, '%Y-%m-%d') IS NOT NULL
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
SELECT 
    base_date, 
    COUNT(*) AS counts
FROM inconsistent_members
GROUP BY base_date
            """

        with engine.connect() as conn:
            # result = conn.execute(text(query)).fetchall()
            # result2 = conn.execute(text(query2)).fetchone()# Fetch all rows
            result3 = conn.execute(text(query3)).fetchall()
            
        # total_rows = result2[0]
        # invalid_rows = 0
        # invalid_date_counts = []  # Store member ids and dates
        for row in result3:
            # invalid_date_counts.append({
            #     'Date' : row[0].strftime('%m/%d/%Y'),
            #     'Counts' : row[1]
            # })
            result_list.append({
            'DVE Run Date': today,
            'Table Name': table_name,
            'Column Name': column_name,
            'Value':  row[0].strftime('%m/%d/%Y'),
            'Count': row[1]
        })
        
        return result_list

    except FileNotFoundError:
        return json.dumps({"error": "Excel file not found."})
    except SQLAlchemyError as e:
        return json.dumps({"error": f"Database error: {str(e)}"})
    except Exception as e:
        return json.dumps({"error": f"An error occurred: {str(e)}"})

# print(FUTURE_DATE_CHECK('HXG','Member','DateOfBirth','HXG','Member','DeathDate','MemberID','MemberID','LHPProd'))



def DUPLICATE_CHECK(data_source, table_name, column_name, db):
    try:
        conn = openemr
        if db=='LHPProd':
            conn = LHPProd
        elif db=='LHP_VendorData':
            conn = LHP_VendorData
            
        engine =  create_engine(conn)
        schema = 'dbo' if data_source=='HXG' else data_source

        result_list = []

        # query = f"""
        #     SELECT 
        #         COUNT(*) as total_rows, 
        #         COUNT(DISTINCT {column_name}) as distinct_values
        #     FROM {schema}.{table_name}
        # """
        query2 = f"""
        select {column_name} , count(*) as duplicate_count
        from {schema}.{table_name}
        group by {column_name} 
        having count(*)>1
        """

        if data_source=='LWCC':
            # query = f"""
            #     SELECT 
            #         COUNT(*) as total_rows, 
            #         COUNT(DISTINCT {column_name}) as distinct_values
            #     FROM {table_name}
            # """
            query2 = f"""
            select {column_name} , count(*) as duplicate_count
            from {table_name}
            group by {column_name} 
            having count(*)>1
        """

        with engine.connect() as conn:
            # result = conn.execute(text(query)).fetchone()
            result2 = conn.execute(text(query2)).fetchall()

        duplicate_rows_list = []
        for row in result2:
            # duplicate_rows_list.append({
            #     'Value' : row[0],
            #     'Counts' : row[1]
            # })
            result_list.append({
            'DVE Run Date' :  today,
            'Table Name': table_name,
            'Column Name': column_name,
            'Value': row[0],
            'Duplicate Detected?': 'Yes' if row[1]>0 else 'No',
            'Duplicate Count': row[1],
            'Error Flag': 1 if row[1]>0 else 0
        })

        
        # result_json = json.dumps(result_list)
        return result_list
    
    except FileNotFoundError:
        return json.dumps({"error": "Excel file not found."})
    except SQLAlchemyError as e:
        return json.dumps({"error": f"Database error: {str(e)}"})
    except Exception as e:
        return json.dumps({"error": f"An error occurred: {str(e)}"})





def health_checker(source_list,function_list):
    x = 0
    summary_list = []
    for i,source in enumerate(source_list):
        for j,function in enumerate(function_list):
            x += 1
            if function == 'Data Availability Check':
                threshold = 0
                details = availablity_check(source)
                errors = get_error_sum(details)
                test_dict = {
                    'test_id' : test_case_num(x),
                    'DVE_run_date' : today,
                    'test_type' : function,
                    'test_desc' : 'Number of required tables not available',
                    'data_source' : source,
                    'threshold' : threshold,
                    'number_of_errors' : errors,
                    'result' : 'Pass' if errors <= threshold else 'Fail',
                    'details' : details 
                }
                summary_list.append(convert_nan_to_string(test_dict))                
                                    
            elif function == 'Table Schema Check':
                threshold = 0
                details = schema_check(source)
                errors = get_error_sum(details)
                test_dict = {
                    'test_id' : test_case_num(x),
                    'DVE_run_date' : today,
                    'test_type' : function,
                    'test_desc' : 'Number of columns not in expected format',
                    'data_source' : source,
                    'threshold' : threshold,
                    'number_of_errors' : errors,
                    'result' : 'Pass' if errors <= threshold else 'Fail',
                    'details' : details    
                }
                summary_list.append(convert_nan_to_string(test_dict))

            elif function == 'Column Value Consistency Check':
                threshold = 0
                test_id = test_case_num(x)
                details = column_value_consistency_check(source,test_id)
                errors = get_error_sum(details)
                test_dict = {
                    'test_id' : test_id,
                    'DVE_run_date' : today,
                    'test_type' : function,
                    'test_desc' : 'Number of columns with inconsistent or incorrect values',
                    'data_source' : source,
                    'threshold' : threshold,
                    'number_of_errors' : errors,
                    'result' : 'Pass' if errors <= threshold else 'Fail',
                    'details' : details    #(tc_num, run_date, source, table, column, data_type, test_type, comparision, error_flag, details)
                }
                summary_list.append(convert_nan_to_string(test_dict))
    
    return summary_list



# print(health_checker(["LWCC"],["Data Availability Check"]))
# print(health_checker(["LWCC"],["Column Value Consistency Check"]))