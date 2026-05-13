const db = require('../config/db');

const Defect = {
  getAll: async () => {
    const [rows] = await db.execute(`
      SELECT d.*, l.line_name 
      FROM defects d 
      JOIN production_lines l ON d.line_id = l.id
      ORDER BY d.defect_time DESC
    `);
    return rows;
  },

  create: async (defectData) => {
    const { line_id, defect_type, quantity, description } = defectData;
    const [result] = await db.execute(
      'INSERT INTO defects (line_id, defect_type, quantity, defect_time, description) VALUES (?, ?, ?, NOW(), ?)',
      [line_id, defect_type, quantity, description]
    );
    return result.insertId;
  },

  getStats: async () => {
    const [rows] = await db.execute(`
      SELECT defect_type, SUM(quantity) as total_quantity 
      FROM defects 
      GROUP BY defect_type
    `);
    return rows;
  }
};

module.exports = Defect;
