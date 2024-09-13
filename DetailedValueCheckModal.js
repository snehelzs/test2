import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
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

const DetailedValueCheckModal = ({ open, onClose, testCase }) => {
  const details  = testCase.Description; // Default to empty array if details is undefined 
  // Determine headers based on test_type
  console.log("In Nested Details", testCase)
  const getHeaders = () => {
    console.log(testCase.func)
    switch (testCase.func.toLowerCase()) {
      case 'age check':
        return ['Age groups', 'Current Run', 'Previous Run', 'Error Flag'];
      case 'universe check':
        return ['DVE Run Date', 'Table Name', 'Column Name', 'Value', 'Part of the defined set?', 'Error Flag'];
      case 'dates in future':
        return ['DVE Run Date', 'Table Name', 'Column Name', 'Value', 'Count'];
      case 'frequency check':
        return['DVE Run Date', 'For', 'Column Name', 'Value', 'Current Count', 'Previous Count', 'Error Flag'];
      case 'duplicate check':
        return['DVE Run Date', 'Table Name', 'Column Name', 'Value', 'Duplicate Detected?', 'Duplicate Count','Error Flag'];      
      default:
        return [];
    }
  };


  // Generate table rows based on details
  const getRows = () => {
    console.log("details", testCase, details)
    if(Array.isArray(details)){
    return details.map((row, index) => (
        <TableRow key={index}>
          {getHeaders().map((header, idx) => (
            <CustomTableCell key={idx} >
              { 
               row[header] !== undefined ? row[header].toString() : ''
              }
            </CustomTableCell>
          ))}
        </TableRow>
      ));
            }
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
    </>
  );
};

export default DetailedValueCheckModal;
