import { Request, Response, NextFunction } from "express";
import { RepairService } from "../@services";
import { logger, SuccessHandler, expressValidationResults } from "../@utils";
import { STATUSCODE } from "../@constants";

type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => void;

export class RepairController {
  constructor(private repairService: RepairService) {}

  getAllRepairs: MiddlewareFn = async (req, res, next) => {
    logger.info({
      GET_ALL_REPAIRS_REQUEST: {
        message: "SUCCESS",
      },
    });

    const result = await this.repairService.getAllRepairs(
      Number(req.query.limit) || 10,
      Number(req.query.offset) || 0
    );

    logger.info({
      GET_ALL_REPAIRS_RESPONSE: {
        message: "SUCCESS",
      },
    });

    return SuccessHandler(res, STATUSCODE.SUCCESS, result, "Success");
  };

  getRepairById: MiddlewareFn = async (req, res, next) => {
    logger.info({
      GET_REPAIR_BY_ID_REQUEST: {
        message: "SUCCESS",
      },
    });

    expressValidationResults(req);

    const result = await this.repairService.getRepairById(
      Number(req.params.id)
    );

    logger.info({
      GET_REPAIR_BY_ID_RESPONSE: {
        message: "SUCCESS",
      },
    });

    return SuccessHandler(res, STATUSCODE.SUCCESS, result, "Success");
  };

  createRepair: MiddlewareFn = async (req, res, next) => {
    logger.info({
      ADD_REPAIR_REQUEST: {
        message: "SUCCESS",
      },
    });

    expressValidationResults(req);

    const result = await this.repairService.createRepair(req.body);

    logger.info({
      ADD_REPAIR_RESPONSE: {
        message: "SUCCESS",
      },
    });

    return SuccessHandler(res, STATUSCODE.CREATED, result, "Success");
  };

  // pending feature.
  updateRepairById: MiddlewareFn = async (req, res, next) => {
    logger.info({
      EDIT_REPAIR_BY_ID_REQUEST: {
        message: "SUCCESS",
      },
    });

    const result = await this.repairService.updateRepairById(
      Number(req.params.id),
      req.body
    );

    logger.info({
      EDIT_REPAIR_BY_ID_RESPONSE: {
        message: "SUCCESS",
      },
    });

    return SuccessHandler(res, STATUSCODE.SUCCESS, result, "Success");
  };

  getRepairDetailsByDateRepaired: MiddlewareFn = async (req, res, next) => {
    logger.info({
      GET_REPAIR_DETAILS_BY_DATE_REPAIRED_REQUEST: {
        message: "SUCCESS",
      },
    });

    const results = await this.repairService.getRepairDetailsByDateRepaired(
      // Explicitly cast to 'string' for TypeScript.
      // Note: This assumes that validation has already ensured the query parameter exists and is not undefined.
      req.query.date_from as string,
      req.query.date_to as string
    );

    logger.info({
      GET_REPAIR_DETAILS_BY_DATE_REPAIRED_RESPONSE: {
        message: "SUCCESS",
      },
    });

    return SuccessHandler(res, STATUSCODE.SUCCESS, results, "Success");
  };
}
