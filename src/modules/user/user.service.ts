import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import UserDto from './dtos/user.dto';
import { RoleEnum } from 'src/constants/enums/enum';
import { RoleName,CreateRole, Role } from '../role/database/role.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private jwtService: JwtService,
  ) { }
  async getAll() {
    const data = await this.userRepository.find({ relations: ['role'] });
    return data;
  }

  async create(user: UserDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(user.password, salt);
      user.password = hashPassword;
      let findRole = await this.roleRepository.find();
      if (findRole.length == 0) {
        await this.roleRepository.save(CreateRole)
      }
      const role = await this.roleRepository.find({ where: { role_name: CreateRole[2].role_name } });
      const newUser = await this.userRepository.save({
        ...user,
        role: [role[0]]
      });
      return {
        status: HttpStatus.OK,
        data: {
          user: newUser,
          message: "Create new user success"
        }
      };
    }
    catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          message: "Create new user failed"
        }
      };
    }
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({where:{email}, relations: ['role'] });
    console.log("user",user);
    
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const payload = {
          sub: user.id,
          username: user.username,
          email: user.email,
          role: user.role?.[0]?.role_name
        }
        const access_token = this.jwtService.sign(payload,
          { expiresIn: process.env.EXPIRESIN, secret: process.env.SECRET_kEY });

        return {
          status: HttpStatus.OK,
          data: {
            access_token,
            message: "Login success"
          }
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Unauthorized",
            message: "Invalid email or password"
          }
        };
      }
    }

    return {
      status: HttpStatus.NOT_FOUND,
      data: {
        error: "Unauthorized",
        message: "Invalid email or password"
      }
    };
  }
}
