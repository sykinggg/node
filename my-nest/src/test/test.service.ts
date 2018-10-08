import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
    root(req): any {
        console.log('----req.session----');
        console.log(req.session);
        console.log('----req.params----');
        console.log(req.params);
        console.log('----req.body----');
        console.log(req.body);
        console.log('----req.query----');
        console.log(req.query);
        console.log('----req.headers----');
        console.log(req.headers);
        return [];
    }
}
