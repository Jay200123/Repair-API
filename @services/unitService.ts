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
}
