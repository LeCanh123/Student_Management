import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/messeges/checkError';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/database/user.entity';
import { Role } from '../role/database/role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User,Role]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY || jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        })
    ],
    controllers: [AdminController],
    providers: [AdminService, JwtService],
    exports: [AdminService],
})
export class AdminModule { }
