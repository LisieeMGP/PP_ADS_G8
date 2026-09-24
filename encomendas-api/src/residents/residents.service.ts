import { Inject, Injectable } from '@nestjs/common';
import type { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { DATABASE_POOL } from '../database/database.constants.js';

export interface Resident extends RowDataPacket {
  id: number;
  name: string;
  block: string | null;
  unit: string;
}

@Injectable()
export class ResidentsService {
  constructor(@Inject(DATABASE_POOL) private readonly database: Pool) {}

  async findAll(): Promise<Resident[]> {
    const [rows] = await this.database.query<Resident[]>(
      'SELECT id, nome AS name, bloco AS block, unidade AS unit FROM moradores ORDER BY nome, unidade',
    );
    return rows;
  }

  async create(name: string, block: string | undefined, unit: string): Promise<Resident> {
    const [result] = await this.database.execute<ResultSetHeader>(
      'INSERT INTO moradores (nome, bloco, unidade) VALUES (?, ?, ?)',
      [name.trim(), block?.trim() || null, unit.trim()],
    );
    const [rows] = await this.database.query<Resident[]>(
      'SELECT id, nome AS name, bloco AS block, unidade AS unit FROM moradores WHERE id = ?',
      [result.insertId],
    );
    return rows[0];
  }
}