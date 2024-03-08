"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("./src/modules/user/database/user.entity");
const course_entity_1 = require("./src/modules/course/database/course.entity");
require('dotenv').config();
const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;
const config = {
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    type: 'mysql',
    database: process.env.DB_NAME || 'TrainingManagement',
    entities: [user_entity_1.User, course_entity_1.Course],
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map