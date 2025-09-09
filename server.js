const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(require('cors')());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/api/claims/submit', (req, res) => {
  res.json({ message: 'Test route reached' });
});


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Business Expense Reimbursement Portal API is running.');
});

const claimRoutes = require('./routes/claims');
app.use('/api/claims', claimRoutes);


const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen(5000, () => console.log('Server running on port 5000'));
