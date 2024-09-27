import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.databaseService.user.create({
      data: createUserDto,
    });
  }

  async getSingleUser(userId: string): Promise<User> {
    const user = await this.databaseService.user.findUnique({
      where: { id: userId }, // Adjust according to your unique identifier field
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }
}
