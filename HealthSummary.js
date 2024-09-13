import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
  Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TableSortLabel, IconButton, Select, MenuItem, InputLabel,
  FormControl, Button
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import TestCaseModal from '../ModalView/TestCaseModal'; // Adjust the import path as necessary
import { useSelector, UseSelector } from 'react-redux';

const Section = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const KPIBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  fontSize: '28px', // Increased font size
  textAlign: 'center',
  fontFamily: 'Arial Black, Arial, sans-serif',
  color: theme.palette.text.primary,
  boxShadow: 'none',
  display: 'flex',
  justifyContent: 'space-around',
  minHeight: '150px', // Adjust if necessary
}));

const KPIItem = styled(Box)(({ theme, color }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: theme.spacing(1),
  fontSize: '28px', // Increased font size
  color: color || theme.palette.text.primary, // Use the color passed as a prop, or fallback to default
  fontFamily: 'Arial Black, Arial, sans-serif',
}));

const FiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1), // Reduce gap between items
  alignItems: 'center',
  justifyContent: 'flex-end', // Align items to the right
  marginTop: theme.spacing(2),
  flexWrap: 'wrap',
}));

const FilterBox = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 150,
  margin: theme.spacing(1),
  fontSize: '20px', // Increased font size
  fontFamily: 'Arial Black, Arial, sans-serif', // Set font to Arial Black
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: '20px', // Increased font size
  fontFamily: 'Arial Black, Arial, sans-serif', // Set font to Arial Black
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  fontSize: '20px', // Increased font size
  fontFamily: 'Arial Black, Arial, sans-serif', // Set font to Arial Black
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: '20px', // Increased font size
  fontFamily: 'Arial Black, Arial, sans-serif', // Set font to Arial Black
}));

const ResetBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0, 1), // Adjust margin to reduce space
  display: 'flex',
  alignItems: 'center', // Center the button vertically
}));

const DownloadBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0, 1), // Adjust margin to reduce space
  display: 'flex',
  alignItems: 'center', // Center the button vertically
}));

const HeadingBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.shape.borderRadius,
  textAlign: 'left',
  fontFamily: 'Arial Black, Arial, sans-serif',
  fontSize: '32px', // Increased font size
}));

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontSize: '24px', // Increased font size
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  fontFamily: 'Arial Black, Arial, sans-serif',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '18px', // Increased font size
  fontWeight: 'normal',
  fontFamily: 'Arial Black, Arial, sans-serif',
}));

