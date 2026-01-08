import { STATUSCODE } from "../@constants";
import { UnitRepository } from "../@repositories/unitRepository";
import { ErrorHandler } from "../@utils";

export class UnitService {
  constructor(private unitRepository: UnitRepository) {}

  async getAllUnits() {
    const results = await this.unitRepository.getAll();

    if (results.length == 0) {
      throw new ErrorHandler(STATUSCODE.NOT_FOUND, "Units not Found");
    }

    return results;
  }

  async getUnitNamesByUnitSKU(unit_sku: string) {
    const results = await this.unitRepository.getByUnitSKU(unit_sku);

    if (results.length == 0) {
      throw new ErrorHandler(STATUSCODE.NOT_FOUND, "Units not Found");
    }

    return results;
  }

  async getUnitSKU() {
    const results = await this.unitRepository.getBySKU();

    if (results.length == 0) {
      throw new ErrorHandler(STATUSCODE.NOT_FOUND, "Unit SKU's not found");
    }

    return results;
  }
}
