import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useMsal } from '@azure/msal-react';
import HealthCheckInput from '../HeathCheckerInput/HealthCheckerInput';
import HealthSummary from '../HealthCheckSummary/HealthCheckSummary';
import ValueCheckInput from '../ValueCheckerInput/ValueCheckerInput';
import ValueSummary from '../ValueCheckSummary/ValueCheckSummary';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTab, setHealthCheckerResult, setValueCheckerResult } from '../../feature/tabSlice';
import { postHealthCheckerData } from '../api/getHealthCheck';


// Component for displaying each tab panel
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Main component with tabs
function FullWidthTabs() {
  const [value, setValue] = useState(0); // Default to the first tab
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const { instance } = useMsal(); // Use the MSAL instance from context
  const currentTab = useSelector((state) => state.tab.currentTab);

  const dispatch = useDispatch();

  const handleChange = async (event, tabIndex) => {
    if (tabIndex === 1)
       {
        const result = await postHealthCheckerData("selectedSources", "selectedTestcase");
        console.log("result", result)
        dispatch(setHealthCheckerResult(result));
       }
     else if (tabIndex === 3){
        const result = await postValueCheckerData("selectedSources", "selectedTestcase");
        console.log("result", result)
        dispatch(setValueCheckerResult(result));
     }  
    dispatch(setCurrentTab(tabIndex));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date().toLocaleDateString());
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSignOut = async () => {
    try {
      await instance.logoutRedirect({
        postLogoutRedirectUri: 'http://localhost:3000', // Redirect to sign-in page after logout
      });
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <AppBar position="sticky" sx={{ top: 0, zIndex: 1100 }}> {/* Updated position to 'sticky' */}
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <img src="/images/LHPlogo.jpg" alt="Logo 1" style={{ height: '60px', marginRight: '10px' }} />
            <img src="/images/ZSLogo.png" alt="Logo 2" style={{ height: '60px' , width:'90px' }} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Tabs
              value={currentTab}
              onChange={handleChange}
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              sx={{ height: '80px' }} // Adjust height of Tabs container
            >
              <Tab 
                label="Health Checker Inputs"
                sx={{ fontSize: '24px', fontWeight: 'bold', minHeight: '80px' }} // Increased font size
              />
              <Tab 
                label="Health Checker Summary"
                sx={{ fontSize: '24px', fontWeight: 'bold', minHeight: '80px' }} // Increased font size
              />
              <Tab 
                label="Value Checker Inputs"
                sx={{ fontSize: '24px', fontWeight: 'bold', minHeight: '80px' }} // Increased font size
              />
              <Tab 
                label="Value Checker Summary"
                sx={{ fontSize: '24px', fontWeight: 'bold', minHeight: '80px' }} // Increased font size
              />
            </Tabs>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
            <Typography variant="h6" sx={{ mr: 2, fontSize: '24px' }}>
              Refresh Date: {currentDate}
            </Typography>
            <Button onClick={handleSignOut} variant="contained" color="primary" sx={{ fontSize: '16px', height: '50px' }}>
              Sign Out
            </Button>
          </Box>
        </Box>
      </AppBar>
      <TabPanel value={currentTab} index={0}>
        <HealthCheckInput />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <HealthSummary />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <ValueCheckInput />
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        <ValueSummary />
      </TabPanel>
    </Box>
  );
}

function HomePage() {
  return (
    <FullWidthTabs />
  );
}

export default HomePage;
