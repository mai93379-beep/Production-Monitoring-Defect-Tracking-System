const Defect = require('../models/defectModel');

exports.getAllDefects = async (req, res) => {
  try {
    const defects = await Defect.getAll();
    res.json(defects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addDefect = async (req, res) => {
  try {
    const defectId = await Defect.create(req.body);
    res.status(201).json({ message: 'Defect reported', id: defectId });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDefectStats = async (req, res) => {
  try {
    const stats = await Defect.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
