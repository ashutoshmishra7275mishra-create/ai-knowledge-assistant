// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import pool from "../utils/db.js";

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const hashed = await bcrypt.hash(password, 10);

//     const result = await pool.query(
//       "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
//       [name, email, hashed]
//     );

//     res.json({ success: true, user: result.rows[0] });
//   } catch (err) {
//     res.status(400).json({ error: "Email already exists!" });
//   }
// };

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

//   if (result.rows.length === 0)
//     return res.status(400).json({ error: "User not found" });

//   const user = result.rows[0];

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch)
//     return res.status(400).json({ error: "Wrong password" });

//   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

//   res.json({ success: true, token, user });
// };













import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../utils/db.js";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    console.log("🔥 Signup API HIT:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields required" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, hashed]
    );

    res.json({
      success: true,
      message: "Signup successful",
      user: result.rows[0]
    });

  } catch (err) {
    console.log("❌ DB ERROR:", err.message);
    res.json({ success: false, message: err.message });
  }
};


// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    console.log("🔥 Login API HIT");

    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign({ userId: user.id }, "secret123");

    res.json({
      success: true,
      message: "Login success",
      token,
      user
    });

  } catch (err) {
    console.log("❌ LOGIN ERROR:", err.message);
    res.json({ success: false, message: err.message });
  }
};