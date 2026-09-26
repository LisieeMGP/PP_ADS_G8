import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DATABASE_POOL } from '../database/database.constants.js';

export interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(@Inject(DATABASE_POOL) private readonly database: DataSource) {}

  async findOne(username: string): Promise<User | undefined> {
    console.log('UsersService.findOne called with username:', username);
    const result = (await this.database.query(
      'SELECT id AS "userId", email AS username, senha_hash AS password FROM usuarios WHERE email = $1 LIMIT 1',
      [username],
    )) as User[];
    console.log('Database query result:', result);
    return result[0] ?? undefined;
  }
}
