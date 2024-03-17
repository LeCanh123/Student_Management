import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Not, Repository, getManager  } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import UserDto from './dtos/user.dto';
import { RoleEnum } from 'src/constants/enums/enum';
import { RoleName,CreateRole, Role } from '../role/database/role.entity';
import UpdateUserDto from './dtos/update-user.dto';
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
      let findUserRole=await this.roleRepository.find({ where: { role_name: RoleName[user.role] } });
      const role = await this.roleRepository.find({ where: { role_name: CreateRole[2].role_name } });
      const newUser = await this.userRepository.save({
        ...user,
        role: findUserRole?findUserRole:[role[0]]
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
      console.log("error",error);
      
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

  async update(data:any,id:number): Promise<any> {
    console.log("data",data);
    
    try{
      data.avatar=data.avatar?data.avatar?.name:null;
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(data.password, salt);
      data.password = hashPassword;
      let findUserUpdate=await this.userRepository.findOne({where:{id}})
      if(!findUserUpdate){
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "User with offer ID not found."
          }
        };
      }
      let checkEmail=await this.userRepository.find({where:{id: Not(id),email:data.email}})
      if(checkEmail.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "Email already exists"
          }
        };
      }
      let checkUserName=await this.userRepository.find({where:{id: Not(id),username:data.username}})
      if(checkUserName.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "UserName already exists"
          }
        };
      }
      let checkPhone=await this.userRepository.find({where:{id: Not(id),phone:data.phone}})
      if(checkPhone.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "Phone number already exists"
          }
        };
      }
      const userUpdate = await this.userRepository.update(id,{
        username:data.username,
        email:data.email,
        fullname:data.fullname,
        password:data.password,
        phone:data.phone,
        avatar:data.avatar,
      });

      if(userUpdate){
        const { role } = data;
        const existingRole = await this.roleRepository.findOne({ where: { role_name: role } });
        const originalRole = await this.userRepository.find({where:{id}, relations: ['role'] });
        if (!existingRole) {
        }else{
          if(originalRole?.[0]?.role?.[0]?.role_name==RoleName.ADMIN){
            if(originalRole.length<2){
              return {
                status: HttpStatus.OK,
                data: {
                  message: "Update user success"
                }
              }
            }
          }
            let removeUserRole=await this.userRepository.createQueryBuilder()
            .relation(User, 'role')
            .of(id)
            .remove(originalRole?.[0]?.role?.[0]?.id);

            let updateUserRole=await this.userRepository.createQueryBuilder()
            .relation(User, 'role')
            .of(id)
            .add(existingRole.id);
        }
      }
      return {
        status: HttpStatus.OK,
        data: {
          user:userUpdate,
          message: "Update user success"
        }
      }
    }
    catch(error){
      console.log("error",error);
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          message: "Update user failed"
        }
      };
    }

  }
}
