import express from "express";
import { Database } from "../@config";
import { TechnicianRepository, SettingsRepository } from "../@repositories";
import { TechnicianService } from "../@services";
import { TechnicianController } from "../@controllers/technicianController";
import { AuthenticationMiddleware } from "../@middlewares";
import { PATH } from "../@constants";

const router = express.Router();

const database = new Database();

const technicianRepository = new TechnicianRepository(database);

const technicianService = new TechnicianService(technicianRepository);

const technicianController = new TechnicianController(technicianService);

const settingsRepository = new SettingsRepository(database);
const authenticationMiddleware = new AuthenticationMiddleware(
  settingsRepository
);

// get all technicians endpoint.
router.get(
  PATH.TECHNICIANS,
  authenticationMiddleware.BasicAuthVerifier(),
  technicianController.getAllTechnicians
);

export default router;
