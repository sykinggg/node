import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { DatabaseModule } from './data-base/dataBase.module';
import { CatsModule } from './cats/cats.module';
import { PicModule } from './pic/pic.module';
import { WsModule } from './ws/ws.module';
import { StockModule } from './stock/stock.module';

@Module({
    imports: [
        TestModule,
        DatabaseModule,
        CatsModule,
        PicModule,
        WsModule,
        StockModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

// export class AppModule implements NestModule {
//     configure(consumer: any): any {
//         consumer.apply([CorsMiddleware]).forRoutes({ path: '*', method: RequestMethod.ALL });
//     }
// }
