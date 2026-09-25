import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DATABASE_POOL } from './database.constants.js';

@Module({
  providers: [
    {
      provide: DATABASE_POOL,
      useFactory: async (): Promise<DataSource> => {
        const dataSource = new DataSource({
          type: 'postgres',
          url: process.env.DATABASE_URL,
          host: process.env.DATABASE_URL
            ? undefined
            : (process.env.DB_HOST ?? 'localhost'),
          port: process.env.DATABASE_URL
            ? undefined
            : Number(process.env.DB_PORT ?? 5432),
          database: process.env.DATABASE_URL
            ? undefined
            : (process.env.DB_NAME ?? 'encomendas_db'),
          username: process.env.DATABASE_URL
            ? undefined
            : (process.env.DB_USER ?? 'encomendas'),
          password: process.env.DATABASE_URL
            ? undefined
            : (process.env.DB_PASSWORD ?? 'encomendas'),
          schema: 'public',
          synchronize: false,
          logging: false,
          entities: [],
          ssl:
            process.env.DB_SSL === 'true' ||
            process.env.DATABASE_URL?.includes('sslmode=require')
              ? { rejectUnauthorized: false }
              : undefined,
        });

        await dataSource.initialize();
        return dataSource;
      },
    },
  ],
  exports: [DATABASE_POOL],
})
export class DatabaseModule {}
