import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const TotalExpense = ({ expenses }) => {
  // Calculate total expense
  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
      <Paper elevation={1} sx={{ padding: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Total Expense
        </Typography>
        <Typography>Total: ${totalExpense}</Typography>
      </Paper>
    </Box>
  );
};

export default TotalExpense;
