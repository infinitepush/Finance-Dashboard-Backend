const express = require("express");

const dashboardController = require("../controllers/dashboardController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/rbacMiddleware");
const validateRequest = require("../middleware/validateRequest");
const { dashboardQueryValidator } = require("../middleware/validators");

const router = express.Router();

router.use(authenticate, authorize("analyst", "admin"));

router.get(
  "/summary",
  dashboardQueryValidator,
  validateRequest,
  dashboardController.getSummary,
);
router.get(
  "/categories",
  dashboardQueryValidator,
  validateRequest,
  dashboardController.getCategoryTotals,
);
router.get(
  "/trends/monthly",
  dashboardQueryValidator,
  validateRequest,
  dashboardController.getMonthlyTrends,
);

module.exports = router;
