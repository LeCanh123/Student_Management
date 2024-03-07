import { Injectable ,HttpStatus} from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { User } from '../user/database/user.entity'; 
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import UserDto from '../user/dtos/user.dto';
import { RoleEnum } from 'src/constants/enums/enum';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly adminRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async create(admin:UserDto) {
    try{
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(admin.password, salt);
      admin.password = hashPassword;
      if(RoleEnum.ADMIN==admin.role){
        const newAdmin = await this.adminRepository.save(admin);
        return {
          status:HttpStatus.OK,
          data:{
            admin:newAdmin,
            message:"Create new admin success"
          }};
      }else{
        return {
          status:HttpStatus.BAD_REQUEST,
          data:{
            message:"Create new admin failed"
        }};
      }
    }
    catch(error){
      return {
        status:HttpStatus.BAD_REQUEST,
        data:{
          message:"Create new admin failed"
      }};
    }

    

  }
}
