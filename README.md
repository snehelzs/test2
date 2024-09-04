{
  "sources": ["dbo","LWCC"],
  "functions": ["Data Availability Check","Table Schema Check","Column Value Consistency Check"]
}

[
  {
    "DVE_run_date": "2024-09-04", 
    "data_source": "dbo",
    "details": [
      {
        "DataSource": "dbo",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "claimCodeDetail",
        "TestCaseID": "HC_AC_001"
      },
      {
        "DataSource": "dbo",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "claimInstitutionalDetail",
        "TestCaseID": "HC_AC_002"
      },
      {
        "DataSource": "dbo",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "claim",
        "TestCaseID": "HC_AC_003"
      },
      {
        "DataSource": "dbo",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "claimMemberDetail",
        "TestCaseID": "HC_AC_004"
      },
      {
        "DataSource": "dbo",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "ClaimLineItemDetail",
        "TestCaseID": "HC_AC_005"
      },
      {
        "DataSource": "dbo",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "claimProviderDetail",
        "TestCaseID": "HC_AC_006"
      },
      {
        "DataSource": "dbo",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "claimPayment",
        "TestCaseID": "HC_AC_007"
      },
      {
        "DataSource": "dbo",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "StatusCode",
        "TestCaseID": "HC_AC_008"
      }
    ],
    "number_of_errors": 0,
    "result": "Pass",
    "test_desc": "Number of required tables not available",
    "test_id": "TC001",
    "test_type": "Data Availability Check",
    "threshold": 0
  },

  {
    "DVE_run_date": "2024-09-04",
    "data_source": "dbo",
    "details": [
      {
        "Column": "ClaimCodeDetailID",
        "Current Data Type": "bigint",
        "Data Source": "dbo",
        "Error Flag": 0,
        "Expected Data Type": "bigint",
        "Table": "claimCodeDetail",
        "TestCaseID": "HC_AC_001"
      },
      {
        "Column": "ClaimID",
        "Current Data Type": "bigint",
        "Data Source": "dbo",
        "Error Flag": 0,
        "Expected Data Type": "bigint",
        "Table": "claimCodeDetail",
        "TestCaseID": "HC_AC_002"
      },
      {
        "Column": "ClaimCodeTypeID",
        "Current Data Type": "bigint",
        "Data Source": "dbo",
        "Error Flag": 0,
        "Expected Data Type": "bigint",
        "Table": "claimCodeDetail",
        "TestCaseID": "HC_AC_003"
      },
      {
        "Column": "CodeNumber",
        "Current Data Type": "varchar",
        "Data Source": "dbo",
        "Error Flag": 0,
        "Expected Data Type": "varchar",
        "Table": "claimCodeDetail",
        "TestCaseID": "HC_AC_004"
      },
      {
        "Column": "RowState",
        "Current Data Type": "char",
        "Data Source": "dbo",
        "Error Flag": 0,
        "Expected Data Type": "char",
        "Table": "claimCodeDetail",
        "TestCaseID": "HC_AC_005"
      },
      {
        "Column": "ClaimID",
        "Current Data Type": "bigint",
        "Data Source": "dbo",
        "Error Flag": 0,
        "Expected Data Type": "bigint",
        "Table": "ClaimLineItemDetail",
        "TestCaseID": "HC_AC_006"
      },
      {
        "Column": "ClaimLineItemNumber",
        "Current Data Type": "bigint",
        "Data Source": "dbo",
        "Error Flag": 0,
        "Expected Data Type": "bigint",
        "Table": "ClaimLineItemDetail",
        "TestCaseID": "HC_AC_007"
      },
      {
        "Column": NaN,
        "Current Data Type": "Column not found",
        "Data Source": "dbo",
        "Error Flag": 1,
        "Expected Data Type": NaN,
        "Table": "ClaimLineItemDetail",
        "TestCaseID": "HC_AC_008"
      },
      {
        "Column": NaN,
        "Current Data Type": "Column not found",
        "Data Source": "dbo",
        "Error Flag": 1,
        "Expected Data Type": NaN,
        "Table": "ClaimLineItemDetail",
        "TestCaseID": "HC_AC_009"
      }
    ],
    "number_of_errors": 2,
    "result": "Fail",
    "test_desc": "Number of columns not in expected format",
    "test_id": "TC002",
    "test_type": "Table Schema Check",
    "threshold": 0
  },
  
  {
    "DVE_run_date": "2024-09-04",
    "data_source": "dbo",
    "details": [
      {
        "Error Flag": 0,
        "column": "ClaimID",
        "comparision": "% of null records",
        "details": {
          "ColumnName": "ClaimID",
          "DataSource": "dbo",
          "Error Flag": 0,
          "Null Rows": 0,
          "Percentage": "0.00%",
          "TableName": "ClaimCodeDetail",
          "Total rows": 9135274
        },
        "run_date": "2024-09-04",
        "source": "dbo",
        "table": "ClaimCodeDetail",
        "test_id": "TC003.01"
      },
      {
        "Error Flag": 1,
        "column": "PlaceOfService",
        "comparision": "% of null records",
        "details": {
          "ColumnName": "PlaceOfService",
          "DataSource": "dbo",
          "Error Flag": 1,
          "Null Rows": 14,
          "Percentage": "0.00%",
          "TableName": "ClaimLineItemDetail",
          "Total rows": 5362763
        },
        "run_date": "2024-09-04",
        "source": "dbo",
        "table": "ClaimLineItemDetail",
        "test_id": "TC003.02"
      }
    ],
    "number_of_errors": 1,
    "result": "Fail",
    "test_desc": "Number of columns with inconsistent or incorrect values",
    "test_id": "TC003",
    "test_type": "Column Value Consistency Check",
    "threshold": 0
  },

  {
    "DVE_run_date": "2024-09-04",
    "data_source": "LWCC",
    "details": [
      {
        "DataSource": "LWCC",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "billing",
        "TestCaseID": "HC_AC_009"
      },
      {
        "DataSource": "LWCC",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "billing",
        "TestCaseID": "HC_AC_010"
      },
      {
        "DataSource": "LWCC",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "facility",
        "TestCaseID": "HC_AC_011"
      },
      {
        "DataSource": "LWCC",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "lists",
        "TestCaseID": "HC_AC_012"
      },
      {
        "DataSource": "LWCC",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "procedure_report",
        "TestCaseID": "HC_AC_013"
      },
      {
        "DataSource": "LWCC",
        "Error Flag": 0,
        "Table Exists": true,
        "TableName": "procedure_result",
        "TestCaseID": "HC_AC_014"
      },
      {
        "DataSource": "LWCC",
        "Error Flag": 1,
        "Table Exists": false,
        "TableName": "fake_table",
        "TestCaseID": "HC_AC_015"
      }
    ],
    "number_of_errors": 1,
    "result": "Fail",
    "test_desc": "Number of required tables not available",
    "test_id": "TC002",
    "test_type": "Data Availability Check",
    "threshold": 0
  },

  {
    "DVE_run_date": "2024-09-04",
    "data_source": "LWCC",
    "details": [
      {
        "Column": NaN,
        "Current Data Type": "Column not found",
        "Data Source": "LWCC",
        "Error Flag": 1,
        "Expected Data Type": NaN,
        "Table": "ClaimLineItemDetail",
        "TestCaseID": "HC_AC_010"
      },
      {
        "Column": NaN,
        "Current Data Type": "Column not found",
        "Data Source": "LWCC",
        "Error Flag": 1,
        "Expected Data Type": NaN,
        "Table": "billing",
        "TestCaseID": "HC_AC_011"
      },
      {
        "Column": NaN,
        "Current Data Type": "Column not found",
        "Data Source": "LWCC",
        "Error Flag": 1,
        "Expected Data Type": NaN,
        "Table": "billing",
        "TestCaseID": "HC_AC_012"
      },
      {
        "Column": NaN,
        "Current Data Type": "Column not found",
        "Data Source": "LWCC",
        "Error Flag": 1,
        "Expected Data Type": NaN,
        "Table": "billing",
        "TestCaseID": "HC_AC_013"
      },
      {
        "Column": NaN,
        "Current Data Type": "Column not found",
        "Data Source": "LWCC",
        "Error Flag": 1,
        "Expected Data Type": NaN,
        "Table": "billing",
        "TestCaseID": "HC_AC_014"
      },
      {
        "Column": NaN,
        "Current Data Type": "Column not found",
        "Data Source": "LWCC",
        "Error Flag": 1,
        "Expected Data Type": NaN,
        "Table": "billing",
        "TestCaseID": "HC_AC_015"
      }
    ],
    "number_of_errors": 6,
    "result": "Fail",
    "test_desc": "Number of columns not in expected format",
    "test_id": "TC004",
    "test_type": "Table Schema Check",
    "threshold": 0
  },
  
  {
    "DVE_run_date": "2024-09-04",
    "data_source": "LWCC",
    "details": [],
    "number_of_errors": 0,
    "result": "Pass",
    "test_desc": "Number of columns with inconsistent or incorrect values",
    "test_id": "TC006",
    "test_type": "Column Value Consistency Check",
    "threshold": 0
  }
]
