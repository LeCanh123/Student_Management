import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { teacherRoleMiddleware } from './teacher-role.middleware'; 
import { adminRoleMiddleware } from './admin-role.middleware';
import { SubAdminMiddleware } from './sub-admin-role.middleware';

@Module({})
export class RoleMiddlewareConfig {
  static configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SubAdminMiddleware)
      .forRoutes(
        // '/user/1'
        );
    consumer
      .apply(teacherRoleMiddleware)
      .forRoutes(
        { path: '/class*', method: RequestMethod.ALL},
        );

    consumer
      .apply(adminRoleMiddleware)
      .forRoutes( 
                  //user
                  { path: '/user', method: RequestMethod.ALL},
                  //

                  // { path: '/course*', method: RequestMethod.ALL},
                  // { path: '/course*', method: RequestMethod.PUT},
                  // { path: '/course*', method: RequestMethod.POST},
                  { path: '/teacher*', method: RequestMethod.ALL},
                  { path: '/student*', method: RequestMethod.ALL},
                  // { path: '/admin', method: RequestMethod.ALL }
                  
                  );
  }
}