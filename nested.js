[
  {
    "DVE_run_date": "2024-09-06",
    "data_source": "LWCC",
    "details": [
      {
        "Associated Measure": "[PCE, CBP, PBH, SPC, CRE, GSD, BPD, EED, KED, SPD, OMW, OSW, AMM, FUH, FUM, FUA, SAA, TRC, FMC, PSA, DDE, DAE, HDO, UOP, POD, AAP, IET, PCR, HFS, AHU, EDU, HPC, BCS-E, DSF-E, AIS-E, SNS-E, COL-E, DMS-E, DRR-E, ASF-E, COA]",
        "DataSource": "LWCC",
        "Error Flag": 0,
        "Table Exists": "Yes",
        "TableName": "lists",
        "date": "2024-09-06"
      },
      {
        "Associated Measure": "[BCS-E,  DDE,  CBP,  PBH,  SPC,  CRE,  GSD,  BPD,  EED,  KED,  OMW,  OSW,  SAA,  COL-E,  ASF-E,  FMC,  DAE,  HDO,  PCE,  SPD,  DSF-E,  HPC,  FUA,  DMS-E,  DRR-E,  AMM,  FUH,  FUM,  POD,  IET,  PSA]",
        "DataSource": "LWCC",
        "Error Flag": 0,
        "Table Exists": "Yes",
        "TableName": "facility",
        "date": "2024-09-06"
      },
      {
        "Associated Measure": "[PCE, CBP, PBH, SPC, CRE, GSD, BPD, EED, KED, SPD, OMW, OSW, AMM, FUH, FUM, FUA, SAA, TRC, FMC, PSA, DDE, DAE, HDO, UOP, POD, AAP, IET, PCR, HFS, AHU, EDU, HPC, ENP, BCS-E, DSF-E, AIS-E, SNS-E, COL-E, DMS-E, DRR-E, ASF-E, COA]",
        "DataSource": "LWCC",
        "Error Flag": 0,
        "Table Exists": "Yes",
        "TableName": "patient_data",
        "date": "2024-09-06"
      },
      {
        "Associated Measure": "[BCS-E, DDE, BPD, AMM, FMC, COA, CBP, PBH, SPC, CRE, GSD, EED, KED, OMW, OSW, SAA, COL-E, ASF-E, AAP, HPC, DSF-E, DAE, FUH, FUM, FUA, IET, HDO, PCE, SPD, DMS-E, DRR-E, AHU, PCR, HFS, TRC, EDU, POD, PSA]",
        "DataSource": "LWCC",
        "Error Flag": 0,
        "Table Exists": "Yes",
        "TableName": "billing",
        "date": "2024-09-06"
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
    "DVE_run_date": "2024-09-06",
    "data_source": "LWCC",
    "details": [
      {
        "Associated Measure": "[PCE, CBP, PBH, SPC, CRE, GSD, BPD, EED, KED, SPD, OMW, OSW, AMM, FUH, FUM, FUA, SAA, TRC, FMC, PSA, DDE, DAE, HDO, UOP, POD, AAP, IET, PCR, HFS, AHU, EDU, HPC, BCS-E, DSF-E, AIS-E, SNS-E, COL-E, DMS-E, DRR-E, ASF-E, COA]",
        "Column": "snomed",
        "Current Data Type": "text",
        "Data Source": "LWCC",
        "Error Flag": 0,
        "Expected Data Type": "text",
        "Table": "lists",
        "date": "2024-09-06"
      },
      {
        "Associated Measure": "[SAA]",
        "Column": "pos_code",
        "Current Data Type": "tinyint",
        "Data Source": "LWCC",
        "Error Flag": 0,
        "Expected Data Type": "tinyint",
        "Table": "facility",
        "date": "2024-09-06"
      },
      {
        "Associated Measure": "[SPC, BCS-E, OMW, OSW]",
        "Column": "sex",
        "Current Data Type": "varchar",
        "Data Source": "LWCC",
        "Error Flag": 0,
        "Expected Data Type": "varchar",
        "Table": "patient_data",
        "date": "2024-09-06"
      },
      {
        "Associated Measure": "[CBP, GSD, EED, KED, FUH, FUM, FUA, POD, BCS-E, AIS-E, COL-E]",
        "Column": "race",
        "Current Data Type": "varchar",
        "Data Source": "LWCC",
        "Error Flag": 0,
        "Expected Data Type": "varchar",
        "Table": "patient_data",
        "date": "2024-09-06"
      },
      {
        "Associated Measure": "[CBP, GSD, EED, KED, FUH, FUM, FUA, POD, BCS-E, AIS-E, COL-E]",
        "Column": "ethnicity",
        "Current Data Type": "varchar",
        "Data Source": "LWCC",
        "Error Flag": 0,
        "Expected Data Type": "varchar",
        "Table": "patient_data",
        "date": "2024-09-06"
      },
      {
        "Associated Measure": "[HPC, BCS-E, SNS-E, COL-E]",
        "Column": "enrollment_date",
        "Current Data Type": "date",
        "Data Source": "LWCC",
        "Error Flag": 0,
        "Expected Data Type": "date",
        "Table": "patient_data",
        "date": "2024-09-06"
      },
      {
        "Associated Measure": "[PCE, CBP, PBH, SPC, CRE, GSD, BPD, EED, KED, SPD, OMW, OSW, AMM, FUH, FUM, FUA, SAA, TRC, FMC, PSA, DDE, DAE, HDO, UOP, POD, AAP, IET, BCS-E, DSF-E, AIS-E, SNS-E, COL-E, DMS-E, DRR-E, ASF-E, COA]",
        "Column": "deceased_date",
        "Current Data Type": "datetime",
        "Data Source": "LWCC",
        "Error Flag": 0,
        "Expected Data Type": "datetime",
        "Table": "patient_data",
        "date": "2024-09-06"
      },
      {
        "Associated Measure": "[BCS-E, DDE, BPD, AMM, FMC, COA, CBP, PBH, SPC, CRE, GSD, EED, KED, OMW, OSW, SAA, COL-E, ASF-E, AAP, HPC, DSF-E, DAE, FUH, FUM, FUA, IET, HDO, PCE, SPD, DMS-E, DRR-E, AHU, PCR, HFS, TRC, EDU, POD, PSA]",
        "Column": "code",
        "Current Data Type": "varchar",
        "Data Source": "LWCC",
        "Error Flag": 0,
        "Expected Data Type": "varchar",
        "Table": "billing",
        "date": "2024-09-06"
      }
    ],
    "number_of_errors": 0,
    "result": "Pass",
    "test_desc": "Number of columns not in expected format",
    "test_id": "TC002",
    "test_type": "Table Schema Check",
    "threshold": 0
  }
]
