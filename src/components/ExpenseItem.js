import React from 'react';
import axios from 'axios';

const ExpenseItem = ({ expense, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${expense._id}`);
      onDelete(expense._id);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div>
      <span>{expense.description}</span>
      <span>{expense.amount}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ExpenseItem;
