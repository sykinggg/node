import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { PicService } from 'pic/pic.service';
import { from, Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway(8080)
export class EventsGateway {
    constructor(private readonly picService: PicService) { }

    @WebSocketServer() server;

    @SubscribeMessage('events')
    onEvent(client, data): Observable<WsResponse<any>> {
        console.log(data);
        const a: BehaviorSubject<any[]> = new BehaviorSubject([]);
        this.picService.getPic('5aav');
        this.picService.getChangeData().subscribe(res => {
            if (res) {
                this.picService.getPic('5aav').then((calldata: any) => {
                    a.next(calldata);
                });
            }
        });
        return a.pipe(map(item => {
            console.log(item);
            return { event: 'events', data: item };
        }));
    }

    @SubscribeMessage('stock')
    onStock(client, data): Observable<WsResponse<any>> {
        return of({ event: 'stock', data: [] });
    }
}