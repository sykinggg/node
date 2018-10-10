import { Test, TestingModule } from '@nestjs/testing';
import { PicController } from './pic.controller';

describe('Pic Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PicController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PicController = module.get<PicController>(PicController);
    expect(controller).toBeDefined();
  });
});
