const asyncHandler = require("../utils/asyncHandler");
const dashboardService = require("../services/dashboardService");

const getSummary = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const summary = await dashboardService.getSummary(startDate, endDate);
  res.status(200).json(summary);
});

const getCategoryTotals = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const categories = await dashboardService.getCategoryTotals(
    startDate,
    endDate,
  );
  res.status(200).json(categories);
});

const getMonthlyTrends = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const trends = await dashboardService.getMonthlyTrends(startDate, endDate);
  res.status(200).json(trends);
});

module.exports = {
  getSummary,
  getCategoryTotals,
  getMonthlyTrends,
};
