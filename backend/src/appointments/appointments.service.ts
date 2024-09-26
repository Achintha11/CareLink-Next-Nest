import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    return this.databaseService.appointment.create({
      data: createAppointmentDto,
    });
  }
}
