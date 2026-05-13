const Log = require('../models/logModel');

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.getAll();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addLog = async (req, res) => {
  try {
    const logId = await Log.create(req.body);
    res.status(201).json({ message: 'Log added', id: logId });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
