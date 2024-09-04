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
import { setCurrentTab } from '../../feature/tabSlice';
import { postHealthCheckerData } from '../api/getHealthCheck'

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
  { value: '1', label: 'LWCC' },
  { value: '2', label: 'HXG' },
  { value: '3', label: 'ESI' },
  { value: '4', label: 'Other Flat Files' }
];

const testCasesOptions = [
  { value: '1', label: 'Data Availability Check' },
  { value: '2', label: 'Table Schema Check' },
  { value: '3', label: 'Column Value Consistency Check' }
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
        const result = await postHealthCheckerData(selectedDataSources, selectedTestCases);
        console.log('API Response:', result);
        setLoadingText('Processing complete.');
        setTimeout(() => {
          setIsLoading(false);
          dispatch(setCurrentTab(1));
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
              Health Checker Inputs
            </Typography>
            <Typography variant="h5" sx={{ color: 'blue', mb: 1, fontSize: '1.5rem' }}>
              This screen will help you select the relevant data sources and test cases you want to run to check data health. You can select one or more options to run the DVE.
            </Typography>
            <Typography variant="h5" sx={{ color: 'blue', fontSize: '1.5rem' }}>
              Please select the following inputs from the drop-down options to check for data health.
            </Typography>
          </HeadingBox>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px solid #ddd', padding: 3, borderRadius: 2, backgroundColor: '#fafafa' }}>
                <Typography variant="h4" sx={{ color: '#0af', fontWeight: 'bold', fontSize: '2rem' }}>
                  Step 1: Data Sources Selection
                </Typography>
                <Typography sx={{ fontStyle: 'italic', mb: 2, fontSize: '1.5rem' }}>
                  Select all the data sources for which you want to check data health.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontSize: '1.5rem' }}>
                  <b>Data Sources</b>
                </Typography>
                <FormControl fullWidth>
                  <InputLabel
                    id="dataSources-select-label"
                    sx={{ display: 'none' }}
                  >
                    Multiple Data Sources Selected
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
                      <em>Select Data Sources</em>
                    </MenuItem>
                    {dataSourcesOptions.map(option => (
                      <MenuItem
                        key={option.value}
                        value={option.label}
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
                        value={option.label}
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
