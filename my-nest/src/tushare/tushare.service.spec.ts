import { Test, TestingModule } from '@nestjs/testing';
import { TushareService } from './tushare.service';

describe('TushareService', () => {
  let service: TushareService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TushareService],
    }).compile();
    service = module.get<TushareService>(TushareService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
