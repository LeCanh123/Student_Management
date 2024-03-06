import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    ) {}

  use(req: Request, res: Response, next: NextFunction) {
    // console.log("header",req.headers);
    try{
        const veryfy=this.jwtService.verify(
        String(req.headers.access_token),{
        secret:process.env.SECRET_kEY
        })
        if(veryfy?.role==0){
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