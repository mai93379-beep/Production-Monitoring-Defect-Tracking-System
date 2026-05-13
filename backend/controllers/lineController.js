const Line = require('../models/lineModel');

exports.getAllLines = async (req, res) => {
  try {
    const lines = await Line.getAll();
    res.json(lines);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLineById = async (req, res) => {
  try {
    const line = await Line.getById(req.params.id);
    if (!line) return res.status(404).json({ message: 'Line not found' });
    res.json(line);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateLineStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await Line.updateStatus(req.params.id, status);
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