const ResultCell = styled(TableCell)(({ theme, result }) => ({
  fontSize: '18px', // Increased font size
  fontWeight: 'normal',
  color: result === 'Pass' ? 'green' : result === 'Fail' ? 'red' : 'black',
  fontFamily: 'Arial Black, Arial, sans-serif',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: 'auto', // Automatically adjust width based on content
  minWidth: '120px', // Set a fixed minimum width for the button
  height: '48px', // Increase the height to match the height of the filters
  padding: theme.spacing(1, 2), // Adjust padding for vertical alignment
  textAlign: 'center', // Center the text horizontally
  fontSize: '16px', // Adjust font size if necessary
  fontWeight: 'bold', // Make the text bold for better visibility
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));


const convertToCSV = (data) => {
  const header = Object.keys(data[0]);
  const rows = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
  return [header.join(','), ...rows].join('\r\n');
};

const replacer = (key, value) => value === null ? '' : value; // Handle null values

export default function HealthSummary() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('testCaseId');
  const [sortedData, setSortedData] = React.useState([]);
  const [dataSourceFilter, setDataSourceFilter] = React.useState('');
  const [testCaseTypeFilter, setTestCaseTypeFilter] = React.useState('');
  const [resultFilter, setResultFilter] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedTestCase, setSelectedTestCase] = React.useState(null);
  
  const calculateMetrics = (data) => {
    const testPerformed = data.length;
    const testPassed = data.filter(row => row.result === 'Pass').length;
    const testFailed = data.filter(row => row.result === 'Fail').length;
  
    return {
      testPerformed,
      testPassed,
      testFailed
    };
  };
  const resultsummary = useSelector(state => state.tab.healthCheckerResult)
  const [kpiData, setKpiData] = React.useState(calculateMetrics(resultsummary));
  console.log("Summary", resultsummary)

  React.useEffect(()=>{
    setSortedData(resultsummary)
  },[resultsummary])
  
  React.useEffect(() => {
    // Recalculate metrics whenever sortedData changes
    setKpiData(calculateMetrics(sortedData
      .filter(row => (dataSourceFilter ? row.data_source.includes(dataSourceFilter) : true) &&
                     (testCaseTypeFilter ? row.test_type.includes(testCaseTypeFilter) : true) &&
                     (resultFilter ? row.result === resultFilter : true))));
  }, [sortedData, dataSourceFilter, testCaseTypeFilter, resultFilter]);



  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
    setSortedData(sortData(property, isAscending ? 'desc' : 'asc'));
  };
  

  const handleResetFilters = () => {
    setDataSourceFilter('');
    setTestCaseTypeFilter('');
    setResultFilter('');
  };
  
  const sortData = (property, order) => {
    return [...resultsummary].sort((a, b) => {
      if (property === 'ErrorThreshold' || property === 'numberOfError') {
        const aValue = parseInt(a[property], 10);
        const bValue = parseInt(b[property], 10);
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        if (order === 'asc') {
          return a[property] < b[property] ? -1 : 1;
        } else {
          return a[property] > b[property] ? -1 : 1;
        }
      }
    });
  };
  

  const handleViewDetails = (details, testType, testId) => {
    setSelectedTestCase({ details, testType, testId });
    setOpenModal(true);
  };
  

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDownload = () => {
    const csv = convertToCSV(sortedData
      .filter(row => (dataSourceFilter ? row.data_source.includes(dataSourceFilter) : true) &&
                     (testCaseTypeFilter ? row.test_type.includes(testCaseTypeFilter) : true) &&
                     (resultFilter ? row.result === resultFilter : true))
    );
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      // feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'health_summary.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDataSourceFilterChange = (event) => {
    setDataSourceFilter(event.target.value);
  };

  const handleTestCaseTypeFilterChange = (event) => {
    setTestCaseTypeFilter(event.target.value);
  };

  const handleResultFilterChange = (event) => {
    setResultFilter(event.target.value);
  };

  console.log("filter",sortedData
  .filter(row => (dataSourceFilter ? row.data_source.includes(dataSourceFilter) : true) &&
                 (testCaseTypeFilter ? row.test_type.includes(testCaseTypeFilter) : true) &&
                 (resultFilter ? row.result === resultFilter : true)))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HeadingBox>
            <Typography variant="h3" sx={{ color: 'green', mb: 0, fontWeight: 'bold' }}>
              Health Checker Summary
            </Typography>
            <Typography variant="h5" sx={{ color: 'blue', mt: 1 }}>
            This screen offers users a comprehensive overview of test cases statuses, including the total number performed, passed, failed, and those unable to run.
            </Typography>
          </HeadingBox>
        </Grid>

        <Grid item xs={12}>
          <Section>
            <KPIBox>
              <KPIItem color="purple">
                <Typography variant="h4">Tests Performed</Typography> {/* Increased variant to h4 */}
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{kpiData.testPerformed}</Typography> {/* Increased variant to h2 */}
              </KPIItem>
              <KPIItem color="green">
                <Typography variant="h4">Tests Passed</Typography> {/* Increased variant to h4 */}
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{kpiData.testPassed}</Typography> {/* Increased variant to h2 */}
              </KPIItem>
              <KPIItem color="red">
                <Typography variant="h4">Tests Failed</Typography> {/* Increased variant to h4 */}
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{kpiData.testFailed}</Typography> {/* Increased variant to h2 */}
              </KPIItem>
            </KPIBox>
          </Section>
        </Grid>


      <Grid item xs={12}>
        <Section>
        <FiltersContainer>
  <FilterBox>
    <FormControl fullWidth>
      <StyledInputLabel>Data Source</StyledInputLabel>
      <StyledSelect
        value={dataSourceFilter}
        onChange={handleDataSourceFilterChange}
        label="Data Source"
      >
        <StyledMenuItem value=""><em>All</em></StyledMenuItem>
        <StyledMenuItem value="HXG">HXG</StyledMenuItem>
        <StyledMenuItem value="LWCC">LWCC</StyledMenuItem>
        {/* Add other data sources */}
      </StyledSelect>
    </FormControl>
  </FilterBox>
  <FilterBox>
    <FormControl fullWidth>
      <StyledInputLabel>Test Type</StyledInputLabel>
      <StyledSelect
        value={testCaseTypeFilter}
        onChange={handleTestCaseTypeFilterChange}
        label="Test Case Type"
      >
        <StyledMenuItem value=""><em>All</em></StyledMenuItem>
        <StyledMenuItem value="Data Availability Check">Data Availability Check</StyledMenuItem>
        <StyledMenuItem value="Table Schema Check">Table Schema Check</StyledMenuItem>
        <StyledMenuItem value="Column Value Consistency Check">Column Value Consistency Check</StyledMenuItem>
        {/* Add other test case types */}
      </StyledSelect>
    </FormControl>
  </FilterBox>
  <FilterBox>
    <FormControl fullWidth>
      <StyledInputLabel>Result</StyledInputLabel>
      <StyledSelect
        value={resultFilter}
        onChange={handleResultFilterChange}
        label="Result"
      >
        <StyledMenuItem value=""><em>All</em></StyledMenuItem>
        <StyledMenuItem value="Pass">Pass</StyledMenuItem>
        <StyledMenuItem value="Fail">Fail</StyledMenuItem>
        {/* Add other results */}
      </StyledSelect>
    </FormControl>
  </FilterBox>
  <ResetBox>
    <StyledButton variant="outlined" onClick={handleResetFilters}>
      Reset Filters
    </StyledButton>
  </ResetBox>
  <DownloadBox>
    <StyledButton variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload}>
      Download
    </StyledButton>
  </DownloadBox>
