const express = require("express");

const recordController = require("../controllers/recordController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/rbacMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {
  createRecordValidator,
  updateRecordValidator,
  recordIdValidator,
  recordListValidator,
} = require("../middleware/validators");

const router = express.Router();

router.use(authenticate);

router.get(
  "/",
  authorize("viewer", "analyst", "admin"),
  recordListValidator,
  validateRequest,
  recordController.listRecords,
);
router.get(
  "/:id",
  authorize("viewer", "analyst", "admin"),
  recordIdValidator,
  validateRequest,
  recordController.getRecordById,
);
router.post(
  "/",
  authorize("admin"),
  createRecordValidator,
  validateRequest,
  recordController.createRecord,
);
router.patch(
  "/:id",
  authorize("admin"),
  updateRecordValidator,
  validateRequest,
  recordController.updateRecord,
);
router.delete(
  "/:id",
  authorize("admin"),
  recordIdValidator,
  validateRequest,
  recordController.deleteRecord,
);

module.exports = router;
