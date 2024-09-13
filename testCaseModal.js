import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DetailedTestCaseModal from '../ModalView/DetailedTestCaseModal';
import { styled } from '@mui/material/styles';

// Styled components
const CustomButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Arial Black, Arial, sans-serif',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
}));

const CustomTableCell = styled(TableCell)(({ theme, header, icon, width }) => ({
  fontFamily: 'Arial Black, Arial, sans-serif',
  fontSize: header ? '1.25rem' : '1rem',
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  backgroundColor: header ? '#e0f7fa' : 'inherit',
  fontWeight: header ? 'bold' : 'normal',
  display: icon ? 'flex' : 'table-cell',
  alignItems: 'center',
  justifyContent: icon ? 'center' : 'initial',
  cursor: icon ? 'pointer' : 'initial',
  width: width || 'auto', // Apply width if provided
}));

const TestCaseModal = ({ open, onClose, testCase }) => {
  const { details = [] } = testCase;

  const getHeaders = () => {
    switch (testCase.testType) {
      case 'Data Availability Check':
        return ['DVE Run Date', 'Data Source', 'Table Name', 'Associated Measure', 'Availability', 'Table Last Refresh', 'Error Flag'];
      case 'Table Schema Check':
        return ['DVE Run Date', 'Data Source', 'Table Name', 'Column Name', 'Associated Measure', 'Expected Data Type', 'Current Data Type', 'Error Flag'];
      case 'Column Value Consistency Check':
        return ['CheckNo', 'DVE Run Date', 'Data Source', 'Table Name', 'Column Name', 'Data Type', 'Test Type', 'Error Flag', 'Details'];
      default:
        return [];
    }
  };

  const [selectedTestCase, setSelectedTestCase] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const getRows = () => {
    return details.map((row, index) => (
      <TableRow key={index}>
        {getHeaders().map((header, idx) => (
          <CustomTableCell
            key={idx}
            icon={header === 'Details'}
            width={header === 'Associated Measure' ? '150px' : 'auto'}
          >
            {header === 'Details' ? (
              <IconButton
                onClick={() => handleViewDetails(row.Description, row.CheckNo, row["Test Type"])}
                color="primary"
                disabled={!row.Description || (row["Test Type"] === 'Null Check') || String(row.Description).trim() === ''}
              >
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

  const handleViewDetails = (Description, testId, testType) => {
    setSelectedTestCase({ Description, testId, testType });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
        <DialogContent sx={{ overflow: 'hidden' }}>
          <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
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
