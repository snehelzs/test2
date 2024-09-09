[
  {
    "DVE_run_date": "2024-09-09",
    "data_source": "HXG",
    "details": [
      {
        "Associated Measure": "[PCE, CBP, PBH, SPC, CRE, GSD, BPD, EED, KED, SPD, OMW, OSW, AMM, FUH, FUM, FUA, SAA, TRC, FMC, PSA, DDE, DAE, HDO, UOP, POD, AAP, IET, PCR, HFS, AHU, EDU, HPC, ENP, BCS-E, DSF-E, AIS-E, SNS-E, COL-E, DMS-E, DRR-E, ASF-E, COA]",
        "DataSource": "HXG",
        "Error Flag": 0,
        "Table Exists": "Yes",
        "TableName": "Member",
        "date": "2024-09-09"
      },
      {
        "Associated Measure": "[HPC, CBP, PCE,  CBP,  PBH,  SPC,  FUH,  TRC,  FMC,  PCR,  HFS,  AHU,  HPC, BCS-E, HFS, COL-E, SPC, CRE, SPD]",
        "DataSource": "HXG",
        "Error Flag": 0,
        "Table Exists": "Yes",
        "TableName": "ClaimInstitutionalDetail",
        "date": "2024-09-09"
      },
      {
        "Associated Measure": "[CBP, EED, DAE, HDO, UOP, IET, EDU, SPC, GSD, BPD, KED, SPD, OSW, FUM, FUA, SAA, FMC, PSA, POD, AAP, AHU, HPC, COA]",
        "DataSource": "HXG",
        "Error Flag": 0,
        "Table Exists": "Yes",
        "TableName": "ClaimLineItemDetail",
        "date": "2024-09-09"
      },
      {
        "Associated Measure": "[EED, FMC, AAP, AHU, SPC, SPD, HPC, CBP, PBH, CRE, GSD, BPD, KED, OMW, OSW, SAA, BCS-E, COL-E, DDE, DAE, PCE, AMM, FUH, FUM, EDU, DMS-E, DRR-E, DSF-E, PCR, HFS, HDO, FUA, IET, ASF-E, PSA]",
        "DataSource": "HXG",
        "Error Flag": 0,
        "Table Exists": "Yes",
        "TableName": "ClaimCodeDetail",
        "date": "2024-09-09"
      },
      {
        "Associated Measure": "[BPD,  AMM,  FMC,  COA,  AAP,  FUA,  DSF-E,  FUH,  FUM,  SAA,  IET,  OMW,  CBP,  BPD,  COL-E,  EED,  KED,  ASF-E,  SNS-E,  AIS-E,  DMS-E,  DRR-E,  BCS-E,  SPC,  SPD,  PSA,  EDU,  DDE]",
        "DataSource": "HXG",
        "Error Flag": 1,
        "Table Exists": "No",
        "TableName": "dbo.ClaimLineItemDetail",
        "date": "2024-09-09"
      },
      {
        "Associated Measure": "[SPC, BCS-E, OMW, OSW]",
        "DataSource": "HXG",
        "Error Flag": 0,
        "Table Exists": "Yes",
        "TableName": "ClaimMemberDetail",
        "date": "2024-09-09"
      },
      {
        "Associated Measure": "[EED, FMC, AAP, AHU, SPC, SPD, HPC, CBP, PBH, CRE, GSD, BPD, KED, OMW, OSW, SAA, BCS-E, COL-E, DDE, DAE, PCE, AMM, FUH, FUM, EDU, DMS-E, DRR-E, DSF-E, PCR, HFS, HDO, FUA, IET, ASF-E, PSA]",
        "DataSource": "HXG",
        "Error Flag": 1,
        "Table Exists": "No",
        "TableName": "Claims",
        "date": "2024-09-09"
      }
    ],
    "number_of_errors": 2,
    "result": "Fail",
    "test_desc": "Number of required tables not available",
    "test_id": "TC001",
    "test_type": "Data Availability Check",
    "threshold": 0
  },
  {
    "DVE_run_date": "2024-09-09",
    "data_source": "HXG",
    "details": [
      {
        "Associated Measure": "[PCE, CBP, PBH, SPC, CRE, GSD, BPD, EED, KED, SPD, OMW, OSW, AMM, FUH, FUM, FUA, SAA, TRC, FMC, PSA, DDE, DAE, HDO, UOP, POD, AAP, IET, PCR, HFS, AHU, EDU, HPC, ENP, BCS-E, DSF-E, AIS-E, SNS-E, COL-E, DMS-E, DRR-E, ASF-E, COA]",
        "Column": "DateOfBirth",
        "Current Data Type": "datetime",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "datetime",
        "Table": "Member",
        "date": "2024-09-09"
      },
      {
        "Associated Measure": "[CBP, PBH, CRE, FUH, FUM, TRC, IET, PCR, HFS, AMM, OMW, FUA, FMC]",
        "Column": "AdmissionDate",
        "Current Data Type": "datetime",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "datetime",
        "Table": "ClaimInstitutionalDetail",
        "date": "2024-09-09"
      },
      {
        "Associated Measure": "[CBP, EED, DAE, HDO, UOP, IET, EDU, SPC, GSD, BPD, KED, SPD, OSW, FUM, FUA, SAA, FMC, PSA, POD, AAP, AHU, HPC, COA]",
        "Column": "DOSTo",
        "Current Data Type": "datetime",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "datetime",
        "Table": "ClaimLineItemDetail",
        "date": "2024-09-09"
      },
      {
        "Associated Measure": "[CBP, EED, DAE, HDO, UOP, IET, EDU, SPC, GSD, BPD, KED, SPD, OSW, FUM, FUA, SAA, FMC, PSA, POD, AAP, AHU, HPC, COA]",
        "Column": "DOSFrom",
        "Current Data Type": "datetime",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "datetime",
        "Table": "ClaimLineItemDetail",
        "date": "2024-09-09"
      },
      {
        "Associated Measure": "[PCE, CBP, PBH, SPC, CRE, GSD, BPD, EED, KED, SPD, OMW, OSW, AMM, FUH, FUM, FUA, SAA, TRC, FMC, PSA, DDE, DAE, HDO, UOP, POD, AAP, IET, BCS-E, DSF-E, AIS-E, SNS-E, COL-E, DMS-E, DRR-E, ASF-E, COA]",
        "Column": "DeathDate",
        "Current Data Type": "datetime",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "datetime",
        "Table": "Member",
        "date": "2024-09-09"
      },
      {
        "Associated Measure": "[EED, FMC, AAP, AHU, SPC, SPD, HPC, CBP, PBH, CRE, GSD, BPD, KED, OMW, OSW, SAA, BCS-E, COL-E, DDE, DAE, PCE, AMM, FUH, FUM, EDU, DMS-E, DRR-E, DSF-E, PCR, HFS, HDO, FUA, IET, ASF-E, PSA]",
        "Column": "CodeNumber",
        "Current Data Type": "varchar",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "varchar",
        "Table": "ClaimCodeDetail",
        "date": "2024-09-09"
      },
      {
        "Associated Measure": "[SPC, CRE, SPD, CBP, SPD, SPC, DDE, HPC, KED, AMM, FUH, FUM, SAA, FMC, EDU, CRE, HPC, PCR, HFS, AHU, IET,BCS-E, COL-E]",
        "Column": "PrincipalProc",
        "Current Data Type": "varchar",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "varchar",
        "Table": "ClaimInstitutionalDetail",
        "date": "2024-09-09"
      },
      {
        "Column": "HCPCSorHIPPSCode",
        "Current Data Type": "Column not found",
        "Data Source": "HXG",
        "Error Flag": 1,
        "Expected Data Type": "varchar",
        "Table": "dbo.ClaimLineItemDetail"
      },
      {
        "Associated Measure": "UOP",
        "Column": "RenderingProviderNPI",
        "Current Data Type": "varchar",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "varchar",
        "Table": "ClaimLineItemDetail",
        "date": "2024-09-09"
      },
      {
        "Associated Measure": "[CBP, EED, DAE, HDO, UOP, IET, EDU, SPC, GSD, BPD, KED, SPD, OSW, FUM, FUA, SAA, FMC, PSA, POD, AAP, AHU, HPC, COA]",
        "Column": "MemberID",
        "Current Data Type": "bigint",
        "Data Source": "HXG",
        "Error Flag": 1,
        "Expected Data Type": "varchar",
        "Table": "ClaimMemberDetail",
        "date": "2024-09-09"
      },
      {
        "Column": "StatusID",
        "Current Data Type": "Column not found",
        "Data Source": "HXG",
        "Error Flag": 1,
        "Expected Data Type": "int",
        "Table": "Claims"
      },
      {
        "Associated Measure": "[CBP, BPD, SAA, COA, FUH, AMM, FUM, FUA, FMC, IET]",
        "Column": "PlaceOfService",
        "Current Data Type": "char",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "char",
        "Table": "ClaimLineItemDetail",
        "date": "2024-09-09"
      }
    ],
    "number_of_errors": 3,
    "result": "Fail",
    "test_desc": "Number of columns not in expected format",
    "test_id": "TC002",
    "test_type": "Table Schema Check",
    "threshold": 0
  },
  {
    "DVE_run_date": "2024-09-09",
    "data_source": "HXG",
    "details": [
      {
        "Error Flag": 0,
        "column": "DateOfBirth",
        "comparision": "",
        "data_type": "datetime",
        "details": [],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "Member",
        "test_id": "TC003.01",
        "test_type": "Invalid Date check"
      },
      {
        "Error Flag": 1,
        "column": "DateOfBirth",
        "comparision": "null check",
        "data_type": "datetime",
        "details": [
          {
            "ColumnName": "DateOfBirth",
            "DataSource": "HXG",
            "Error Flag": 0,
            "Null Rows": 0,
            "Percentage": "0.00%",
            "TableName": "Member",
            "Total rows": 14831
          }
        ],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "Member",
        "test_id": "TC003.02",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 0,
        "column": "AdmissionDate",
        "comparision": "",
        "data_type": "datetime",
        "details": [],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "ClaimInstitutionalDetail",
        "test_id": "TC003.04",
        "test_type": "Invalid Date check"
      },
      {
        "Error Flag": 0,
        "column": "DOSTo",
        "comparision": "",
        "data_type": "datetime",
        "details": [],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC003.05",
        "test_type": "Invalid Date check"
      },
      {
        "Error Flag": 0,
        "column": "DOSFrom",
        "comparision": "",
        "data_type": "datetime",
        "details": [],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC003.06",
        "test_type": "Invalid Date check"
      },
      {
        "Error Flag": 1,
        "column": "Transaction_Status",
        "comparision": "universe check",
        "data_type": "bignit",
        "details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n                SELECT \n                distinct [Transaction_Status] as out_of_uni_rows\n                FROM dbo.LHPPharmacyClaimsData\n                where  Transaction_Status NOT IN ('[ blank','01','04]') \n            ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC003.07",
        "test_type": "Universe Check"
      },
      {
        "Error Flag": 1,
        "column": "AdmissionDate",
        "comparision": "null check",
        "data_type": "datetime",
        "details": [
          {
            "ColumnName": "AdmissionDate",
            "DataSource": "HXG",
            "Error Flag": 1,
            "Null Rows": 40744,
            "Percentage": "39.66%",
            "TableName": "ClaimInstitutionalDetail",
            "Total rows": 102722
          }
        ],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "ClaimInstitutionalDetail",
        "test_id": "TC003.08",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 1,
        "column": "DOSTo",
        "comparision": "null check",
        "data_type": "datetime",
        "details": [
          {
            "ColumnName": "DOSTo",
            "DataSource": "HXG",
            "Error Flag": 1,
            "Null Rows": 201,
            "Percentage": "0.00%",
            "TableName": "ClaimLineItemDetail",
            "Total rows": 6582633
          }
        ],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC003.10",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 1,
        "column": "DOSFrom",
        "comparision": "null check",
        "data_type": "datetime",
        "details": [
          {
            "ColumnName": "DOSFrom",
            "DataSource": "HXG",
            "Error Flag": 0,
            "Null Rows": 0,
            "Percentage": "0.00%",
            "TableName": "ClaimLineItemDetail",
            "Total rows": 6582633
          }
        ],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC003.12",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 0,
        "column": "DeathDate",
        "comparision": "",
        "data_type": "datetime",
        "details": [],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "Member",
        "test_id": "TC003.15",
        "test_type": "Invalid Date check"
      },
      {
        "Error Flag": 1,
        "column": "Date_Of_Service1",
        "comparision": "null check",
        "data_type": "varchar",
        "details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN Date_Of_Service1 IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.LHPPharmacyClaimsData\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC003.17",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 0,
        "column": "Date_Of_Service1",
        "comparision": "",
        "data_type": "varchar",
        "details": [],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC003.18",
        "test_type": "Invalid Date check"
      },
      {
        "Error Flag": 1,
        "column": "Days_Supply",
        "comparision": "null check",
        "data_type": "varchar",
        "details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN Days_Supply IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.LHPPharmacyClaimsData\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC003.20",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 1,
        "column": "CodeNumber",
        "comparision": "null check",
        "data_type": "varchar",
        "details": [
          {
            "ColumnName": "CodeNumber",
            "DataSource": "HXG",
            "Error Flag": 0,
            "Null Rows": 0,
            "Percentage": "0.00%",
            "TableName": "ClaimCodeDetail",
            "Total rows": 11141136
          }
        ],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "ClaimCodeDetail",
        "test_id": "TC003.21",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 1,
        "column": "PrincipalProc",
        "comparision": "null check",
        "data_type": "varchar",
        "details": [
          {
            "ColumnName": "PrincipalProc",
            "DataSource": "HXG",
            "Error Flag": 1,
            "Null Rows": 96260,
            "Percentage": "93.71%",
            "TableName": "ClaimInstitutionalDetail",
            "Total rows": 102722
          }
        ],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "ClaimInstitutionalDetail",
        "test_id": "TC003.22",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 1,
        "column": "HCPCSorHIPPSCode",
        "comparision": "null check",
        "data_type": "varchar",
        "details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.dbo.ClaimLineItemDetail'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN HCPCSorHIPPSCode IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.dbo.ClaimLineItemDetail\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "dbo.ClaimLineItemDetail",
        "test_id": "TC003.23",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 1,
        "column": "RenderingProviderNPI",
        "comparision": "null check",
        "data_type": "varchar",
        "details": [
          {
            "ColumnName": "RenderingProviderNPI",
            "DataSource": "HXG",
            "Error Flag": 1,
            "Null Rows": 1686790,
            "Percentage": "25.62%",
            "TableName": "ClaimLineItemDetail",
            "Total rows": 6582633
          }
        ],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC003.24",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 1,
        "column": "Pharmacy_NPI",
        "comparision": "null check",
        "data_type": "varchar",
        "details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN Pharmacy_NPI IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.LHPPharmacyClaimsData\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC003.25",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 1,
        "column": "Date_Prescription_Written",
        "comparision": "null check",
        "data_type": "datetime",
        "details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN Date_Prescription_Written IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.LHPPharmacyClaimsData\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC003.26",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 0,
        "column": "Date_Prescription_Written",
        "comparision": "",
        "data_type": "datetime",
        "details": [],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC003.27",
        "test_type": "Invalid Date check"
      },
      {
        "Error Flag": 1,
        "column": "MemberID",
        "comparision": "null check",
        "data_type": "varchar",
        "details": [
          {
            "ColumnName": "MemberID",
            "DataSource": "HXG",
            "Error Flag": 0,
            "Null Rows": 0,
            "Percentage": "0.00%",
            "TableName": "ClaimMemberDetail",
            "Total rows": 1914793
          }
        ],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "ClaimMemberDetail",
        "test_id": "TC003.29",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 1,
        "column": "StatusID",
        "comparision": "null check",
        "data_type": "int",
        "details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.Claims'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN StatusID IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.Claims\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "Claims",
        "test_id": "TC003.30",
        "test_type": "Null Check"
      },
      {
        "Error Flag": 1,
        "column": "PlaceOfService",
        "comparision": "universe check",
        "data_type": "char",
        "details": [
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "TableName": "ClaimLineItemDetail",
            "Values": "  "
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "TableName": "ClaimLineItemDetail",
            "Values": "01"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "TableName": "ClaimLineItemDetail",
            "Values": "02"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "TableName": "ClaimLineItemDetail",
            "Values": "03"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "TableName": "ClaimLineItemDetail",
            "Values": "04"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "TableName": "ClaimLineItemDetail",
            "Values": "1 "
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "TableName": "ClaimLineItemDetail",
            "Values": "52"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "TableName": "ClaimLineItemDetail",
            "Values": "N "
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "1"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "2"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "3"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "4"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "10"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "11"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "12"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "13"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "14"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "15"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "19"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "20"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "21"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "22"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "23"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "24"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "26"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "27"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "29"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "31"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "32"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "33"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "34"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "41"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "42"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "49"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "50"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "51"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "53"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "55"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "57"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "58"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "60"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "61"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "62"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "65"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "71"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "72"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "81"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "99"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "A"
          },
          {
            "ColumnName": "PlaceOfService",
            "DVE_Run_Date": "09092024",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "TableName": "ClaimLineItemDetail",
            "Values": "N"
          }
        ],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC003.31",
        "test_type": "Universe Check"
      },
      {
        "Error Flag": 1,
        "column": "PlaceOfService",
        "comparision": "null check",
        "data_type": "char",
        "details": [
          {
            "ColumnName": "PlaceOfService",
            "DataSource": "HXG",
            "Error Flag": 1,
            "Null Rows": 31,
            "Percentage": "0.00%",
            "TableName": "ClaimLineItemDetail",
            "Total rows": 6582633
          }
        ],
        "run_date": "2024-09-09",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC003.32",
        "test_type": "Null Check"
      }
    ],
    "number_of_errors": 17,
    "result": "Fail",
    "test_desc": "Number of columns with inconsistent or incorrect values",
    "test_id": "TC003",
    "test_type": "Column Value Consistency Check",
    "threshold": 0
  }
]
