import pool from "../utils/db.js";

export const getTasks = async (req, res) => {
  const { userId } = req.params;
  const result = await pool.query("SELECT * FROM tasks WHERE user_id=$1", [userId]);
  res.json(result.rows);
};

export const createTask = async (req, res) => {
  const { user_id, title, description, due_date } = req.body;

  const result = await pool.query(
    "INSERT INTO tasks (user_id, title, description, due_date) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, title, description, due_date]
  );

  res.json(result.rows[0]);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await pool.query(
    "UPDATE tasks SET status=$1 WHERE id=$2 RETURNING *",
    [status, id]
  );

  res.json(result.rows[0]);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
  res.json({ success: true });
};
