import { query } from "express-validator"

const getUnitsBySkuQueryParams = [
    query("unit_sku")
    .notEmpty()
    .withMessage("missing unit_sku")
]

export {
    getUnitsBySkuQueryParams
}