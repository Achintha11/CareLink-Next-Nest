import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    return this.databaseService.appointment.create({
      data: createAppointmentDto,
    });
  }

  async findAll() {
    return this.databaseService.appointment.findMany();
  }

  async updateAppointment(
    appointmentId: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.databaseService.appointment.update({
      where: { id: appointmentId },
      data: updateAppointmentDto,
    });
  }
}
