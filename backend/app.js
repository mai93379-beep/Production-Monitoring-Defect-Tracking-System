const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const lineRoutes = require('./routes/lineRoutes');
const defectRoutes = require('./routes/defectRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lines', lineRoutes);
app.use('/api/defects', defectRoutes);
app.use('/api/logs', logRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
