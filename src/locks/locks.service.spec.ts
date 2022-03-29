import { Test, TestingModule } from '@nestjs/testing';
import { LockService } from './locks.service';

describe('LocksService', () => {
  let service: LockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LockService],
    }).compile();

    service = module.get<LockService>(LockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
