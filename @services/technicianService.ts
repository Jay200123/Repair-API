import { TechnicianRepository } from "../@repositories";

export class TechnicianService {
  constructor(private technicianRepository: TechnicianRepository) {}

  async getAllTechnicians() {
    const results = await this.technicianRepository.getAll();

    return results;
  }
}
