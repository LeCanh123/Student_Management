import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { User } from '../user/database/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import UserDto from '../user/dtos/user.dto';
import { RoleEnum } from 'src/constants/enums/enum';
import { CreateRole, Role ,RoleName} from '../role/database/role.entity';
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
    console.log("admin",admin);
    
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(admin.password, salt);
      admin.password = hashPassword;
      let findRole = await this.roleRepository.find();
      if (findRole.length == 0) {
        await this.roleRepository.save(CreateRole)
      }
      //check mail
      let checkEmail=await this.adminRepository.find({where:{email:admin.email}})
      if(checkEmail.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "Email already exists"
          }
        };
      }
      //check username
      let checkUserName=await this.adminRepository.find({where:{username:admin.username}})
      if(checkUserName.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "UserName already exists"
          }
        };
      }
      //check phone
      let checkPhone=await this.adminRepository.find({where:{phone:admin.phone}})
      if(checkPhone.length>0){
        console.log("checkPhone",checkPhone);
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "Phone number already exists"
          }
        }; 
      }
      const role = await this.roleRepository.find({ where: { role_name: RoleName[admin.role] } });

      const newAdmin = await this.adminRepository.save({ ...admin, role: [role[0]] });
      return {
        status: HttpStatus.OK,
        data: {
          admin: newAdmin,
          message: "Create new user success"
        } 
      };
    }
    catch (error) {
      console.log("error",error);
      
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          message: "Create new user failed"
        }
      };
    }



  }
}
