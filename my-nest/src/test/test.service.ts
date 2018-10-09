import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
    get(req): any {
        console.log('------get------');
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
        let returnData = 'get';
        if (req.query) {
            returnData = req.query;
        }
        return returnData;
    }

    put(req): any {
        console.log('------put------');

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

        let returnData = 'put';

        if (req.body) {
            returnData = req.body;
        }

        return returnData;
    }

    delete(req): any {
        console.log('------delete------');

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

        let returnData = 'delete';

        if (req.query) {
            returnData = req.query;
        }

        return returnData;
    }

    post(req): any {
        console.log('------post------');

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

        let returnData = 'post';

        if (req.body) {
            returnData = req.body;
        }

        return returnData;
    }

    options(req): any {
        console.log('------options------');

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

        let returnData = 'options';

        if (req.body) {
            returnData = req.body;
        }

        return returnData;
    }

    patch(req): any {
        console.log('------patch------');

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

        let returnData = 'patch';

        if (req.body) {
            returnData = req.body;
        }

        return returnData;
    }

    head(req): any {
        console.log('------head------');

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

        return 'head';
    }

    all(req): any {
        console.log('------all------');

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

        return 'all';
    }
}
