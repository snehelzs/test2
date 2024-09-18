import React, { useState, useEffect } from 'react';
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
import { setCurrentTab, setHealthCheckerResult } from '../../feature/tabSlice';
import useAuthToken from '../Hooks/useAuthToken';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';

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
  { value: '4', label: 'Other Flat Files' },
];

const testCasesOptions = [
  { value: '1', label: 'Data Availability Check' },
  { value: '2', label: 'Table Schema Check' },
  { value: '3', label: 'Column Value Consistency Check' },
];

const Content = () => {
  const [selectedDataSources, setSelectedDataSources] = useState([]);
  const [selectedTestCases, setSelectedTestCases] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');
  const [error, setError] = useState(null);

  const theme = useTheme();
  const dispatch = useDispatch();
  const token = useAuthToken();

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

  const isButtonDisabled = selectedDataSources.length === 0 || selectedTestCases.length === 0 || !startDate || !endDate;

  const handleButtonClick = async () => {
    if (isButtonDisabled) {
      setNotificationOpen(true);
    } else {
      setIsLoading(true);
      setLoadingText('Submitting your request...');

      try {
        const selectedSources = dataSourcesOptions.filter(option => selectedDataSources.includes(option.value)).map(option => option.label);
        const selectedTestcase = testCasesOptions.filter(option => selectedTestCases.includes(option.value)).map(option => option.label);

        const response = await fetch(`http://localhost:5000/health-checker`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            sources: selectedSources,
            functions: selectedTestcase,
            startDate: startDate ? startDate.toISOString() : null,
            endDate: endDate ? endDate.toISOString() : null,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const result = await response.json();
        console.log('API Response:', result);
        dispatch(setHealthCheckerResult(result));
        setLoadingText('Processing complete.');
        setTimeout(() => {
          setIsLoading(false);
          dispatch(setCurrentTab(1));
        }, 1000);
      } catch (error) {
        setError(error);
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

  useEffect(() => {
    if (token) {
      console.log('Token available:', token);
    }
  }, [token]);

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

        {/* Date Selection moved to here */}
        <Grid item xs={12}>
          <Box sx={{ border: '1px solid #ddd', padding: 3, borderRadius: 2, backgroundColor: '#fafafa', mb: 3 }}>
            <Typography variant="h4" sx={{ color: '#0af', fontWeight: 'bold', fontSize: '2rem' }}>
              Step 1: Date Range Selection
            </Typography>
            <Typography sx={{ fontStyle: 'italic', mb: 2, fontSize: '1.5rem' }}>
              Select the date range for your data check.
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      variant="outlined" 
                      fullWidth 
                      InputLabelProps={{
                        sx: { fontSize: '1.5rem' }, // Increase label font size
                      }} 
                      InputProps={{
                        sx: { fontSize: '1.5rem' }, // Increase input font size
                      }}
                    />
                  )}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      variant="outlined" 
                      fullWidth 
                      InputLabelProps={{
                        sx: { fontSize: '1.5rem' }, // Increase label font size
                      }} 
                      InputProps={{
                        sx: { fontSize: '1.5rem' }, // Increase input font size
                      }}
                    />
                  )}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px solid #ddd', padding: 3, borderRadius: 2, backgroundColor: '#fafafa' }}>
                <Typography variant="h4" sx={{ color: '#0af', fontWeight: 'bold', fontSize: '2rem' }}>
                  Step 2: Data Sources Selection
                </Typography>
                <Typography sx={{ fontStyle: 'italic', mb: 2, fontSize: '1.5rem' }}>
                  Select all the data sources for which you want to check data health.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontSize: '1.5rem' }}>
                  <b>Data Sources</b>
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="dataSources-select-label" sx={{ display: 'none' }}>
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
                      },
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
                    }}
                  >
                    Clear All
                  </Button>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px solid #ddd', padding: 3, borderRadius: 2, backgroundColor: '#fafafa' }}>
                <Typography variant="h4" sx={{ color: '#0af', fontWeight: 'bold', fontSize: '2rem' }}>
                  Step 3: Test Cases Selection
                </Typography>
                <Typography sx={{ fontStyle: 'italic', mb: 2, fontSize: '1.5rem' }}>
                  Select the test cases you want to perform for the selected data sources.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontSize: '1.5rem' }}>
                  <b>Test Cases</b>
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="testCases-select-label" sx={{ display: 'none' }}>
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
                      },
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
                    }}
                  >
                    Clear All
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
      <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleNotificationClose}>
        <Alert onClose={handleNotificationClose} severity="warning" sx={{ width: '100%' }}>
          Please select at least one data source, one test case, and specify a date range!
        </Alert>
      </Snackbar>

      <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
        <Typography sx={{ mt: 2 }}>{loadingText}</Typography>
      </Backdrop>
    </ContentBox>
  );
};

export default Content;
