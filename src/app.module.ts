import { Module,NestModule,MiddlewareConsumer,RequestMethod  } from '@nestjs/common';
import { AuthMiddleware } from './modules/middleware/auth.middleware'; 
import { userRoleMiddleware } from './modules/middleware/user-role.middleware';
import { adminRoleMiddleware } from './modules/middleware/admin-role.middleware';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import config from 'ormconfig';
import { jwtConstants } from './constants/messeges/checkError';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule,
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
    // consumer
    //   .apply(AuthMiddleware)
    //   .forRoutes('/user*');
    consumer
      .apply(userRoleMiddleware)
      .forRoutes('/user*');
    consumer
      .apply(adminRoleMiddleware)
      .forRoutes('/user*');
  }
}