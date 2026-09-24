import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { DATABASE_POOL } from './database.constants.js';

@Module({
  providers: [
    {
      provide: DATABASE_POOL,
      useFactory: (): Pool =>
        new Pool({
          connectionString: process.env.DATABASE_URL,
          host: process.env.DATABASE_URL
            ? undefined
            : (process.env.DB_HOST ?? 'localhost'),
          port: process.env.DATABASE_URL
            ? undefined
            : Number(process.env.DB_PORT ?? 5432),
          database: process.env.DATABASE_URL
            ? undefined
            : (process.env.DB_NAME ?? 'encomendas_db'),
          user: process.env.DATABASE_URL
            ? undefined
            : (process.env.DB_USER ?? 'encomendas'),
          password: process.env.DATABASE_URL
            ? undefined
            : (process.env.DB_PASSWORD ?? 'encomendas'),
          max: Number(process.env.DB_POOL_MAX ?? 10),
          idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS ?? 10000),
          connectionTimeoutMillis: Number(
            process.env.DB_CONNECTION_TIMEOUT_MS ?? 5000,
          ),
          ssl:
            process.env.DB_SSL === 'true'
              ? { rejectUnauthorized: false }
              : undefined,
        }),
    },
  ],
  exports: [DATABASE_POOL],
})
export class DatabaseModule {}
