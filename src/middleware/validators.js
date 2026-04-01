const { body, param, query } = require("express-validator");

const roles = ["viewer", "analyst", "admin"];
const statuses = ["active", "inactive"];
const recordTypes = ["income", "expense"];

const createUserValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .isIn(roles)
    .withMessage("Role must be viewer, analyst, or admin"),
  body("status")
    .optional()
    .isIn(statuses)
    .withMessage("Status must be active or inactive"),
];

const updateUserValidator = [
  param("id").isMongoId().withMessage("Valid user id is required"),
  body("role")
    .optional()
    .isIn(roles)
    .withMessage("Role must be viewer, analyst, or admin"),
  body("status")
    .optional()
    .isIn(statuses)
    .withMessage("Status must be active or inactive"),
  body().custom((value) => {
    if (!value.role && !value.status) {
      throw new Error("At least one of role or status is required");
    }
    return true;
  }),
];

const loginValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const createRecordValidator = [
  body("amount")
    .isFloat({ min: 0 })
    .withMessage("Amount must be a number greater than or equal to 0"),
  body("type")
    .isIn(recordTypes)
    .withMessage("Type must be either income or expense"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("date").isISO8601().withMessage("Date must be a valid ISO date"),
  body("notes").optional().isString().withMessage("Notes must be a string"),
];

const updateRecordValidator = [
  param("id").isMongoId().withMessage("Valid record id is required"),
  body("amount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Amount must be a number greater than or equal to 0"),
  body("type")
    .optional()
    .isIn(recordTypes)
    .withMessage("Type must be either income or expense"),
  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty"),
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid ISO date"),
  body("notes").optional().isString().withMessage("Notes must be a string"),
  body().custom((value) => {
    if (Object.keys(value).length === 0) {
      throw new Error("At least one field is required for update");
    }
    return true;
  }),
];

const recordIdValidator = [
  param("id").isMongoId().withMessage("Valid record id is required"),
];

const recordListValidator = [
  query("type")
    .optional()
    .isIn(recordTypes)
    .withMessage("Type must be either income or expense"),
  query("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("startDate must be a valid ISO date"),
  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("endDate must be a valid ISO date"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be an integer >= 1"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be an integer between 1 and 100"),
];

const dashboardQueryValidator = [
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("startDate must be a valid ISO date"),
  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("endDate must be a valid ISO date"),
];

module.exports = {
  createUserValidator,
  updateUserValidator,
  loginValidator,
  createRecordValidator,
  updateRecordValidator,
  recordIdValidator,
  recordListValidator,
  dashboardQueryValidator,
};
