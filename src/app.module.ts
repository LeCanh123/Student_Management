import { Module,NestModule,MiddlewareConsumer,RequestMethod  } from '@nestjs/common';
// import { AuthMiddleware } from './modules/middleware/auth.middleware'; 
// import { userRoleMiddleware } from './modules/middleware/user-role.middleware';
// import { adminRoleMiddleware } from './modules/middleware/admin-role.middleware';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import config from 'ormconfig';  
import { jwtConstants } from './constants/messeges/checkError';
import { CourseModule } from './modules/course/course.module';
import { RoleMiddlewareConfig } from './modules/middleware/role-config.middleware';
import { ClassModule } from './modules/class/class.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { StudentModule } from './modules/student/student.module';
import { MulterModule } from '@nestjs/platform-express';
import { Role } from './modules/role/database/role.entity';
import { AdminModule } from './modules/admin/admin.module';
import { ModuleCourseModule } from './modules/moduleCourse/module-course.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot(config),
    Role,
    UserModule,
    AdminModule, 
    ModuleCourseModule,
    TeacherModule,
    CourseModule,
    ClassModule,
    StudentModule,
    MulterModule.register({
      dest: './uploads',
    }),
    JwtModule.register({
      // global: true,
      secret: process.env.JWT_SECRET_KEY || jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule 

implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    RoleMiddlewareConfig.configure(consumer);
  }
}