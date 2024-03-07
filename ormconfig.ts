/* eslint-disable @typescript-eslint/no-var-requires */
import { User } from 'src/modules/user/database/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Course } from 'src/modules/course/database/course.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const SnakeNamingStrategy =
  require('typeorm-naming-strategies').SnakeNamingStrategy;
const config: MysqlConnectionOptions = {
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  type: 'mysql',
  database: process.env.DB_NAME || 'TrainingManagement',
  entities: [User,Course],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export default config;
