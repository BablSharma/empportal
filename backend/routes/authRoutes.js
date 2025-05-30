// controllers/authController.js
import { hash, compare } from "bcrypt";
import { query } from './config/db';


export async function signup(req, res) {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error!" });
      if (results.length > 0) {
        return res.status(400).json({ error: "Username already exists!" });
      }

      const hashedPassword = await hash(password, 10);
      query(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, role],
        (err) => {
          if (err) return res.status(500).json({ error: "Database error!" });
          res.status(201).json({ message: "Signup successful!" });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error!" });
  }
}

export function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error!" });

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    const user = results[0];
    const match = await compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    res.json({ message: "Login successful!", role: user.role });
  });
}
