import { Module } from '@nestjs/common';
import { WsController } from './ws.controller';
import { WsService } from './ws.service';
import { EventsGateway } from './ws.getaway';
import { PicModule } from '../pic/pic.module';
import { DatabaseModule } from '../data-base/dataBase.module';

@Module({
  imports: [DatabaseModule, PicModule],
  controllers: [WsController],
  providers: [WsService, EventsGateway],
})
export class WsModule {}
