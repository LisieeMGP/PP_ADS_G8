import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'pg';
import { DATABASE_POOL } from '../database/database.constants.js';

export interface Resident {
  id: number;
  name: string;
  block: string | null;
  unit: string;
}

@Injectable()
export class ResidentsService {
  constructor(@Inject(DATABASE_POOL) private readonly database: Pool) {}

  async findAll(): Promise<Resident[]> {
    const result = await this.database.query<Resident>(
      'SELECT id, nome AS name, bloco AS block, unidade AS unit FROM moradores ORDER BY nome, unidade',
    );
    return result.rows;
  }

  async create(
    name: string,
    block: string | undefined,
    unit: string,
  ): Promise<Resident> {
    const result = await this.database.query<Resident>(
      `INSERT INTO moradores (nome, bloco, unidade) VALUES ($1, $2, $3)
       RETURNING id, nome AS name, bloco AS block, unidade AS unit`,
      [name.trim(), block?.trim() || null, unit.trim()],
    );
    return result.rows[0];
  }
}
