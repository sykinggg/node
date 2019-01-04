import { Test, TestingModule } from '@nestjs/testing';
import { MusicController } from './music.controller';

describe('Music Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MusicController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MusicController = module.get<MusicController>(MusicController);
    expect(controller).toBeDefined();
  });
});
