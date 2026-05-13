const db = require('../config/db');

const User = {
  findByUsername: async (username) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  create: async (userData) => {
    const { username, password, role, full_name } = userData;
    const [result] = await db.execute(
      'INSERT INTO users (username, password, role, full_name) VALUES (?, ?, ?, ?)',
      [username, password, role, full_name]
    );
    return result.insertId;
  }
};

module.exports = User;
