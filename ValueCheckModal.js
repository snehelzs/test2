import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DetailedValueCheckModal from '../ModalView/DetailedValueCheckModal';
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
  display: icon ? 'flex' : 'table-cell',
  alignItems: 'center',
  justifyContent: icon ? 'center' : 'initial',
  cursor: icon ? 'pointer' : 'initial',
}));

const defaultHeaders = ['Test Case ID', 'DVE Run Date', 'Function', 'Test Case Description', 'Values', 'Error Flag', 'Details'];

const comprehensiveCodesetHeaders = ['DVE Run Date', 'Measure', 'Value Set', 'Code Set', 'Code Value', 'Current Count', 'Previous Count', 'Percentage Change', 'Error'];

const ValueCheckModal = ({ open, onClose, testCase }) => {
  console.log("In First Modal", testCase)
  const { details = [] } = testCase;
  const [selectedTestCase, setSelectedTestCase] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const getHeaders = () => {
    return testCase.testType === 'Comprehensive Codeset Count'
      ? comprehensiveCodesetHeaders
      : defaultHeaders;
  };

  const getRows = () => {
    console.log("get me details", details)
    return details.map((row, index) => (
      <TableRow key={index}>
        {getHeaders().map((header, idx) => (
          <CustomTableCell key={idx} icon={header === 'Details'}>
            {header === 'Details' ? (
              <IconButton onClick={() => handleViewDetails(row.Details, row.Function, row["Test Case ID"], row["Test Case Description"])} color="primary" disabled={!row.Details}>
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

  const handleViewDetails = (Description, func, testId, testType) => {
    setSelectedTestCase({ Description, func, testId, testType });
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
        <DetailedValueCheckModal
          open={openModal}
          onClose={handleCloseModal}
          testCase={selectedTestCase}
        />
      )}
    </>
  );
};

export default ValueCheckModal;
