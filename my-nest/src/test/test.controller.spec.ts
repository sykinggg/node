import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';

describe('Test Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TestController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TestController = module.get<TestController>(TestController);
    expect(controller).toBeDefined();
  });
});
