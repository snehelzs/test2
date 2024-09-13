import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { setCurrentTab, setValueCheckerResult } from '../../feature/tabSlice';
import { postValueCheckerData } from '../api/getValueCheck'

const ContentBox = styled(Box)(({ theme }) => ({
  fontFamily: 'Arial Black, Arial, sans-serif',
  padding: theme.spacing(4),
}));

const HeadingBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.shape.borderRadius,
  textAlign: 'left',
}));

const dataSourcesOptions = [
    { value: '1', label: 'Adults\' Access to Preventive/Ambulatory Health Services' },
    { value: '2', label: 'Acute Hospital Utilization' },
    { value: '3', label: 'Adult Immunization Status' },
    { value: '4', label: 'Antidepressant Medication Management' },
    { value: '5', label: 'Unhealthy Alcohol Use Screening and Follow-Up' },
    { value: '6', label: 'Breast Cancer Screening' },
    { value: '7', label: 'Blood Pressure Control for Patients With Diabetes' },
    { value: '8', label: 'CBP' },
    { value: '9', label: 'Care for Older Adults' },
    { value: '10', label: 'Colorectal Cancer Screening' },
    { value: '11', label: 'Cardiac Rehabilitation' },
    { value: '12', label: 'Use of High-Risk Medications in Older Adults' },
    { value: '13', label: 'Potentially Harmful Drug-Disease Interactions in Older Adults' },
    { value: '14', label: 'Utilization of the PHQ-9 to Monitor Depression Symptoms for Adolescents and Adults' },
    { value: '15', label: 'Depression Remission or Response for Adolescents and Adults' },
    { value: '16', label: 'Depression Screening and Follow-Up for Adolescents and Adults' },
    { value: '17', label: 'Emergency Department Utilization' },
    { value: '18', label: 'Eye Exam for Patients With Diabetes' },
    { value: '19', label: 'Follow-Up After Emergency Department Visit for People with Multiple High-Risk Chronic Conditions' },
    { value: '20', label: 'Follow-Up After Emergency Department Visit for Substance Use' },
    { value: '21', label: 'Follow-Up After Hospitalization for Mental Illness' },
    { value: '22', label: 'Follow-Up After Emergency Department Visit for Mental Illness' },
    { value: '23', label: 'Use of Opioids at High Dosage' },
    { value: '24', label: 'Hospitalizations Following Skilled Nursing Discharge' },
    { value: '25', label: 'Hospitalization for Potentially Preventable Complications' },
    { value: '26', label: 'Initiation and Engagement of Substance Use Disorder Treatment' },
    { value: '27', label: 'Kidney Health Evaluation for Patients With Diabetes' },
    { value: '28', label: 'Osteoporosis Management in Women Who Had a Fracture' },
    { value: '29', label: 'Osteoporosis Screening in Older Women' },
    { value: '30', label: 'Persistence of Beta-Blocker Treatment After a Heart Attack' },
    { value: '31', label: 'Pharmacotherapy Management of COPD Exacerbation' },
    { value: '32', label: 'Plan All-Cause Readmissions' },
    { value: '33', label: 'Pharmacotherapy for Opioid Use Disorder' },
    { value: '34', label: 'Non-Recommended PSA-Based Screening in Older Men' },
    { value: '35', label: 'Adherence to Antipsychotic Medications for Individuals With Schizophrenia' },
    { value: '36', label: 'Social Need Screening and Intervention' },
    { value: '37', label: 'Statin Therapy for Patients with Cardiovascular Disease' },
    { value: '38', label: 'Statin Therapy for Patients with Diabetes' },
    { value: '39', label: 'Transitions of Care' },
    { value: '40', label: 'Use of Opioids From Multiple Providers' }
];

const testCasesOptions = [
  { value: '1', label: 'Date Of Birth' },
  { value: '2', label: 'Encounter Date' },
  { value: '3', label: 'Deceased Date' },
  { value: '4', label: 'Date Of Service' },
  { value: '5', label: 'Enrollment End Date & Start Date' },
  { value: '6', label: 'Presription or Dispense Date' },
  { value: '7', label: 'Claims Denied' },
  { value: '8', label: 'RxClaims Denied' },
  { value: '9', label: 'Place Of Service(LWCC)' },
  { value: '10', label: 'Place Of Service (HXG)' },
  { value: '11', label: 'Hospice' },
  { value: '12', label: 'Lab Results' },
  { value: '13', label: 'Comprehensive Code Set' }
];

