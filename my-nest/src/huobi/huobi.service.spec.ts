import { Test, TestingModule } from '@nestjs/testing';
import { HuobiService } from './huobi.service';

describe('HuobiService', () => {
  let service: HuobiService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HuobiService],
    }).compile();
    service = module.get<HuobiService>(HuobiService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
