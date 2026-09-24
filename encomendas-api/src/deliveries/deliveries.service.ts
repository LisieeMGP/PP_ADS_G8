import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Pool } from 'pg';
import { DATABASE_POOL } from '../database/database.constants.js';

export type DeliveryStatus = 'AGUARDANDO_RETIRADA' | 'RETIRADA';

export interface Delivery {
  id: number;
  residentId: number;
  residentName: string;
  block: string | null;
  unit: string;
  description: string;
  trackingCode: string | null;
  receivedAt: string;
  pickedUpAt: string | null;
  status: DeliveryStatus;
}

@Injectable()
export class DeliveriesService {
  constructor(@Inject(DATABASE_POOL) private readonly database: Pool) {}

  async findAll(search?: string, pendingOnly = false): Promise<Delivery[]> {
    const conditions: string[] = [];
    const values: unknown[] = [];
    if (search?.trim()) {
      conditions.push(
        '(m.nome ILIKE $1 OR m.unidade ILIKE $2 OR e.codigo_rastreio ILIKE $3)',
      );
      const term = `%${search.trim()}%`;
      values.push(term, term, term);
    }
    if (pendingOnly) conditions.push("e.status = 'AGUARDANDO_RETIRADA'");
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const result = await this.database.query<Delivery>(
      `SELECT e.id, e.morador_id AS "residentId", m.nome AS "residentName", m.bloco AS block,
        m.unidade AS unit, e.descricao AS description, e.codigo_rastreio AS "trackingCode",
        e.criado_em AS "receivedAt", e.data_retirada AS "pickedUpAt", e.status
       FROM encomendas e JOIN moradores m ON m.id = e.morador_id ${where}
       ORDER BY e.criado_em DESC`,
      values,
    );
    return result.rows;
  }

  async create(
    residentId: number,
    description: string,
    trackingCode: string | undefined,
    userId: number,
  ): Promise<Delivery> {
    if (!residentId || !description?.trim())
      throw new BadRequestException('Morador e descrição são obrigatórios.');
    const residents = await this.database.query<{ id: number }>(
      'SELECT id FROM moradores WHERE id = $1',
      [residentId],
    );
    if (!residents.rowCount)
      throw new NotFoundException('Morador não encontrado.');
    const result = await this.database.query<{ id: number }>(
      `INSERT INTO encomendas (usuario_id, morador_id, codigo_rastreio, status, descricao)
       VALUES ($1, $2, $3, 'AGUARDANDO_RETIRADA', $4)
       RETURNING id`,
      [userId, residentId, trackingCode?.trim() || null, description.trim()],
    );
    const deliveries = await this.findById(result.rows[0].id);
    return deliveries;
  }

  async pickup(id: number, userId: number): Promise<Delivery> {
    const result = await this.database.query(
      `UPDATE encomendas SET status = 'RETIRADA', data_retirada = CURRENT_TIMESTAMP,
        retirada_por = $1, atualizado_em = CURRENT_TIMESTAMP
       WHERE id = $2 AND status = 'AGUARDANDO_RETIRADA'`,
      [userId, id],
    );
    if (!result.rowCount) {
      const existing = await this.findById(id).catch(() => undefined);
      if (!existing) throw new NotFoundException('Encomenda não encontrada.');
      throw new ConflictException('A encomenda já foi retirada.');
    }
    return this.findById(id);
  }

  private async findById(id: number): Promise<Delivery> {
    const deliveries = await this.findAll();
    const delivery = deliveries.find((item) => item.id === id);
    if (!delivery) throw new NotFoundException('Encomenda não encontrada.');
    return delivery;
  }
}
