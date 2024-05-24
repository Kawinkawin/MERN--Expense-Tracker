import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Grid } from '@mui/material';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import ExpenseAnalysis from './ExpenseAnalysis';

const ExpenseTracker = () => {
  const [refresh, setRefresh] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const handleNewExpense = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const handleResize = () => {
      const contentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      setShowFooter(contentHeight > viewportHeight);
    };

    handleResize(); // Check initially
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <AppBar position="fixed" sx={{ backgroundColor: '#333' }}>
        <Toolbar sx={{ justifyContent: 'space-between', paddingX: '24px' }}> {/* Increased paddingX */}
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            sx={{ fontFamily: 'Pacifico, cursive', fontSize: '50px', color: '#ffffff' }}
          >
            PK.
          </Typography>
          <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push the center text */}
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            fontFamily="'Pacifico', cursive" 
            sx={{ fontSize: '50px', color: '#ffffff' }}
          >
            Expense Tracker
          </Typography>
          <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push the center text */}
        </Toolbar>
      </AppBar>
      <Box mt={10} mx={2} pb={showFooter ? 50 : 0}> {/* Add margin to avoid content being hidden behind the AppBar */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ExpenseForm onNewExpense={handleNewExpense} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ExpenseList refresh={refresh} />
          </Grid>
        </Grid>
        <Box mt={4}>
          <ExpenseAnalysis refresh={refresh} />
        </Box>
      </Box>
      {showFooter && (
        <Box
          bgcolor="#333"
          color="#ffffff"
          textAlign="center"
          height={50}
          lineHeight="50px"
        >
          Developed by Kawin
        </Box>
      )}
    </div>
  );
};

export default ExpenseTracker;
