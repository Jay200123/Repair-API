import { STATUSCODE } from "../@constants";
import { ErrorHandler } from "./handlers";

/**
 * Validates an incoming data object by ensuring it contains only
 * explicitly allowed fields.
 *
 * This function acts as a defensive validation layer that prevents
 * clients from sending unexpected, unsupported, or potentially unsafe
 * properties in a request payload.
 *
 * It compares the keys of the provided `data` object against a whitelist
 * of allowed field names. If any extra or unknown fields are detected,
 * an error is thrown and request processing should be halted.
 *
 * This is typically used in service layers to enforce
 * strict input contracts, especially for create and update operations.
 *
 * @param fields - An array of allowed field names (whitelist)
 * @param data - The incoming request payload to validate
 *
 * @throws ErrorHandler
 * Thrown when one or more fields exist in `data` that are not included
 * in the `fields` whitelist. The error message will list the offending
 * field names.
 */
export const checkFields = (fields: string[], data: Record<string, any>) => {
  // Extract all keys from the incoming data object.
  // Example: { fname: "John" } → ["fname"]
  const dataFields = Object.keys(data);

  // Identify fields present in the data object that are NOT allowed
  // based on the provided `fields` whitelist.
  const unknownFields = dataFields.filter((field) => !fields.includes(field));

  // If any unknown fields are found, throw an error listing
  // the disallowed keys to prevent unexpected or unsafe input.
  if (unknownFields.length > 0) {
    throw new ErrorHandler(
      STATUSCODE.UNPROCESSABLE_ENTITY,
      `Unknown fields: ${unknownFields.join(", ")}`
    );
  }
};
