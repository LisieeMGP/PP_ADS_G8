import { Module } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';
import { DATABASE_POOL } from './database.constants.js';

@Module({
  providers: [
    {
      provide: DATABASE_POOL,
      useFactory: (): Pool => createPool({
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 3306),
        database: process.env.DB_NAME ?? 'encomendas_db',
        user: process.env.DB_USER ?? 'encomendas',
        password: process.env.DB_PASSWORD ?? 'encomendas',
        connectionLimit: 10,
      }),
    },
  ],
  exports: [DATABASE_POOL],
})
export class DatabaseModule {}