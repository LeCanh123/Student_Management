import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/messeges/checkError';
import { Role } from '../role/database/role.entity';
require('dotenv').config();
@Module({
  imports: [TypeOrmModule.forFeature([User,Role]),
  JwtModule.register({
    secret: process.env.JWT_SECRET_KEY || jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UserService],
})
export class UserModule {}
