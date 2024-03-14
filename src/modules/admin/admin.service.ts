import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { User } from '../user/database/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import UserDto from '../user/dtos/user.dto';
import { RoleEnum } from 'src/constants/enums/enum';
import { CreateRole, Role } from '../role/database/role.entity';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly adminRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private jwtService: JwtService,
  ) { }
  async create(admin: UserDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(admin.password, salt);
      admin.password = hashPassword;
      let findRole = await this.roleRepository.find();
      if (findRole.length == 0) {
        await this.roleRepository.save(CreateRole)
      }
      const role = await this.roleRepository.find({ where: { role_name: CreateRole[0].role_name } });

      const newAdmin = await this.adminRepository.save({ ...admin, role: [role[0]] });
      return {
        status: HttpStatus.OK,
        data: {
          admin: newAdmin,
          message: "Create new admin success"
        }
      };
    }
    catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          message: "Create new admin failed"
        }
      };
    }



  }
}
