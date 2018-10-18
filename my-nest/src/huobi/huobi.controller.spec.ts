import { Test, TestingModule } from '@nestjs/testing';
import { HuobiController } from './huobi.controller';

describe('Huobi Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [HuobiController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: HuobiController = module.get<HuobiController>(HuobiController);
    expect(controller).toBeDefined();
  });
});
