const db = require('../config/db');

const Line = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM production_lines');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM production_lines WHERE id = ?', [id]);
    return rows[0];
  },

  updateStatus: async (id, status) => {
    await db.execute('UPDATE production_lines SET status = ? WHERE id = ?', [status, id]);
  },

  updateOutput: async (id, output) => {
    await db.execute('UPDATE production_lines SET output_today = ? WHERE id = ?', [output, id]);
  }
};

module.exports = Line;
