import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Add import for VisibilityIcon
import DetailedTestCaseModal from '../ModalView/DetailedTestCaseModal';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Arial Black, Arial, sans-serif',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
}));

const CustomTableCell = styled(TableCell)(({ theme, header, icon }) => ({
  fontFamily: 'Arial Black, Arial, sans-serif',
  fontSize: header ? '1.25rem' : '1rem',
  wordBreak: 'break-word',
  whiteSpace: 'nowrap',
  backgroundColor: header ? '#e0f7fa' : 'inherit',
  fontWeight: header ? 'bold' : 'normal',
  display: icon ? 'flex' : 'table-cell', // Adjust display based on icon prop
  alignItems: 'center', // Center icon vertically
  justifyContent: icon ? 'center' : 'initial', // Center icon horizontally
  cursor: icon ? 'pointer' : 'initial', // Change cursor if icon present
}));

const TestCaseModal = ({ open, onClose, testCase }) => {
  const { details = [] } = testCase; // Default to empty array if details is undefined

  // Determine headers based on test_type
  const getHeaders = () => {
    switch (testCase.testType) {
      case 'Data Availability Check':
        return ['DataSource', 'TableName', 'Error Flag', 'Table Exists', 'TestCaseID', 'Details'];
      case 'Table Schema Check':
        return ['Column', 'Current Data Type', 'Expected Data Type', 'Table', 'Error Flag', 'TestCaseID', 'Details'];
      case 'Column Value Consistency Check':
        return ['Column', 'comparision', 'Error Flag', 'details', 'run_date', 'source', 'table', 'test_id', 'Details'];
      default:
        return [];
    }
  };

  const [selectedTestCase, setSelectedTestCase] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  // Generate table rows based on details
  const getRows = () => {
    console.log("details", testCase, details)
    return details.map((row, index) => (
      <TableRow key={index}>
        {getHeaders().map((header, idx) => (
          <CustomTableCell key={idx} icon={header === 'Details'}>
            {header === 'Details' ? (
              <IconButton onClick={() => handleViewDetails(row.details, row.test_id)} color="primary" disabled={!row.details}>
              <VisibilityIcon />
            </IconButton>
            ) : (
              row[header] !== undefined ? row[header].toString() : ''
            )}
          </CustomTableCell>
        ))}
      </TableRow>
    ));
  };

  const handleViewDetails = (details, testId) => {
    console.log("reache", details, testId)
    setSelectedTestCase({ details, testId });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Convert data to CSV format
  const convertToCSV = (data) => {
    if (data.length === 0) return '';

    const headers = getHeaders();
    const rows = data.map(row => headers.map(header => JSON.stringify(row[header] || '', replacer)).join(','));
    return [headers.join(','), ...rows].join('\r\n');
  };

  const replacer = (key, value) => value === null ? '' : value;

  const handleDownload = () => {
    const csv = convertToCSV(details);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'test_case_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle sx={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'Arial Black, Arial, sans-serif' }}>
        {testCase.testType} Detailed View For 
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'primary.main', 
            fontWeight: 'bold', 
            display: 'inline', 
            ml: 1, 
            fontSize: '2rem'
          }}
        >
          {testCase.testId}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 'calc(100vh - 200px)', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {getHeaders().map((header, index) => (
                  <CustomTableCell key={index} header>{header}</CustomTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {getRows()}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <CustomButton
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{ mr: 1 }}
        >
          Download
        </CustomButton>
        <CustomButton
          onClick={onClose}
          color="primary"
        >
          Close
        </CustomButton>
      </DialogActions>
    </Dialog>
    {selectedTestCase && (
        <DetailedTestCaseModal
          open={openModal}
          onClose={handleCloseModal}
          testCase={selectedTestCase}
        />
      )}
    </>
  );
};

export default TestCaseModal;
