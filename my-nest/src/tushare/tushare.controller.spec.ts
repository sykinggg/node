import { Test, TestingModule } from '@nestjs/testing';
import { TushareController } from './tushare.controller';

describe('Tushare Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TushareController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TushareController = module.get<TushareController>(TushareController);
    expect(controller).toBeDefined();
  });
});
