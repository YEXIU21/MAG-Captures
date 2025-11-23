// Portfolio Controller
const Portfolio = require('../models/Portfolio');

// Get all portfolios
exports.getAllPortfolios = async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = {};

    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';

    const portfolios = await Portfolio.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: portfolios.length,
      data: portfolios
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single portfolio
exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }
    res.status(200).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create portfolio
exports.createPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.create(req.body);
    res.status(201).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update portfolio
exports.updatePortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete portfolio
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Portfolio deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
