import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const ExpenseList = ({ refresh }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/expenses');
        const sortedExpenses = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setExpenses(sortedExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, [refresh]);

  return (
    <Box mt={10} mx={2}>
      <Paper elevation={8} sx={{ padding: 8, backgroundColor: '#FBE4D8' }}> {/* Change background color here */}
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ fontFamily: 'Michroma, sans-serif' }}>
          Expense List
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: '300px', overflow: 'auto',backgroundColor: '#FBE4D8' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell component="th" scope="row">
                    {expense.description}
                  </TableCell>
                  <TableCell align="right">{`Rs.${expense.amount}`}</TableCell>
                  <TableCell align="right">{expense.category || 'No category'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ExpenseList;
