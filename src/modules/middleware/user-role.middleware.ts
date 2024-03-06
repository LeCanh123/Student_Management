import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class userRoleMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try{
        const veryfy=await this.jwtService.verify(
        String(req.headers.access_token),{
        secret:process.env.SECRET_kEY
        })
        if(veryfy?.role==1){
          next();
        }else{
          res.status(HttpStatus.FORBIDDEN).json({
            error: "Forbidden",
            message: "You do not have permission to access this resource."
          });
        }
    }catch(error){
      res.status(HttpStatus.FORBIDDEN).json({
        error: "Forbidden",
        message: "You do not have permission to access this resource."
      });
    }
  }
}