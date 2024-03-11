/* eslint-disable @typescript-eslint/no-var-requires */
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
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
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  migrationsRun: true,

  // synchronize: true,
  // dropSchema: true, 

  namingStrategy: new SnakeNamingStrategy(),
  migrationsTransactionMode:"all",
}; 

export default config; 
