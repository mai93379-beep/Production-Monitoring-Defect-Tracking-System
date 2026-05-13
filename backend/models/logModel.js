const db = require('../config/db');

const Log = {
  getAll: async () => {
    const [rows] = await db.execute(`
      SELECT lg.*, l.line_name 
      FROM production_logs lg 
      JOIN production_lines l ON lg.line_id = l.id
      ORDER BY lg.created_at DESC
      LIMIT 50
    `);
    return rows;
  },

  create: async (logData) => {
    const { line_id, log_message } = logData;
    const [result] = await db.execute(
      'INSERT INTO production_logs (line_id, log_message, created_at) VALUES (?, ?, NOW())',
      [line_id, log_message]
    );
    return result.insertId;
  }
};

module.exports = Log;
