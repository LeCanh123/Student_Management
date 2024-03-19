import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RoleName } from '../role/database/role.entity';
@Injectable()
export class SubAdminMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    ) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const token = req.headers.authorization.slice(7);
        const veryfy=this.jwtService.verify(
          token,{
          secret:process.env.SECRET_kEY
          })
          if(veryfy.role==RoleName.ADMIN||veryfy.role==RoleName.SUB_ADMIN){
            next();
          }else{
            res.status(HttpStatus.FORBIDDEN).json({
              error: "Forbidden",
              message: "You do not have permission to access this resource."
            });
          }
      }
      else {
      res.status(HttpStatus.FORBIDDEN).json({
        error: "Forbidden",
        message: "You do not have permission to access this resource."
      });
    }

    
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        error: "Unauthorized",
        message: "Invalid access token"
      });
    }
  }
}