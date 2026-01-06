import { body, param } from "express-validator";

const repairIdParam = [
  param("id")
    .exists({ checkFalsy: true }) // ensures the field exists and is not empty (undefined, null, or empty string)
    .withMessage("Invalid ID")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Invalid ID"),
];

const createRepairFields = [
  body("unit_id")
    .notEmpty()
    .withMessage("unit_id required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Invalid ID"),
  body("serial_number")
    .notEmpty()
    .withMessage("serial_number required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("serial_number must be a number")
    .bail()
    .isLength({ min: 6, max: 6 })
    .withMessage("serial_number must be exactly 6 digits"),
  body("actual_problem")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("actual_problem required"),
  body("unit_findings")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("unit_findings required"),
  body("work_done")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("work_done required"),
  body("date_returned")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("date_returned required")
    .bail()
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 string (YYYY-MM-DD)"),
  body("date_repaired")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("date_repaired required")
    .bail()
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 string (YYYY-MM-DD)"),
  body("unit_status")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("unit_status required")
    .bail()
    .isIn(["GOOD", "FOR_SCRAP", "FOR_REPAIR", "UNDER_OBSERVATION"])
    .withMessage(
      "unit_status must be 'GOOD', 'FOR_SCRAP', 'FOR_REPAIR', 'UNDER_OBSERVATION'"
    ),
  body("unit_remarks")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("unit_remarks required")
    .bail()
    .isIn(["CLASS-B", "CLASS-C", "CLASS-D", "FOR-SHIP"])
    .withMessage(
      "unit_remarks must be 'CLASS-B', 'CLASS-C', 'CLASS-D', 'FOR-SHIP'"
    ),
  body("unit_category")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("unit_category required")
    .bail()
    .isIn(["DEFECTIVE_UNIT", "CUSTOMER_UNIT"])
    .withMessage("unit_category must be 'DEFECTIVE_UNIT', 'CUSTOMER_UNIT'"),
  body("technician_id")
    .notEmpty()
    .withMessage("technician_id required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Invalid ID"),
];

export { repairIdParam, createRepairFields };
