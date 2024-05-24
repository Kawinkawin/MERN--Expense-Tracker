require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: { type: String, required: true } // Ensure category is required
});

const Expense = mongoose.model('Expense', expenseSchema);

app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.send(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/expenses', async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    if (!category) {
      return res.status(400).send('Category is required');
    }
    const expense = new Expense({ description, amount, category });
    await expense.save();
    res.send(expense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).send('Internal server error');
  }
});

app.delete('/expenses/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.send({ message: 'Expense deleted' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).send('Internal server error');
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
