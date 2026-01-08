import express from "express";
import { Database } from "../@config";
import { UnitRepository, SettingsRepository } from "../@repositories";
import { UnitService } from "../@services";
import { UnitController } from "../@controllers";
import { PATH } from "../@constants";
import { getUnitsBySkuQueryParams } from "./../@validations";
import { AuthenticationMiddleware } from "../@middlewares";

const router = express.Router();

const database = new Database();
const unitRepository = new UnitRepository(database);

const unitService = new UnitService(unitRepository);

const unitController = new UnitController(unitService);

const settingsRepository = new SettingsRepository(database);
const authenticationMiddleware = new AuthenticationMiddleware(
  settingsRepository
);

// get all units without pagination endpoint
router.get(PATH.UNITS, unitController.getAllUnits);

// get units by `unit_sku` endpoint.
router.get(
  PATH.UNITS_SKU,
  getUnitsBySkuQueryParams,
  authenticationMiddleware.BasicAuthVerifier(),
  unitController.getAllUnitsBySKU
);

// get sku's
router.get(
  PATH.SKU,
  authenticationMiddleware.BasicAuthVerifier(),
  unitController.getSKU
);

export default router;
