import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, MenuItem, Paper, Typography } from '@mui/material';

const ExpenseForm = ({ onNewExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Log the data fetched from the user
    console.log("Description:", description);
    console.log("Amount:", amount);
    console.log("Category:", category);
    
    try {
      // Make the POST request
      await axios.post('http://localhost:5000/expenses', { description, amount, category });
      // Clear the input fields after successful submission
      setDescription('');
      setAmount('');
      setCategory('');
      // Trigger a function passed from parent component to update state after adding a new expense
      onNewExpense();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <Box mt={10}> {/* Add margin top */}
      <Paper elevation={10} sx={{ padding: 8, marginBottom: 2, maxWidth: 500, margin: 'auto', backgroundColor: '#FBE4D8' }}>
        <Typography 
          variant="h4" 
          align="center" 
          fontWeight="bold" 
          gutterBottom 
          sx={{ fontFamily: 'Michroma, sans-serif' }}
        >
          Add Expense
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            fullWidth
            margin="normal"
          >
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="entertainment">Entertainment</MenuItem>
            <MenuItem value="travel">Travel</MenuItem>
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="essentials">Essentials</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary">Add Expense</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ExpenseForm;
