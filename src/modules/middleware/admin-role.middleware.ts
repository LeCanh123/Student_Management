import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class adminRoleMiddleware implements NestMiddleware {
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
        console.log("veryfy",veryfy);
        if(veryfy){
          next();
        }
    }catch(error){
      res.status(HttpStatus.UNAUTHORIZED).json({
        error: "Unauthorized",
        message: "Invalid access token"
      });
    }
  }
}