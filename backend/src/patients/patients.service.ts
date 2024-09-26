import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PatientsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPatientDto: CreatePatientDto) {
    console.log('createPatientDto', createPatientDto);
    return this.databaseService.patient.create({
      data: createPatientDto,
    });
  }
}
