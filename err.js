[
  {
    "DVE_run_date": "2024-09-06",
    "data_source": "HXG",
    "details": [
      {
        "column": "DateOfBirth",
        "comparision": "",
        "data_type": "datetime",
        "details": {},
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "Member",
        "test_id": "TC001.01",
        "test_type": "Invalid Date check"
      },
      {
        "column": "DateOfBirth",
        "comparision": "null check",
        "data_type": "datetime",
        "details": {
          "ColumnName": "DateOfBirth",
          "DataSource": "HXG",
          "Error Flag": 0,
          "Null Rows": 0,
          "Percentage": "0.00%",
          "TableName": "Member",
          "Total rows": 14829
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "Member",
        "test_id": "TC001.02",
        "test_type": "Null Check"
      },
      {
        "column": "AdmissionDate",
        "comparision": "",
        "data_type": "datetime",
        "details": {},
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "ClaimInstitutionalDetail",
        "test_id": "TC001.04",
        "test_type": "Invalid Date check"
      },
      {
        "column": "DOSTo",
        "comparision": "",
        "data_type": "datetime",
        "details": {},
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC001.05",
        "test_type": "Invalid Date check"
      },
      {
        "column": "DOSFrom",
        "comparision": "",
        "data_type": "datetime",
        "details": {},
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC001.06",
        "test_type": "Invalid Date check"
      },
      {
        "column": "Transaction_Status",
        "comparision": "universe check",
        "data_type": "bignit",
        "details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n            SELECT \n                COUNT(*) as total_rows, \n                SUM(CASE WHEN Transaction_Status NOT IN ('[ blank','01','04]') THEN 1 ELSE 0 END) as out_of_universe_rows\n            FROM dbo.LHPPharmacyClaimsData\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC001.07",
        "test_type": "Universe Check"
      },
      {
        "column": "AdmissionDate",
        "comparision": "null check",
        "data_type": "datetime",
        "details": {
          "ColumnName": "AdmissionDate",
          "DataSource": "HXG",
          "Error Flag": 1,
          "Null Rows": 40579,
          "Percentage": "39.71%",
          "TableName": "ClaimInstitutionalDetail",
          "Total rows": 102184
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "ClaimInstitutionalDetail",
        "test_id": "TC001.08",
        "test_type": "Null Check"
      },
      {
        "column": "DOSTo",
        "comparision": "null check",
        "data_type": "datetime",
        "details": {
          "ColumnName": "DOSTo",
          "DataSource": "HXG",
          "Error Flag": 1,
          "Null Rows": 201,
          "Percentage": "0.00%",
          "TableName": "ClaimLineItemDetail",
          "Total rows": 6561320
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC001.10",
        "test_type": "Null Check"
      },
      {
        "column": "DOSFrom",
        "comparision": "null check",
        "data_type": "datetime",
        "details": {
          "ColumnName": "DOSFrom",
          "DataSource": "HXG",
          "Error Flag": 0,
          "Null Rows": 0,
          "Percentage": "0.00%",
          "TableName": "ClaimLineItemDetail",
          "Total rows": 6561320
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC001.12",
        "test_type": "Null Check"
      },
      {
        "column": "DeathDate",
        "comparision": "",
        "data_type": "datetime",
        "details": {},
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "Member",
        "test_id": "TC001.15",
        "test_type": "Invalid Date check"
      },
      {
        "column": "Date_Of_Service1",
        "comparision": "null check",
        "data_type": "varchar",
        "details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN Date_Of_Service1 IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.LHPPharmacyClaimsData\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC001.17",
        "test_type": "Null Check"
      },
      {
        "column": "Date_Of_Service1",
        "comparision": "",
        "data_type": "varchar",
        "details": {},
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC001.18",
        "test_type": "Invalid Date check"
      },
      {
        "column": "Days_Supply",
        "comparision": "null check",
        "data_type": "varchar",
        "details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN Days_Supply IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.LHPPharmacyClaimsData\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC001.20",
        "test_type": "Null Check"
      },
      {
        "column": "CodeNumber",
        "comparision": "null check",
        "data_type": "varchar",
        "details": {
          "ColumnName": "CodeNumber",
          "DataSource": "HXG",
          "Error Flag": 0,
          "Null Rows": 0,
          "Percentage": "0.00%",
          "TableName": "ClaimCodeDetail",
          "Total rows": 11113640
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "ClaimCodeDetail",
        "test_id": "TC001.21",
        "test_type": "Null Check"
      },
      {
        "column": "PrincipalProc",
        "comparision": "null check",
        "data_type": "varchar",
        "details": {
          "ColumnName": "PrincipalProc",
          "DataSource": "HXG",
          "Error Flag": 1,
          "Null Rows": 95746,
          "Percentage": "93.70%",
          "TableName": "ClaimInstitutionalDetail",
          "Total rows": 102184
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "ClaimInstitutionalDetail",
        "test_id": "TC001.22",
        "test_type": "Null Check"
      },
      {
        "column": "HCPCSorHIPPSCode",
        "comparision": "null check",
        "data_type": "varchar",
        "details": {
          "ColumnName": "HCPCSorHIPPSCode",
          "DataSource": "HXG",
          "Error Flag": 1,
          "Null Rows": 5221770,
          "Percentage": "79.58%",
          "TableName": "ClaimLineItemDetail",
          "Total rows": 6561320
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC001.23",
        "test_type": "Null Check"
      },
      {
        "column": "RenderingProviderNPI",
        "comparision": "null check",
        "data_type": "varchar",
        "details": {
          "ColumnName": "RenderingProviderNPI",
          "DataSource": "HXG",
          "Error Flag": 1,
          "Null Rows": 1678499,
          "Percentage": "25.58%",
          "TableName": "ClaimLineItemDetail",
          "Total rows": 6561320
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC001.24",
        "test_type": "Null Check"
      },
      {
        "column": "Pharmacy_NPI",
        "comparision": "null check",
        "data_type": "varchar",
        "details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN Pharmacy_NPI IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.LHPPharmacyClaimsData\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC001.25",
        "test_type": "Null Check"
      },
      {
        "column": "Date_Prescription_Written",
        "comparision": "null check",
        "data_type": "datetime",
        "details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN Date_Prescription_Written IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.LHPPharmacyClaimsData\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC001.26",
        "test_type": "Null Check"
      },
      {
        "column": "Date_Prescription_Written",
        "comparision": "",
        "data_type": "datetime",
        "details": {},
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "LHPPharmacyClaimsData",
        "test_id": "TC001.27",
        "test_type": "Invalid Date check"
      },
      {
        "column": "MemberID",
        "comparision": "null check",
        "data_type": "varchar",
        "details": {
          "ColumnName": "MemberID",
          "DataSource": "HXG",
          "Error Flag": 0,
          "Null Rows": 0,
          "Percentage": "0.00%",
          "TableName": "ClaimMemberDetail",
          "Total rows": 1909321
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "ClaimMemberDetail",
        "test_id": "TC001.29",
        "test_type": "Null Check"
      },
      {
        "column": "StatusID",
        "comparision": "null check",
        "data_type": "int",
        "details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.Claims'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN StatusID IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.Claims\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "Claims",
        "test_id": "TC001.30",
        "test_type": "Null Check"
      },
      {
        "column": "PlaceOfService",
        "comparision": "universe check",
        "data_type": "char",
        "details": {
          "ColumnName": "PlaceOfService",
          "DataSource": "HXG",
          "Error Flag": 1,
          "Out-of-universe Rows": 9347,
          "Percentage": "0.14%",
          "TableName": "ClaimLineItemDetail",
          "Total rows": 6561320
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC001.31",
        "test_type": "Universe Check"
      },
      {
        "column": "PlaceOfService",
        "comparision": "null check",
        "data_type": "char",
        "details": {
          "ColumnName": "PlaceOfService",
          "DataSource": "HXG",
          "Error Flag": 1,
          "Null Rows": 31,
          "Percentage": "0.00%",
          "TableName": "ClaimLineItemDetail",
          "Total rows": 6561320
        },
        "run_date": "2024-09-06",
        "source": "HXG",
        "table": "ClaimLineItemDetail",
        "test_id": "TC001.32",
        "test_type": "Null Check"
      }
    ],
    "number_of_errors": 0,
    "result": "Pass",
    "test_desc": "Number of columns with inconsistent or incorrect values",
    "test_id": "TC001",
    "test_type": "Column Value Consistency Check",
    "threshold": 0
  }
]
