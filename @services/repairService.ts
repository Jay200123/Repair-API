import { STATUSCODE } from "../@constants";
import { RepairRepository } from "../@repositories";
import { ErrorHandler, repairFields, checkFields, logger } from "../@utils";
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
    if (isNaN(id)) {
      logger.info({
        GET_REPAIR_BY_ID_REQUEST_ERROR: {
          message: `Invalid ID ${id}`,
        },
      });
      throw new ErrorHandler(STATUSCODE.BAD_REQUEST, "Invalid Request");
    }

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

  // pending feature.
  async updateRepairById(id: number, data: RepairDetails) {
    if (isNaN(id)) {
      logger.info({
        EDIT_REPAIR_BY_ID_REQUEST_ERROR: {
          message: `Invalid ID ${id}`,
        },
      });

      throw new ErrorHandler(STATUSCODE.BAD_REQUEST, "Invalid Request");
    }

    const allowedRepairEditFields = [
      "serial_number",
      "actual_problem",
      "unit_findings",
      "work_done",
      "date_returned",
      "date_repaired",
      "unit_status",
      "unit_remarks",
      "unit_category",
      "unit_id",
    ];

    //Extract keys from data object.
    const dataKeys = Object.keys(data || {});

    // Filters out any fields not listed in allowedRepairFields
    const filteredDataKeys = dataKeys.filter(
      (key) => !allowedRepairEditFields.includes(key)
    );

    /**
     * If there are any unknown fields in the request body, it will return a 422 Unprocessable Entity error.
     * This is to ensure that only allowed fields are updated.
     */
    if (filteredDataKeys.length > 0) {
      logger.info({
        EDIT_REPAIR_BY_ID_REQUEST_ERROR: {
          message: `Unknown ${
            filteredDataKeys.length == 1 ? "field" : "fields"
          } : ${filteredDataKeys.join(", ")}`,
        },
      });
      throw new ErrorHandler(
        STATUSCODE.UNPROCESSABLE_ENTITY,
        "Invalid Request"
      );
    }

    /**
     * Formatting the data object into a string that can be used to Update user details using SQL.
     * This will convert the object into a string of key-value pairs like "key1='value1', key2='value2'".
     * Using javascript's join method to concatenate the key-value pairs with a comma. example: "fname='John', lname='Doe'"
     */
    const formattedData = Object.entries(data || {})
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join(", ");

    /**
     * If the formattedData contains any SQL injection patterns,
     * it will throw an error with a 400 Bad Request status code.
     */
    const sqlInjectionPattern =
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b|\-\-|'|"|;|\bOR\b|\bAND\b)/i;

    if (sqlInjectionPattern.test(formattedData)) {
      logger.info({
        EDIT_REPAIR_BY_ID_REQUEST_ERROR: {
          message: "SQL_INJECTION_PATTERN_DETECTED",
        },
      });
      throw new ErrorHandler(STATUSCODE.BAD_REQUEST, "Invalid Request");
    }

    const result = await this.repairRepository.updateById(id, formattedData);

    return result?.affectedRows > 0
      ? "Repair details were updated successfully."
      : "No changes were detected; the record remains unchanged.";
  }

  async getRepairDetailsByDateRepaired(date_from: string, date_to: string) {
    const results = await this.repairRepository.getByDateRepaired(
      date_from,
      date_to
    );

    if (results.length == 0) {
      throw new ErrorHandler(STATUSCODE.NOT_FOUND, "Repair Details not found");
    }

    const repaired_units = results?.map((units) => {
      //v2
      return {
        ...units,
        date_returned: new Date(units.date_returned)
          .toISOString()
          .split("T")[0],
        date_repaired: new Date(units.date_repaired)
          .toISOString()
          .split("T")[0],
      };
    });

    return repaired_units;
  }
}
