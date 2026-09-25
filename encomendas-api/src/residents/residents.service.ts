import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DATABASE_POOL } from '../database/database.constants.js';

export interface Resident {
  id: number;
  name: string;
  block: string | null;
  unit: string;
}

@Injectable()
export class ResidentsService {
  constructor(@Inject(DATABASE_POOL) private readonly database: DataSource) {}

  async findAll(): Promise<Resident[]> {
    const result = (await this.database.query(
      'SELECT id, nome AS name, bloco AS block, unidade AS unit FROM moradores ORDER BY nome, unidade',
    )) as Resident[];
    return result;
  }

  async create(
    name: string,
    block: string | undefined,
    unit: string,
  ): Promise<Resident> {
    const result = (await this.database.query(
      `INSERT INTO moradores (nome, bloco, unidade) VALUES ($1, $2, $3)
       RETURNING id, nome AS name, bloco AS block, unidade AS unit`,
      [name.trim(), block?.trim() || null, unit.trim()],
    )) as Resident[];
    if (!result[0]) {
      throw new Error('Não foi possível criar o morador.');
    }
    return result[0];
  }
}
