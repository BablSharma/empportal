const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();
const leaveRoutes = require('./routes/leaves');
const employeeRoutes = require("./routes/employees");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRoutes);

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bablu@123', // your MySQL password
  database: 'hr_employee_db', // your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// Make db accessible in req for routes/controllers if needed
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Leave routes
app.use('/api/leaves', leaveRoutes);

// Signup route
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  try {
    // Check if username exists
    db.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error!' });
        if (results.length > 0) {
          return res.status(400).json({ error: 'Username already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
          'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
          [username, email, hashedPassword, role],
          (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error!' });
            res.status(201).json({ message: 'Signup successful!' });
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error!' });
  }
});

// Login route
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error!' });

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials!' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials!' });
    }

    res.json({ message: 'Login successful!', role: user.role });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
