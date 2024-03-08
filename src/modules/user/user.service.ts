import { Injectable ,HttpStatus} from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import UserDto from './dtos/user.dto';
import { RoleEnum } from 'src/constants/enums/enum';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async getAll() {
    const data = await this.userRepository.find();
    // console.log(data, 'data');
    return data;
  }

  async create(user:UserDto) {
    try{
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(user.password, salt);
      user.password = hashPassword;
      if(RoleEnum.USER==user.role){
        const newUser = await this.userRepository.save(user);
        return {
          status:HttpStatus.OK,
          data:{
            user:newUser,
            message:"Create new user success"
          }};
      }else{
        return {
          status:HttpStatus.BAD_REQUEST,
          data:{
            message:"Create new user failed"
        }};
      }
    }
    catch(error){
      return {
        status:HttpStatus.BAD_REQUEST,
        data:{
          message:"Create new user failed"
      }};
    }

    

  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const payload = {
          sub: user.id,
          username: user.username,
          email:user.email,
          role:user.role
        }
        const access_token=this.jwtService.sign(payload,
        {expiresIn:process.env.EXPIRESIN,secret:process.env.SECRET_kEY});

        return {
          status:HttpStatus.OK,
          data:{
            access_token,
            message:"Login success"
          }
        };
      }else{
        return {
          status:HttpStatus.NOT_FOUND,
          data:{
            error:"Unauthorized",
            message:"Invalid email or password"
          }
        };
      }
    }

    return {
      status:HttpStatus.NOT_FOUND,
      data:{
        error:"Unauthorized",
        message:"Invalid email or password"
      }
    };
  }
}
