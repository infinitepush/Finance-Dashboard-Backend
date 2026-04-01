const express = require("express");

const userController = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/rbacMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {
  createUserValidator,
  updateUserValidator,
} = require("../middleware/validators");

const router = express.Router();

router.use(authenticate, authorize("admin"));

router.get("/", userController.listUsers);
router.post(
  "/",
  createUserValidator,
  validateRequest,
  userController.createUser,
);
router.patch(
  "/:id",
  updateUserValidator,
  validateRequest,
  userController.updateUser,
);

module.exports = router;
