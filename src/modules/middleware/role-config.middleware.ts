import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { userRoleMiddleware } from './user-role.middleware'; 
import { adminRoleMiddleware } from './admin-role.middleware';
import { AuthMiddleware } from './auth.middleware';

@Module({})
export class RoleMiddlewareConfig {
  static configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/user/1');
    consumer
      .apply(userRoleMiddleware)
      .forRoutes('/user/1');

    consumer
      .apply(adminRoleMiddleware)
      .forRoutes( 
                  { path: '/course*', method: RequestMethod.PUT},
                  { path: '/course*', method: RequestMethod.POST},
                  { path: '/teacher*', method: RequestMethod.ALL},
                  { path: '/student*', method: RequestMethod.ALL},
                  { path: '/admin/1', method: RequestMethod.ALL }
                  
                  );
  }
}