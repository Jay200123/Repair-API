import { STATUSCODE } from "../@constants";
import { UnitService } from "../@services/unitService";
import { MiddlewareFn } from "../@types";
import { logger, SuccessHandler, expressValidationResults } from "../@utils";

export class UnitController {
  constructor(private unitService: UnitService) {}

  getAllUnits: MiddlewareFn = async (req, res, next) => {
    logger.info({
      GET_ALL_UNITS_REQUEST: {
        message: "SUCCESS",
      },
    });

    const results = await this.unitService.getAllUnits();

    logger.info({
      GET_ALL_UNITS_RESPONSE: {
        message: "SUCCESS",
      },
    });

    return SuccessHandler(res, STATUSCODE.SUCCESS, results, "Success");
  };

  getAllUnitsBySKU: MiddlewareFn = async (req, res, next) => {
    logger.info({
      GET_ALL_UNITS_BY_SKU_REQUEST: {
        message: "SUCCESS",
      },
    });

    expressValidationResults(req);

    const results = await this.unitService.getUnitNamesByUnitSKU(
      req.query.unit_sku as string
    );

    logger.info({
      GET_ALL_UNITS_BY_SKU_RESPONSE: {
        message: "SUCCESS",
      },
    });

    return SuccessHandler(res, STATUSCODE.SUCCESS, results, "Success");
  };

  getUnitSKU: MiddlewareFn = async (req, res, next) => {
    logger.info({
      GET_UNIT_SKU_REQUEST: {
        message: "SUCCESS",
      },
    });

    expressValidationResults(req);

    const results = await this.unitService.getUnitNamesByUnitSKU(
      req.query.unit_sku as string
    );

    logger.info({
      GET_UNIT_SKU_RESPONSE: {
        message: "SUCCESS",
      },
    });

    return SuccessHandler(res, STATUSCODE.SUCCESS, results, "Success");
  };

  getSKU: MiddlewareFn = async (req, res, next) => {
    logger.info({
      GET_SKU_REQUEST: {
        message: "SUCCESS",
      },
    });

    const results = await this.unitService.getUnitSKU();

    logger.info({
      GET_SKU_RESPONSE: {
        message: "SUCCESS",
      },
    });

    return SuccessHandler(res, STATUSCODE.SUCCESS, results, "Success");
  };
}
