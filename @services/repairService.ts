import { STATUSCODE } from "../@constants";
import { RepairRepository } from "../@repositories";
import { ErrorHandler, repairFields, checkFields } from "../@utils";
import { RepairDetails } from "../@types";

export class RepairService {
  constructor(private repairRepository: RepairRepository) {}

  async getAllRepairs(limit: number, offset: number) {

    const results = await this.repairRepository.getAll(limit, offset);

    if (!results.length) {
      throw new ErrorHandler(STATUSCODE.NOT_FOUND, "Repairs not found");
    }

    return results;
  }

  async getRepairById(id: number) {
    const result = await this.repairRepository.getById(id);

    if (!result.length) {
      throw new ErrorHandler(STATUSCODE.NOT_FOUND, "Repair details not found");
    }

    return result;
  }

  async createRepair(data: RepairDetails) {
    // Enforce allowed payload fields
    checkFields(repairFields, data);

    const result = await this.repairRepository.create(data);

    const isCreated = result?.affectedRows == 1 ? true : false;

    return isCreated
      ? "Repair Details created successfully"
      : "Invalid Request";
  }

  async updateRepairById() {}
}
