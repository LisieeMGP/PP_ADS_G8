import { Inject, Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';
import { DATABASE_POOL } from '../database/database.constants.js';

export interface User extends RowDataPacket {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(@Inject(DATABASE_POOL) private readonly database: Pool) {}

  async findOne(username: string): Promise<User | undefined> {
    const [rows] = await this.database.query<User[]>(
      'SELECT id AS userId, email AS username, senha_hash AS password FROM usuarios WHERE email = ? LIMIT 1',
      [username],
    );
    return rows[0];
  }
}
