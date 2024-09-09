[
  {
    "DVE_run_date": "2024-09-09",
    "data_source": "HXG",
    "details": [
      {
        "Associated Measure": "[PCE, CBP, PBH, SPC, CRE, GSD, BPD, EED, KED, SPD, OMW, OSW, AMM, FUH, FUM, FUA, SAA, TRC, FMC, PSA, DDE, DAE, HDO, UOP, POD, AAP, IET, PCR, HFS, AHU, EDU, HPC, ENP, BCS-E, DSF-E, AIS-E, SNS-E, COL-E, DMS-E, DRR-E, ASF-E, COA]",
        "Availability": "Yes",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Table Last Refresh": "2024-09-09",
        "Table Name": "Member"
      },
      {
        "Associated Measure": "[HPC, CBP, PCE,  CBP,  PBH,  SPC,  FUH,  TRC,  FMC,  PCR,  HFS,  AHU,  HPC, BCS-E, HFS, COL-E, SPC, CRE, SPD]",
        "Availability": "Yes",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Table Last Refresh": "2024-09-09",
        "Table Name": "ClaimInstitutionalDetail"
      },
      {
        "Associated Measure": "[CBP, EED, DAE, HDO, UOP, IET, EDU, SPC, GSD, BPD, KED, SPD, OSW, FUM, FUA, SAA, FMC, PSA, POD, AAP, AHU, HPC, COA]",
        "Availability": "Yes",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Table Last Refresh": "2024-09-09",
        "Table Name": "ClaimLineItemDetail"
      },
      {
        "Associated Measure": "[EED, FMC, AAP, AHU, SPC, SPD, HPC, CBP, PBH, CRE, GSD, BPD, KED, OMW, OSW, SAA, BCS-E, COL-E, DDE, DAE, PCE, AMM, FUH, FUM, EDU, DMS-E, DRR-E, DSF-E, PCR, HFS, HDO, FUA, IET, ASF-E, PSA]",
        "Availability": "Yes",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Table Last Refresh": "2024-09-09",
        "Table Name": "ClaimCodeDetail"
      },
      {
        "Associated Measure": "[BPD,  AMM,  FMC,  COA,  AAP,  FUA,  DSF-E,  FUH,  FUM,  SAA,  IET,  OMW,  CBP,  BPD,  COL-E,  EED,  KED,  ASF-E,  SNS-E,  AIS-E,  DMS-E,  DRR-E,  BCS-E,  SPC,  SPD,  PSA,  EDU,  DDE]",
        "Availability": "No",
        "Data Source": "HXG",
        "Error Flag": 1,
        "Table Last Refresh": "2024-09-09",
        "Table Name": "dbo.ClaimLineItemDetail"
      },
      {
        "Associated Measure": "[SPC, BCS-E, OMW, OSW]",
        "Availability": "Yes",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Table Last Refresh": "2024-09-09",
        "Table Name": "ClaimMemberDetail"
      },
      {
        "Associated Measure": "[EED, FMC, AAP, AHU, SPC, SPD, HPC, CBP, PBH, CRE, GSD, BPD, KED, OMW, OSW, SAA, BCS-E, COL-E, DDE, DAE, PCE, AMM, FUH, FUM, EDU, DMS-E, DRR-E, DSF-E, PCR, HFS, HDO, FUA, IET, ASF-E, PSA]",
        "Availability": "No",
        "Data Source": "HXG",
        "Error Flag": 1,
        "Table Last Refresh": "2024-09-09",
        "Table Name": "Claims"
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
        "Column Name": "DateOfBirth",
        "Current Data Type": "datetime",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "datetime",
        "Table Name": "Member"
      },
      {
        "Associated Measure": "[CBP, PBH, CRE, FUH, FUM, TRC, IET, PCR, HFS, AMM, OMW, FUA, FMC]",
        "Column Name": "AdmissionDate",
        "Current Data Type": "datetime",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "datetime",
        "Table Name": "ClaimInstitutionalDetail"
      },
      {
        "Associated Measure": "[CBP, EED, DAE, HDO, UOP, IET, EDU, SPC, GSD, BPD, KED, SPD, OSW, FUM, FUA, SAA, FMC, PSA, POD, AAP, AHU, HPC, COA]",
        "Column Name": "DOSTo",
        "Current Data Type": "datetime",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "datetime",
        "Table Name": "ClaimLineItemDetail"
      },
      {
        "Associated Measure": "[CBP, EED, DAE, HDO, UOP, IET, EDU, SPC, GSD, BPD, KED, SPD, OSW, FUM, FUA, SAA, FMC, PSA, POD, AAP, AHU, HPC, COA]",
        "Column Name": "DOSFrom",
        "Current Data Type": "datetime",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "datetime",
        "Table Name": "ClaimLineItemDetail"
      },
      {
        "Associated Measure": "[PCE, CBP, PBH, SPC, CRE, GSD, BPD, EED, KED, SPD, OMW, OSW, AMM, FUH, FUM, FUA, SAA, TRC, FMC, PSA, DDE, DAE, HDO, UOP, POD, AAP, IET, BCS-E, DSF-E, AIS-E, SNS-E, COL-E, DMS-E, DRR-E, ASF-E, COA]",
        "Column Name": "DeathDate",
        "Current Data Type": "datetime",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "datetime",
        "Table Name": "Member"
      },
      {
        "Associated Measure": "[EED, FMC, AAP, AHU, SPC, SPD, HPC, CBP, PBH, CRE, GSD, BPD, KED, OMW, OSW, SAA, BCS-E, COL-E, DDE, DAE, PCE, AMM, FUH, FUM, EDU, DMS-E, DRR-E, DSF-E, PCR, HFS, HDO, FUA, IET, ASF-E, PSA]",
        "Column Name": "CodeNumber",
        "Current Data Type": "varchar",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "varchar",
        "Table Name": "ClaimCodeDetail"
      },
      {
        "Associated Measure": "[SPC, CRE, SPD, CBP, SPD, SPC, DDE, HPC, KED, AMM, FUH, FUM, SAA, FMC, EDU, CRE, HPC, PCR, HFS, AHU, IET,BCS-E, COL-E]",
        "Column Name": "PrincipalProc",
        "Current Data Type": "varchar",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "varchar",
        "Table Name": "ClaimInstitutionalDetail"
      },
      {
        "Associated Measure": "[BPD, AMM, FMC, COA, AAP, DSF-E, FUH, FUM, FUA, SAA, IET, OMW, CBP, COL-E, EED, KED, SNS-E, AIS-E, DMS-E, DRR-E, BCS-E, SPC, SPD, PSA, EDU, DDE]",
        "Column Name": "HCPCSorHIPPSCode",
        "Current Data Type": "Column Not Found",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Error Flag": 1,
        "Expected Data Type": "varchar",
        "Table Name": "dbo.ClaimLineItemDetail"
      },
      {
        "Associated Measure": "UOP",
        "Column Name": "RenderingProviderNPI",
        "Current Data Type": "varchar",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "varchar",
        "Table Name": "ClaimLineItemDetail"
      },
      {
        "Associated Measure": "[CBP, EED, DAE, HDO, UOP, IET, EDU, SPC, GSD, BPD, KED, SPD, OSW, FUM, FUA, SAA, FMC, PSA, POD, AAP, AHU, HPC, COA]",
        "Column Name": "MemberID",
        "Current Data Type": "bigint",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Error Flag": 1,
        "Expected Data Type": "varchar",
        "Table Name": "ClaimMemberDetail"
      },
      {
        "Associated Measure": "[CBP, EED, DAE, HDO, UOP, IET, EDU, SPC, GSD, BPD, KED, SPD, OSW, FUM, FUA, SAA, FMC, PSA, POD, AAP, AHU, HPC, COA]",
        "Column Name": "StatusID",
        "Current Data Type": "Column Not Found",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Error Flag": 1,
        "Expected Data Type": "int",
        "Table Name": "Claims"
      },
      {
        "Associated Measure": "[CBP, BPD, SAA, COA, FUH, AMM, FUM, FUA, FMC, IET]",
        "Column Name": "PlaceOfService",
        "Current Data Type": "char",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Error Flag": 0,
        "Expected Data Type": "char",
        "Table Name": "ClaimLineItemDetail"
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
        "Check#": "TC003.01",
        "Column Name": "DateOfBirth",
        "Comparision": "",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "datetime",
        "Details": [],
        "Error Flag": 0,
        "Table Name": "Member",
        "Test Type": "Invalid Date check"
      },
      {
        "Check#": "TC003.02",
        "Column Name": "DateOfBirth",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "datetime",
        "Details": [
          {
            "Column Name": "DateOfBirth",
            "DVE Run Date": "2024-09-09",
            "Data Source": "HXG",
            "Error Flag": 0,
            "Null Rows": 0,
            "Table Name": "Member",
            "Total rows": 14831
          }
        ],
        "Error Flag": 1,
        "Table Name": "Member",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.04",
        "Column Name": "AdmissionDate",
        "Comparision": "",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "datetime",
        "Details": [],
        "Error Flag": 0,
        "Table Name": "ClaimInstitutionalDetail",
        "Test Type": "Invalid Date check"
      },
      {
        "Check#": "TC003.05",
        "Column Name": "DOSTo",
        "Comparision": "",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "datetime",
        "Details": [],
        "Error Flag": 0,
        "Table Name": "ClaimLineItemDetail",
        "Test Type": "Invalid Date check"
      },
      {
        "Check#": "TC003.06",
        "Column Name": "DOSFrom",
        "Comparision": "",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "datetime",
        "Details": [],
        "Error Flag": 0,
        "Table Name": "ClaimLineItemDetail",
        "Test Type": "Invalid Date check"
      },
      {
        "Check#": "TC003.07",
        "Column Name": "Transaction_Status",
        "Comparision": "universe check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "bignit",
        "Details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n                SELECT \n                distinct [Transaction_Status] as out_of_uni_rows\n                FROM dbo.LHPPharmacyClaimsData\n                where  Transaction_Status NOT IN ('[ blank','01','04]') \n            ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "Error Flag": 1,
        "Table Name": "LHPPharmacyClaimsData",
        "Test Type": "Universe Check"
      },
      {
        "Check#": "TC003.08",
        "Column Name": "AdmissionDate",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "datetime",
        "Details": [
          {
            "Column Name": "AdmissionDate",
            "DVE Run Date": "2024-09-09",
            "Data Source": "HXG",
            "Error Flag": 1,
            "Null Rows": 40744,
            "Table Name": "ClaimInstitutionalDetail",
            "Total rows": 102722
          }
        ],
        "Error Flag": 1,
        "Table Name": "ClaimInstitutionalDetail",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.10",
        "Column Name": "DOSTo",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "datetime",
        "Details": [
          {
            "Column Name": "DOSTo",
            "DVE Run Date": "2024-09-09",
            "Data Source": "HXG",
            "Error Flag": 1,
            "Null Rows": 201,
            "Table Name": "ClaimLineItemDetail",
            "Total rows": 6582633
          }
        ],
        "Error Flag": 1,
        "Table Name": "ClaimLineItemDetail",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.12",
        "Column Name": "DOSFrom",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "datetime",
        "Details": [
          {
            "Column Name": "DOSFrom",
            "DVE Run Date": "2024-09-09",
            "Data Source": "HXG",
            "Error Flag": 0,
            "Null Rows": 0,
            "Table Name": "ClaimLineItemDetail",
            "Total rows": 6582633
          }
        ],
        "Error Flag": 1,
        "Table Name": "ClaimLineItemDetail",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.15",
        "Column Name": "DeathDate",
        "Comparision": "",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "datetime",
        "Details": [],
        "Error Flag": 0,
        "Table Name": "Member",
        "Test Type": "Invalid Date check"
      },
      {
        "Check#": "TC003.17",
        "Column Name": "Date_Of_Service1",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "varchar",
        "Details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN Date_Of_Service1 IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.LHPPharmacyClaimsData\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "Error Flag": 1,
        "Table Name": "LHPPharmacyClaimsData",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.18",
        "Column Name": "Date_Of_Service1",
        "Comparision": "",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "varchar",
        "Details": [],
        "Error Flag": 0,
        "Table Name": "LHPPharmacyClaimsData",
        "Test Type": "Invalid Date check"
      },
      {
        "Check#": "TC003.20",
        "Column Name": "Days_Supply",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "varchar",
        "Details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN Days_Supply IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.LHPPharmacyClaimsData\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "Error Flag": 1,
        "Table Name": "LHPPharmacyClaimsData",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.21",
        "Column Name": "CodeNumber",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "varchar",
        "Details": [
          {
            "Column Name": "CodeNumber",
            "DVE Run Date": "2024-09-09",
            "Data Source": "HXG",
            "Error Flag": 0,
            "Null Rows": 0,
            "Table Name": "ClaimCodeDetail",
            "Total rows": 11141136
          }
        ],
        "Error Flag": 1,
        "Table Name": "ClaimCodeDetail",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.22",
        "Column Name": "PrincipalProc",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "varchar",
        "Details": [
          {
            "Column Name": "PrincipalProc",
            "DVE Run Date": "2024-09-09",
            "Data Source": "HXG",
            "Error Flag": 1,
            "Null Rows": 96260,
            "Table Name": "ClaimInstitutionalDetail",
            "Total rows": 102722
          }
        ],
        "Error Flag": 1,
        "Table Name": "ClaimInstitutionalDetail",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.23",
        "Column Name": "HCPCSorHIPPSCode",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "varchar",
        "Details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.dbo.ClaimLineItemDetail'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN HCPCSorHIPPSCode IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.dbo.ClaimLineItemDetail\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "Error Flag": 1,
        "Table Name": "dbo.ClaimLineItemDetail",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.24",
        "Column Name": "RenderingProviderNPI",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "varchar",
        "Details": [
          {
            "Column Name": "RenderingProviderNPI",
            "DVE Run Date": "2024-09-09",
            "Data Source": "HXG",
            "Error Flag": 1,
            "Null Rows": 1686790,
            "Table Name": "ClaimLineItemDetail",
            "Total rows": 6582633
          }
        ],
        "Error Flag": 1,
        "Table Name": "ClaimLineItemDetail",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.25",
        "Column Name": "Pharmacy_NPI",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "varchar",
        "Details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN Pharmacy_NPI IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.LHPPharmacyClaimsData\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "Error Flag": 1,
        "Table Name": "LHPPharmacyClaimsData",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.26",
        "Column Name": "Date_Prescription_Written",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "datetime",
        "Details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.LHPPharmacyClaimsData'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN Date_Prescription_Written IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.LHPPharmacyClaimsData\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "Error Flag": 1,
        "Table Name": "LHPPharmacyClaimsData",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.27",
        "Column Name": "Date_Prescription_Written",
        "Comparision": "",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "datetime",
        "Details": [],
        "Error Flag": 0,
        "Table Name": "LHPPharmacyClaimsData",
        "Test Type": "Invalid Date check"
      },
      {
        "Check#": "TC003.29",
        "Column Name": "MemberID",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "varchar",
        "Details": [
          {
            "Column Name": "MemberID",
            "DVE Run Date": "2024-09-09",
            "Data Source": "HXG",
            "Error Flag": 0,
            "Null Rows": 0,
            "Table Name": "ClaimMemberDetail",
            "Total rows": 1914793
          }
        ],
        "Error Flag": 1,
        "Table Name": "ClaimMemberDetail",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.30",
        "Column Name": "StatusID",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "int",
        "Details": {
          "error": "Database error: (pyodbc.ProgrammingError) ('42S02', \"[42S02] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Invalid object name 'dbo.Claims'. (208) (SQLExecDirectW)\")\n[SQL: \n        SELECT COUNT(*) as total_rows, \n               SUM(CASE WHEN StatusID IS NULL THEN 1 ELSE 0 END) as null_rows \n        FROM dbo.Claims\n        ]\n(Background on this error at: https://sqlalche.me/e/20/f405)"
        },
        "Error Flag": 1,
        "Table Name": "Claims",
        "Test Type": "Null Check"
      },
      {
        "Check#": "TC003.31",
        "Column Name": "PlaceOfService",
        "Comparision": "universe check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "char",
        "Details": [
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "Table Name": "ClaimLineItemDetail",
            "Values": "  "
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "Table Name": "ClaimLineItemDetail",
            "Values": "01"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "Table Name": "ClaimLineItemDetail",
            "Values": "02"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "Table Name": "ClaimLineItemDetail",
            "Values": "03"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "Table Name": "ClaimLineItemDetail",
            "Values": "04"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "Table Name": "ClaimLineItemDetail",
            "Values": "1 "
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "Table Name": "ClaimLineItemDetail",
            "Values": "52"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 1,
            "Part of defined set?": "No",
            "Table Name": "ClaimLineItemDetail",
            "Values": "N "
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "1"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "2"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "3"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "4"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "10"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "11"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "12"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "13"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "14"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "15"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "19"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "20"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "21"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "22"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "23"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "24"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "26"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "27"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "29"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "31"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "32"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "33"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "34"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "41"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "42"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "49"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "50"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "51"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "53"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "55"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "57"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "58"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "60"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "61"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "62"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "65"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "71"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "72"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "81"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "99"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "A"
          },
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Error Flag": 0,
            "Part of defined set?": "Yes",
            "Table Name": "ClaimLineItemDetail",
            "Values": "N"
          }
        ],
        "Error Flag": 1,
        "Table Name": "ClaimLineItemDetail",
        "Test Type": "Universe Check"
      },
      {
        "Check#": "TC003.32",
        "Column Name": "PlaceOfService",
        "Comparision": "null check",
        "DVE Run Date": "2024-09-09",
        "Data Source": "HXG",
        "Data Types": "char",
        "Details": [
          {
            "Column Name": "PlaceOfService",
            "DVE Run Date": "2024-09-09",
            "Data Source": "HXG",
            "Error Flag": 1,
            "Null Rows": 31,
            "Table Name": "ClaimLineItemDetail",
            "Total rows": 6582633
          }
        ],
        "Error Flag": 1,
        "Table Name": "ClaimLineItemDetail",
        "Test Type": "Null Check"
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
