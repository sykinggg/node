import { Test, TestingModule } from '@nestjs/testing';
import { WsController } from './ws.controller';

describe('Ws Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [WsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: WsController = module.get<WsController>(WsController);
    expect(controller).toBeDefined();
  });
});
