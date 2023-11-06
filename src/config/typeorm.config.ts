import { config } from 'dotenv'
config()
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    password: process.env.PG_PASSWORD,
    username: process.env.PG_USERNAME,
    database: process.env.PG_DB_NAME,
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    logging: true,
};

export default typeOrmConfig;