</FiltersContainer>
        </Section>
      </Grid>

        <Grid item xs={12}>
          <Section>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>
                      <TableSortLabel
                        active={orderBy === 'test_id'}
                        direction={orderBy === 'test_id' ? order : 'asc'}
                        onClick={() => handleRequestSort('test_id')}
                      >
                        Test ID
                      </TableSortLabel>
                    </TableHeaderCell>
                    <TableHeaderCell>Submitted Date</TableHeaderCell>
                    <TableHeaderCell>
                      <TableSortLabel
                        active={orderBy === 'test_type'}
                        direction={orderBy === 'test_type' ? order : 'asc'}
                        onClick={() => handleRequestSort('test_type')}
                      >
                        Test Type
                      </TableSortLabel>
                    </TableHeaderCell>
                    <TableHeaderCell>Test Description</TableHeaderCell>
                    <TableHeaderCell>
                      <TableSortLabel
                          active={orderBy === 'data_source'}
                          direction={orderBy === 'data_source' ? order : 'asc'}
                          onClick={() => handleRequestSort('data_source')}
                        >
                        Data Sources
                      </TableSortLabel>
                    </TableHeaderCell>
                    <TableHeaderCell>
                      <TableSortLabel
                          active={orderBy === 'threshold'}
                          direction={orderBy === 'threshold' ? order : 'asc'}
                          onClick={() => handleRequestSort('threshold')}
                        >
                        Error Threshold
                      </TableSortLabel>
                    </TableHeaderCell>
                    <TableHeaderCell>
                      <TableSortLabel
                            active={orderBy === 'number_of_errors'}
                            direction={orderBy === 'number_of_errors' ? order : 'asc'}
                            onClick={() => handleRequestSort('number_of_errors')}
                          >
                        Number of Errors
                      </TableSortLabel>
                    </TableHeaderCell>
                    <TableHeaderCell>
                      <TableSortLabel
                              active={orderBy === 'result'}
                              direction={orderBy === 'result' ? order : 'asc'}
                              onClick={() => handleRequestSort('result')}
                            >
                        Result
                      </TableSortLabel>
                    </TableHeaderCell>
                    <TableHeaderCell>Details</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData
                    .filter(row => (dataSourceFilter ? row.data_source.includes(dataSourceFilter) : true) &&
                                   (testCaseTypeFilter ? row.test_type.includes(testCaseTypeFilter) : true) &&
                                   (resultFilter ? row.result === resultFilter : true))
                    .map((row) => (
                      <TableRow key={row.test_id}>
                        <StyledTableCell>{row.test_id}</StyledTableCell>
                        <StyledTableCell>{row.DVE_run_date}</StyledTableCell>
                        <StyledTableCell>{row.test_type}</StyledTableCell>
                        <StyledTableCell>{row.test_desc}</StyledTableCell>
                        <StyledTableCell>{row.data_source}</StyledTableCell>
                        <StyledTableCell>{row.threshold}</StyledTableCell>
                        <StyledTableCell>{row.number_of_errors}</StyledTableCell>
                        <ResultCell result={row.result}>{row.result}</ResultCell>
                        <StyledTableCell>
                          <IconButton onClick={() => handleViewDetails(row.details, row.test_type, row.test_id)} color="primary">
                            <VisibilityIcon />
                          </IconButton>
                        </StyledTableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Section>
        </Grid>
      </Grid>

      {selectedTestCase && (
        <TestCaseModal
          open={openModal}
          onClose={handleCloseModal}
          testCase={selectedTestCase}
        />
      )}
    </Box>
  );
}
