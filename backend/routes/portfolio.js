// Portfolio Routes
const express = require('express');
const router = express.Router();
const {
  getAllPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio
} = require('../controllers/portfolioController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getAllPortfolios);
router.get('/:id', getPortfolio);
router.post('/', protect, authorize('admin'), createPortfolio);
router.put('/:id', protect, authorize('admin'), updatePortfolio);
router.delete('/:id', protect, authorize('admin'), deletePortfolio);

module.exports = router;
