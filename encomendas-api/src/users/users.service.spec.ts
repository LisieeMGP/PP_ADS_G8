import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service.js';
import { DATABASE_POOL } from '../database/database.constants.js';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: DATABASE_POOL, useValue: {} }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
