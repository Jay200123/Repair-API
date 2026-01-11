import express from "express";
import { Database } from "../@config";
import { RepairRepository, SettingsRepository } from "../@repositories";
import { RepairService } from "../@services";
import { RepairController } from "../@controllers/repairController";
import { PATH } from "../@constants";
import {
  createRepairFields,
  repairsQueryParams,
  repairIdParam,
} from "../@validations";
import { AuthenticationMiddleware } from "../@middlewares";

const router = express.Router();

const database = new Database();
const repairRepository = new RepairRepository(database);
const repairService = new RepairService(repairRepository);
const repairController = new RepairController(repairService);

const settingsRepository = new SettingsRepository(database);
const authenticationMiddleware = new AuthenticationMiddleware(
  settingsRepository
);

// get all repair details endpoint.
router.get(
  PATH.REPAIRS,
  repairsQueryParams,
  authenticationMiddleware.BasicAuthVerifier(),
  repairController.getAllRepairs
);

// get repairs by date repaired endpoint
router.get(
  PATH.REPAIRS_REPAIRED,
  repairIdParam,
  repairController.getRepairDetailsByDateRepaired
);

//get repair by id endpoint
router.get(
  PATH.REPAIR_ID,
  authenticationMiddleware.BasicAuthVerifier(),
  repairController.getRepairById
);

//edit repair details by id endpoint
router.patch(
  PATH.EDIT_REPAIR_ID,
  authenticationMiddleware.BasicAuthVerifier(),
  repairController.updateRepairById
);

//create repair details endpoint
router.post(PATH.REPAIRS, createRepairFields, repairController.createRepair);

export default router;
