import { Test, TestingModule } from '@nestjs/testing';
import { MapService } from './map.service';

describe('MapService', () => {
  let service: MapService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapService],
    }).compile();
    service = module.get<MapService>(MapService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
