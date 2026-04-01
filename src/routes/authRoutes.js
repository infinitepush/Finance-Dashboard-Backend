const express = require("express");

const authController = require("../controllers/authController");
const validateRequest = require("../middleware/validateRequest");
const { loginValidator } = require("../middleware/validators");

const router = express.Router();

router.post("/login", loginValidator, validateRequest, authController.login);

module.exports = router;
