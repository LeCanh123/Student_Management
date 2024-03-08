import { Module,NestModule,MiddlewareConsumer,RequestMethod  } from '@nestjs/common';
import { AuthMiddleware } from './modules/middleware/auth.middleware'; 
import { userRoleMiddleware } from './modules/middleware/user-role.middleware';
import { adminRoleMiddleware } from './modules/middleware/admin-role.middleware';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import config from 'ormconfig';  
import { jwtConstants } from './constants/messeges/checkError';
import { AdminModule } from './modules/admin/admin.module';
import { CourseModule } from './modules/course/course.module';
import { RoleMiddlewareConfig } from './modules/middleware/role-config.middleware';
import { ClassModule } from './modules/class/class.module';

@Module({
  imports: [TypeOrmModule.forRoot(config),
    AdminModule, 
    UserModule,
    CourseModule,
    ClassModule,
    JwtModule.register({
      // global: true,
      secret: process.env.JWT_SECRET_KEY || jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    RoleMiddlewareConfig.configure(consumer);
  }
}