const Content = () => {
  const [selectedDataSources, setSelectedDataSources] = useState([]);
  const [selectedTestCases, setSelectedTestCases] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');

  const theme = useTheme();
  const dispatch = useDispatch();

  const handleDataSourcesChange = (event) => {
    setSelectedDataSources(event.target.value);
  };

  const handleTestCasesChange = (event) => {
    setSelectedTestCases(event.target.value);
  };

  const handleSelectAllDataSources = () => {
    setSelectedDataSources(dataSourcesOptions.map(option => option.value));
  };

  const handleSelectAllTestCases = () => {
    setSelectedTestCases(testCasesOptions.map(option => option.value));
  };

  const handleClearDataSources = () => {
    setSelectedDataSources([]);
  };

  const handleClearTestCases = () => {
    setSelectedTestCases([]);
  };

  const getSelectedLabels = (options, selectedValues) => {
    return options
      .filter(option => selectedValues.includes(option.value))
      .map(option => option.label)
      .join(', ');
  };

  const isButtonDisabled = selectedDataSources.length === 0 || selectedTestCases.length === 0;

  const handleButtonClick = async () => {
    if (isButtonDisabled) {
      setNotificationOpen(true);
    } else {
      setIsLoading(true);
      setLoadingText('Submitting your request...');

      try {
        const selectedSources= dataSourcesOptions.filter(option => selectedDataSources.includes(option.value)).map(option => option.label);
        const selectedTestcase= testCasesOptions.filter(option => selectedTestCases.includes(option.value)).map(option => option.label);
        const result = await postValueCheckerData(selectedSources, selectedTestcase);
        console.log('API Response:', result);
        dispatch(setValueCheckerResult(result))
        setLoadingText('Processing complete.');
        setTimeout(() => {
          setIsLoading(false);
          dispatch(setCurrentTab(3));
        }, 1000);
      } catch (error) {
        setLoadingText('An error occurred. Please try again.');
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
  };


  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  return (
    <ContentBox>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeadingBox>
            <Typography variant="h3" sx={{ color: 'green', mb: 1, fontWeight: 'bold', fontSize: '3rem' }}>
              Value Checker Inputs
            </Typography>
            <Typography variant="h5" sx={{ color: 'blue', mb: 1, fontSize: '1.5rem' }}>
              This screen will help you select the relevant measures and test cases you want to run the DVE on. User gets select one or more options to run the DVE.
            </Typography>
            <Typography variant="h5" sx={{ color: 'blue', fontSize: '1.5rem' }}>
              Please select the following inputs from the drop-down options to configure the DVE.
            </Typography>
          </HeadingBox>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px solid #ddd', padding: 3, borderRadius: 2, backgroundColor: '#fafafa' }}>
                <Typography variant="h4" sx={{ color: '#0af', fontWeight: 'bold', fontSize: '2rem' }}>
                  Step 1: Measures Selection
                </Typography>
                <Typography sx={{ fontStyle: 'italic', mb: 2, fontSize: '1.5rem' }}>
                  Select all the measures for which you want to run the DVE for.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontSize: '1.5rem' }}>
                  <b>Measures</b>
                </Typography>
                <FormControl fullWidth>
                  <InputLabel
                    id="dataSources-select-label"
                    sx={{ display: 'none' }}
                  >
                    Multiple Measures Selected
                  </InputLabel>
                  <Select
                    labelId="dataSources-select-label"
                    id="dataSources-select"
                    multiple
                    value={selectedDataSources}
                    onChange={handleDataSourcesChange}
                    renderValue={(selected) => getSelectedLabels(dataSourcesOptions, selected)}
                    sx={{
                      backgroundColor: 'yellowgreen',
                      color: 'black',
                      width: '100%',
                      border: '1px solid',
                      '& .MuiSelect-select': {
                        padding: '16px',
                        fontSize: '1.5rem',
                      },
                    }}
                  >
                    <MenuItem value="" sx={{ fontSize: '1.5rem' }}>
                      <em>Select Measures</em>
                    </MenuItem>
                    {dataSourcesOptions.map(option => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        sx={{
                          fontSize: '1.5rem',
                          color: 'black',
                          '& .MuiCheckbox-root': {
                            width: '28px',
                            height: '28px',
                          },
                          '& .MuiListItemText-primary': {
                            fontSize: '1.5rem',
                          }
                        }}
                      >
                        <Checkbox
                          checked={selectedDataSources.indexOf(option.value) > -1}
                          sx={{
                            width: '28px',
                            height: '28px',
                          }}
                        />
                        <ListItemText primary={option.label} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleSelectAllDataSources}
                    sx={{
                      height: '50px',
                      fontSize: '1.5rem',
                      padding: '0 20px',
                      backgroundColor: '#add8e6',
                      color: 'black',
                      borderColor: '#add8e6',
                      '&:hover': {
                        backgroundColor: '#87ceeb',
                        borderColor: '#87ceeb',
                      },
                      fontFamily: 'Arial Black, Arial, sans-serif',
                    }}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClearDataSources}
                    sx={{
                      height: '50px',
                      fontSize: '1.5rem',
                      padding: '0 20px',
                      backgroundColor: '#add8e6',
                      color: 'black',
                      borderColor: '#add8e6',
                      '&:hover': {
                        backgroundColor: '#87ceeb',
                        borderColor: '#87ceeb',
                      },
                      fontFamily: 'Arial Black, Arial, sans-serif',
                    }}
                  >
                    Clear
                  </Button>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px solid #ddd', padding: 3, borderRadius: 2, backgroundColor: '#fafafa' }}>
                <Typography variant="h4" sx={{ color: '#0af', fontWeight: 'bold', fontSize: '2rem' }}>
                  Step 2: Test Cases Selection
                </Typography>
                <Typography sx={{ fontStyle: 'italic', mb: 2, fontSize: '1.5rem' }}>
                  Select all the applicable test cases you want to run for the data check.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontSize: '1.5rem' }}>
                  <b>Test Cases</b>
                </Typography>
                <FormControl fullWidth>
                  <InputLabel
                    id="testCases-select-label"
                    sx={{ display: 'none' }}
                  >
                    Multiple Test Cases Selected
                  </InputLabel>
                  <Select
                    labelId="testCases-select-label"
                    id="testCases-select"
                    multiple
                    value={selectedTestCases}
                    onChange={handleTestCasesChange}
                    renderValue={(selected) => getSelectedLabels(testCasesOptions, selected)}
                    sx={{
                      backgroundColor: 'yellowgreen',
                      color: 'black',
                      width: '100%',
                      border: '1px solid',
                      '& .MuiSelect-select': {
                        padding: '16px',
                        fontSize: '1.5rem',
                      },
                    }}
                  >
                    <MenuItem value="" sx={{ fontSize: '1.5rem' }}>
                      <em>Select Test Cases</em>
                    </MenuItem>
                    {testCasesOptions.map(option => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        sx={{
                          fontSize: '1.5rem',
                          color: 'black',
                          '& .MuiCheckbox-root': {
                            width: '28px',
                            height: '28px',
                          },
                          '& .MuiListItemText-primary': {
                            fontSize: '1.5rem',
                          }
                        }}
                      >
                        <Checkbox
                          checked={selectedTestCases.indexOf(option.value) > -1}
                          sx={{
                            width: '28px',
                            height: '28px',
                          }}
                        />
                        <ListItemText primary={option.label} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleSelectAllTestCases}
                    sx={{
                      height: '50px',
                      fontSize: '1.5rem',
                      padding: '0 20px',
                      backgroundColor: '#add8e6',
                      color: 'black',
                      borderColor: '#add8e6',
                      '&:hover': {
                        backgroundColor: '#87ceeb',
                        borderColor: '#87ceeb',
                      },
                      fontFamily: 'Arial Black, Arial, sans-serif',
                    }}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClearTestCases}
                    sx={{
                      height: '50px',
                      fontSize: '1.5rem',
                      padding: '0 20px',
                      backgroundColor: '#add8e6',
                      color: 'black',
                      borderColor: '#add8e6',
                      '&:hover': {
                        backgroundColor: '#87ceeb',
                        borderColor: '#87ceeb',
                      },
                      fontFamily: 'Arial Black, Arial, sans-serif',
                    }}
                  >
                    Clear
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: 'flex',
          alignItems: 'center',
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            bottom: 8,
            right: 8,
          },
        }}
      >
        <Typography variant="h6" sx={{ marginRight: '10px', fontSize: '1.5rem', fontFamily: 'Arial Black, Arial, sans-serif' }}>
          Hit this button to run DVE:
        </Typography>
        <Box
          sx={{
            width: '100px',
            height: '3px',
            backgroundColor: 'black',
            position: 'relative',
            marginLeft: '10px',
            [theme.breakpoints.down('sm')]: {
              width: '80px',
              marginLeft: '5px',
            },
          }}
        >
          <Box
            sx={{
              width: 0,
              height: 0,
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderLeft: '10px solid black',
              position: 'absolute',
              right: '-10px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        </Box>
        <Button
          variant="contained"
          onClick={handleButtonClick}
          sx={{
            fontSize: '1.5rem',
            padding: '0 20px',
            marginLeft: '20px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.2rem',
              marginLeft: '10px',
              padding: '0 16px',
            },
          }}
          disabled={isButtonDisabled}
        >
          Run DVE
        </Button>
      </Box>

      <Snackbar
        open={notificationOpen}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleNotificationClose} severity="warning" sx={{ width: '100%', fontFamily: 'Arial Black, Arial, sans-serif', fontSize: '1.5rem' }}>
          Please select both Data Sources and Test Cases before proceeding.
        </Alert>
      </Snackbar>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
        <Typography variant="h6" sx={{ marginLeft: '10px', fontFamily: 'Arial Black, Arial, sans-serif', fontSize: '1.5rem' }}>{loadingText}</Typography>
      </Backdrop>
    </ContentBox>
  );
};

export default Content;
