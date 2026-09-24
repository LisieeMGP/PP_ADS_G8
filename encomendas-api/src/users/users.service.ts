import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'pg';
import { DATABASE_POOL } from '../database/database.constants.js';

export interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(@Inject(DATABASE_POOL) private readonly database: Pool) {}

  async findOne(username: string): Promise<User | undefined> {
    const result = await this.database.query<User>(
      'SELECT id AS "userId", email AS username, senha_hash AS password FROM usuarios WHERE email = $1 LIMIT 1',
      [username],
    );
    return result.rows[0];
  }
}
