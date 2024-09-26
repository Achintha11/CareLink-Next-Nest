import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    console.log('Registering user with data:', createUserDto);
    return this.userService.createUser(createUserDto);
  }
}
