import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ExpenseAnalysis = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0); // State to store total expense

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/expenses');
        setExpenses(response.data);
        calculateTotalExpense(response.data); // Calculate total expense when expenses data is fetched
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, []);

  const calculateTotalExpense = (expensesData) => {
    const total = expensesData.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpense(total);
  };

  const categoryTotals = expenses.reduce((acc, expense) => {
    if (expense.category) {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expense Amount',
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', marginTop: 8 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={8} sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ fontFamily: 'Michroma, sans-serif' }}>
              Pie Chart
            </Typography>
            <Pie data={data} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={8} sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ fontFamily: 'Michroma, sans-serif' }}>
              Bar Chart
            </Typography>
            <Bar data={data} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={8} sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ fontFamily: 'Michroma, sans-serif', fontSize: '40px' }}>
              Total Expense
            </Typography>
            <Typography variant="h5" align="center" gutterBottom fontWeight="bold" sx={{ fontFamily: 'Michroma, sans-serif', fontSize: '32px' }}>
              {`Rs. ${totalExpense}`}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpenseAnalysis;
