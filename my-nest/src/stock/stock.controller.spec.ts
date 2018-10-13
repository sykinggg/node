import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';

describe('Stock Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [StockController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: StockController = module.get<StockController>(StockController);
    expect(controller).toBeDefined();
  });
});
