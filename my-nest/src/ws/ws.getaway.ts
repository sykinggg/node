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
        const a = new BehaviorSubject(false);
        this.picService.get5aavPic('5aav').then(res => {
            console.log(res);
            a.next(res);
        });
        return a.pipe(map(item => {
            console.log(item);
            return { event: 'events', data: a};
        }));
    }
}