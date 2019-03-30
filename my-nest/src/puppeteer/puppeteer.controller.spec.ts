import { Test, TestingModule } from '@nestjs/testing';
import { PuppeteerController } from './puppeteer.controller';

describe('Puppeteer Controller', () => {
  let controller: PuppeteerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuppeteerController],
    }).compile();

    controller = module.get<PuppeteerController>(PuppeteerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
