const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('API running'));

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors())

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/drive', require('./routes/api/drive'));
app.use('/api/assignments', require('./routes/api/assignments'));
app.use('/api/submissions', require('./routes/api/submissions'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
