import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class MapService {
    constructor(
        private readonly httpService: HttpService,
    ) { }

    private mapApiKey = '578a028ad79863e87bcc2e9b6f2d9e36';

    /**
     * 地理编码
     */
    private reverseGeocodingUrl = 'https://restapi.amap.com/v3/geocode/geo';
    async reverseGeocoding(body) {
        let url = this.reverseGeocodingUrl;
        url += '?key=' + this.mapApiKey;
        // 结构化地址信息
        url += '&address=' + (body.address || '北京市朝阳区阜通东大街6号');
        // 指定查询的城市
        url += '&city=' + (body.city || '');
        // 批量查询控制
        url += '&batch=' + (body.batch || false);
        // 返回数据格式类型
        url += '&output=' + (body.output || 'JSON');
        url = encodeURI(url);
        return this.httpService.get(url).pipe(map((resp: any) => {
            return resp.data;
        }));
    }

    /**
     * 逆地理编码
     */
    private reverseRegeocodingUrl = 'https://restapi.amap.com/v3/geocode/regeo';
    async reverseRegeocoding(body) {
        let url = this.reverseRegeocodingUrl;
        url += '?key=' + this.mapApiKey;
        // 经纬度坐标
        url += '&location=' + (body.location || '116.310003,39.991957');
        // 返回附近POI类型
        url += '&poitype=' + body.poitype;
        // 搜索半径
        url += '&radius=' + (body.radius || '1000');
        // 返回结果控制
        url += '&extensions=' + (body.extensions || 'all');
        // 批量查询控制
        url += '&batch=' + body.batch;
        // 道路等级
        url += '&roadlevel=' + body.roadlevel;
        // 返回数据格式类型
        url += '&output=' + (body.output || 'JSON');
        // 是否优化POI返回顺序
        url += '&homeorcorp=' + (body.homeorcorp || 0);
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 步行路径规划
     */
    private directionWalkingUrl = 'https://restapi.amap.com/v3/direction/walking';
    async directionWalking(body) {
        let url = this.directionWalkingUrl;
        url += '?key=' + this.mapApiKey;
        // 出发点
        url += '&origin=' + (body.origin || '116.434307,39.90909');
        // 目的地
        url += '&destination=' + (body.destination || '116.434446,39.90816');
        // 返回数据格式类型
        url += '&output=' + (body.output || 'JSON');
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 公交路径规划
     */
    private directionTransitIntegratedUrl = 'https://restapi.amap.com/v3/direction/transit/integrated';
    async directionTransitIntegrated(body) {
        let url = this.directionTransitIntegratedUrl;
        url += '?key=' + this.mapApiKey;
        // 出发点
        url += '&origin=' + (body.origin || '116.481028,39.989643');
        // 目的地
        url += '&destination=' + (body.destination || '116.434446,39.90816');
        // 城市/跨城规划时的起点城市
        url += '&city=' + (body.city || '北京');
        // 跨城公交规划时的终点城市
        url += '&cityd=' + (body.cityd || '北京');
        // 返回结果详略
        url += '&extensions=' + body.extensions;
        // 公交换乘策略
        url += '&strategy=' + (body.strategy || 0);
        // 是否计算夜班车
        url += '&nightflag=' + (body.nightflag || 0);
        // 出发日期
        url += '&date=' + (body.date || '2014-3-19');
        // 出发时间
        url += '&time=' + (body.time || '22:34');
        // 返回数据格式类型
        url += '&output=' + (body.output || 'JSON');
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 驾车路径规划
     */
    private directionDrivingUrl = 'https://restapi.amap.com/v3/direction/driving';
    async directionDriving(body) {
        let url = this.directionDrivingUrl;
        url += '?key=' + this.mapApiKey;
        // 出发点
        url += '&origin=' + (body.origin || '116.481028,39.989643');
        // 目的地
        url += '&destination=' + (body.destination || '116.465302,40.004717');
        // 返回结果详略
        url += '&extensions=' + (body.extensions || 'all');
        // 出发点poiid
        url += '&originid=' + body.originid;
        // 目的地poiid
        url += '&destinationid=' + body.destinationid;
        // 起点的poi类别
        url += '&origintype=' + body.origintype;
        // 终点的poi类别
        url += '&destinationtype=' + body.destinationtype;
        // 驾车选择策略
        url += '&strategy=' + body.strategy;
        // 途经点
        url += '&waypoints=' + body.waypoints;
        // 避让区域
        url += '&avoidpolygons=' + body.avoidpolygons;
        // 避让道路名
        url += '&avoidroad=' + body.avoidroad;
        // 用汉字填入车牌省份缩写，用于判断是否限行
        url += '&province=' + body.province;
        // 填入除省份及标点之外，车牌的字母和数字（需大写）。用于判断限行相关。
        url += '&number=' + body.number;
        // 车辆类型
        url += '&cartype=' + body.cartype;
        // 在路径规划中，是否使用轮渡
        url += '&ferry=' + body.ferry;
        // 返回数据格式类型
        url += '&output=' + (body.output || 'JSON');
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 骑行路径规划
     */
    private directionBicyclingUrl = 'https://restapi.amap.com/v4/direction/bicycling';
    async directionBicycling(body) {
        let url = this.directionBicyclingUrl;
        url += '?key=' + this.mapApiKey;
        // 出发点经纬度
        url += '&origin=' + (body.origin || '116.434307,39.90909');
        // 目的地经纬度
        url += '&destination=' + (body.destination || '116.434307,39.90909');
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 货车路径规划
     */
    private directionTruckUrl = 'https://restapi.amap.com/v4/direction/truck';
    async directionTruck(body) {
        let url = this.directionTruckUrl;
        url += '?key=' + this.mapApiKey;
        // 出发点经纬度
        url += '&origin=' + (body.origin || '116.481008,39.989625');
        // 出发POI的唯一编号
        url += '&originid=' + body.originid;
        // 出发POI的类型
        url += '&originidtype=' + body.originidtype;
        // 目的地经纬度
        url += '&destination=' + (body.destination || '116.414217,40.061741');
        // 终点POI的唯一编号
        url += '&destinationid=' + body.destinationid;
        // 终点POI的类型
        url += '&destinationtype=' + body.destinationtype;
        // 设备唯一编号
        url += '&diu=' + body.diu;
        // 驾车选择策略
        url += '&strategy=' + (body.strategy || 5);
        // 途经点
        url += '&waypoints=' + (body.waypoints || '');
        // 车辆大小
        url += '&size=' + (body.size || 2);
        // 车辆高度
        url += '&height=' + (body.height || 1.6);
        // 车辆宽度
        url += '&width=' + (body.width || 2.5);
        // 车辆总重
        url += '&load=' + (body.load || 0.9);
        // 货车核定载重
        url += '&weight=' + (body.weight || 10);
        // 车辆轴数
        url += '&axis=' + (body.axis || 2);
        // 车牌省份
        url += '&province=' + body.province;
        // 车牌详情
        url += '&number=' + body.number;
        // 车辆类型
        url += '&cartype=' + body.cartype;
        // 避让区域
        url += '&avoidpolygons=' + (body.avoidpolygons || '');
        // 是否返回路线数据
        url += '&showpolyline=' + body.showpolyline;
        url = encodeURI(url);
        console.log(url);
        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 距离测量
     */
    private distanceUrl = 'https://restapi.amap.com/v3/distance';
    async distance(body) {
        let url = this.distanceUrl;
        url += '?key=' + this.mapApiKey;
        // 出发点
        url += '&origins=' + (body.origins || '116.481028,39.989643|114.481028,39.989643|115.481028,39.989643');
        // 目的地
        url += '&destination=' + (body.destination || '114.465302,40.004717');
        // 路径计算的方式和方法
        url += '&type=' + (body.type || 1);
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 行政区域查询
     */
    private configDistrictUrl = 'https://restapi.amap.com/v3/config/district';
    async configDistrict(body) {
        let url = this.configDistrictUrl;
        url += '?key=' + this.mapApiKey;
        // 查询关键字
        url += '&keywords=' + (body.keywords || '北京');
        // 子级行政区 0：不返回下级行政区； 1：返回下一级行政区； 2：返回下两级行政区； 3：返回下三级行政区；
        url += '&subdistrict=' + (body.subdistrict || 2);
        // 需要第几页数据
        url += '&page=' + body.page;
        // 最外层返回数据个数
        url += '&offset=' + body.offset;
        // 返回结果控制
        url += '&extensions=' + (body.extensions || 'all');
        // 根据区划过滤
        url += '&filter=' + body.filter;
        // 返回数据格式类型
        url += '&output=' + (body.output || 'JSON');
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 关键字搜索
     */
    private placeTextUrl = 'https://restapi.amap.com/v3/place/text';
    async placeText(body) {
        let url = this.placeTextUrl;
        url += '?key=' + this.mapApiKey;
        // 查询关键字
        url += '&keywords=' + (body.keywords || '北京大学');
        // 查询POI类型
        url += '&types=' + (body.types || '高等院校');
        // 查询城市
        url += '&city=' + (body.city || '北京');
        // 仅返回指定城市数据
        url += '&citylimit=' + body.citylimit;
        // 是否按照层级展示子POI数据
        url += '&children=' + (body.children || 1);
        // 每页记录数据
        url += '&offset=' + (body.offset || 20);
        // 当前页数
        url += '&page=' + (body.page || 1);
        // 建筑物的POI编号
        url += '&building=' + body.building;
        // 搜索楼层
        url += '&floor=' + body.floor;
        // 返回结果控制
        url += '&extensions=' + (body.extensions || 'all');
        // 返回数据格式类型
        url += '&output=' + body.output;
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 周边搜索
     */
    private placeAroundUrl = 'https://restapi.amap.com/v3/place/around';
    async placeAround(body) {
        let url = this.placeAroundUrl;
        url += '?key=' + this.mapApiKey;
        // 中心点坐标
        url += '&location=' + (body.location || '116.473168,39.993015');
        // 查询关键字
        url += '&keywords=' + (body.keywords || '');
        // 查询POI类型
        url += '&types=' + (body.types || '011100');
        // 查询城市
        url += '&city=' + (body.city || '');
        // 查询半径
        url += '&radius=' + (body.radius || 1000);
        // 排序规则
        url += '&sortrule=' + body.sortrule;
        // 每页记录数据
        url += '&offset=' + (body.offset || 20);
        // 当前页数
        url += '&page=' + (body.page || 1);
        // 返回结果控制
        url += '&extensions=' + (body.extensions || 'all');
        // 返回数据格式类型
        url += '&output=' + (body.output || 'JSON');
        url = encodeURI(url);
        console.log(url);
        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 多边形搜索
     */
    private placePolygonUrl = 'https://restapi.amap.com/v3/place/polygon';
    async placePolygon(body) {
        let url = this.placePolygonUrl;
        let defaultPolygon = '116.460988,40.006919|116.48231,40.007381;116.47516,39.99713';
        defaultPolygon += '|116.472596,39.985227|116.45669,39.984989|116.460988,40.006919';
        url += '?key=' + this.mapApiKey;
        // 经纬度坐标对
        url += '&polygon=' + (body.polygon || defaultPolygon);
        // 查询关键字
        url += '&keywords=' + (body.keywords || '肯德基');
        // 查询POI类型
        url += '&types=' + (body.types || '050301');
        // 每页记录数据
        url += '&offset=' + (body.offset || '20');
        // 当前页数
        url += '&page=' + (body.page || '1');
        // 返回结果控制
        url += '&extensions=' + (body.extensions || 'all');
        // 返回数据格式类型
        url += '&output=' + (body.output || 'JSON');
        url = encodeURI(url);
        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * ID查询
     */
    private placeDetailUrl = 'https://restapi.amap.com/v3/place/detail';
    async placeDetail(body) {
        let url = this.placeDetailUrl;
        url += '?key=' + this.mapApiKey;
        // 兴趣点ID
        url += '&id=' + (body.id || 'B0FFFAB6J2');
        // 返回数据格式类型
        url += '&output=' + (body.output || 'JSON');
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * IP定位
     */
    private v3IpUrl = 'https://restapi.amap.com/v3/ip';
    async v3Ip(body) {
        let url = this.v3IpUrl;
        url += '?key=' + this.mapApiKey;
        // ip地址
        url += '&ip=' + (body.ip || '114.247.50.2');
        // 返回格式
        url += '&output=' + (body.output || 'JSON');
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 静态地图
     */
    private v3StaticmapUrl = 'https://restapi.amap.com/v3/staticmap';
    public v3Staticmap(body) {
        let url = this.v3StaticmapUrl;
        url += '?key=' + this.mapApiKey;
        // 地图中心点
        url += '&location=' + (body.location || '116.481485,39.990464');
        // 地图级别
        url += '&zoom=' + (body.zoom || '14');
        // 地图大小
        url += '&size=' + (body.size || '400*400');
        // 普通/高清
        url += '&scale=' + (body.scale || '2');
        // 标注
        url += '&markers=' + (body.markers || 'mid,,A:116.481485,39.990464');
        // 标签
        url += body.labels ? ('&labels=' + body.labels) : '';
        // 折线
        url += body.paths ? ('&paths=' + body.paths) : '';
        // 交通路况标识
        url += body.traffic ? ('&traffic=' + body.traffic) : '';
        url = encodeURI(url);
        // console.log(url);
        return url;
        // return this.httpService.get(url).pipe(map((res: any) => {
        //     return url;
        // }));
    }

    /**
     * 坐标转换
     */
    private coordinateConvertUrl = 'https://restapi.amap.com/v3/assistant/coordinate/convert';
    async coordinateConvert(body) {
        let url = this.coordinateConvertUrl;
        url += '?key=' + this.mapApiKey;
        // 坐标点
        url += '&locations=' + (body.locations || '116.481499,39.990475|116.481499,39.990375');
        // 原坐标系 gps;mapbar;baidu;autonavi(不进行转换)
        url += '&coordsys=' + (body.coordsys || 'gps');
        // 返回数据格式类型
        url += '&output=' + (body.output || 'JSON');
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 天气查询
     */
    private weatherWeatherInfoUrl = 'https://restapi.amap.com/v3/weather/weatherInfo';
    async weatherWeatherInfo(body) {
        let url = this.weatherWeatherInfoUrl;
        url += '?key=' + this.mapApiKey;
        // 城市编码
        url += '&city=' + (body.city || '110101');
        // 气象类型
        url += '&extensions=' + (body.extensions || 'all');
        // 返回格式
        url += '&output=' + (body.output || 'JSON');

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 输入提示
     */
    private assistantInputtipsUrl = 'https://restapi.amap.com/v3/assistant/inputtips';
    async assistantInputtips(body) {
        let url = this.assistantInputtipsUrl;
        url += '?key=' + this.mapApiKey;
        // 查询关键词
        url += '&keywords=' + (body.keywords || '肯德基');
        // POI分类
        url += '&type=' + (body.type || '050301');
        // 坐标
        url += '&location=' + (body.location || '116.481488,39.990464');
        // 搜索城市
        url += '&city=' + (body.city || '北京');
        // 仅返回指定城市数据
        url += '&citylimit=' + (body.citylimit || false);
        // 返回的数据类型
        url += '&datatype=' + (body.datatype || 'all');
        // 返回数据格式类型
        url += '&output=' + (body.output || 'JSON');
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }

    /**
     * 交通态势
     */
    // 支持交通态势的城市列表
    // tslint:disable-next-line:max-line-length
    private statusRectangleList = '北京，上海，广州，深圳，宁波，武汉，重庆，成都，沈阳，南京，杭州，长春，常州，大连，东莞，福州，青岛，石家庄，天津，太原，西安，无锡，厦门，珠海，长沙，苏州，金华，佛山，济南，泉州，嘉兴，西宁，惠州，温州，中山，合肥，乌鲁木齐，台州，绍兴，昆明';
    getStatusRectangleList() {
        const list = this.statusRectangleList.split(',');
        return list;
    }
    // 矩形区域交通态势
    private statusRectangleUrl = 'https://restapi.amap.com/v3/traffic/status/rectangle';
    async statusRectangle(body) {
        let url = this.statusRectangleUrl;
        url += '?key=' + this.mapApiKey;
        // 道路等级
        url += '&level=' + (body.level || 5);
        // 返回结果控制
        url += '&extensions=' + (body.extensions || '');
        // 返回数据格式类型
        url += '&output=' + (body.output || '');
        // 代表此为矩形区域查询
        url += '&rectangle=' + (body.rectangle || '116.351147,39.966309;116.357134,39.968727');
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }
    // 圆形区域交通态势
    private statusCircleUrl = 'https://restapi.amap.com/v3/traffic/status/circle';
    async statusCircle(body) {
        let url = this.statusCircleUrl;
        url += '?key=' + this.mapApiKey;
        // 道路等级
        url += '&level=' + (body.level || '5');
        // 返回结果控制
        url += '&extensions=' + (body.extensions || 'all');
        // 返回数据格式类型
        url += '&output=' + (body.output || 'JSON');
        // 中心点坐标
        url += '&location=' + (body.location || '116.3057764,39.98641364');
        // 半径
        url += '&radius=' + (body.radius || '1500');
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }
    // 指定线路交通态势
    private statusRoadUrl = 'https://restapi.amap.com/v3/traffic/status/road';
    async statusRoad(body) {
        let url = this.statusRoadUrl;
        url += '?key=' + this.mapApiKey;
        // 道路等级
        url += '&level=' + (body.level || '');
        // 返回结果控制
        url += '&extensions=' + (body.extensions || '');
        // 返回数据格式类型
        url += '&output=' + (body.output || 'JSON');
        // 道路名
        url += '&name=' + (body.name || '北环大道');
        // 城市名
        url += '&city=' + (body.city || '');
        // 城市编码
        url += '&adcode=' + (body.adcode || '440300');
        url = encodeURI(url);

        return this.httpService.get(url).pipe(map((res: any) => {
            return res.data;
        }));
    }
    // 轨迹纠偏
    private grasproadDrivingUrl = 'https://restapi.amap.com/v4/grasproad/driving';
    async grasproadDriving(body) {
        const url = this.grasproadDrivingUrl;
        const pointArr = [{
            x: 116.449429,
            y: 40.014844,
            sp: 4,
            ag: 110,
            tm: 1478831753,
        }, {
            x: 116.449639,
            y: 40.014776,
            sp: 3,
            ag: 110,
            tm: 23,
        }, {
            x: 116.449859,
            y: 40.014716,
            sp: 3,
            ag: 111,
            tm: 33,
        }, {
            x: 116.450074,
            y: 40.014658,
            sp: 3,
            ag: 110,
            tm: 31,
        }, {
            x: 116.450273,
            y: 40.014598,
            sp: 3,
            ag: 111,
            tm: 20,
        }];
        const param = {
            key: this.mapApiKey,
        };
        return this.httpService.post(url, pointArr, { headers: param }).pipe(map((res: any) => {
            return res.data;
        }));
    }
}
