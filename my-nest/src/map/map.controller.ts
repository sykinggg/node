import { Controller, Post, Body, Get } from '@nestjs/common';
import { MapService } from './map.service';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('map')
export class MapController {

    constructor(
        private readonly mapService: MapService,
    ) { }

    // 地理编码
    @Post('reverseGeocoding')
    async reverseGeocoding(@Body() body): Promise<any> {
        return this.mapService.reverseGeocoding(body);
    }

    // 逆地理编码
    @Post('reverseRegeocoding')
    async reverseRegeocoding(@Body() body): Promise<any> {
        return this.mapService.reverseRegeocoding(body);
    }

    // 步行路径规划
    @Post('directionWalking')
    async directionWalking(@Body() body): Promise<any> {
        return this.mapService.directionWalking(body);
    }

    // 公交路径规划
    @Post('directionTransitIntegrated')
    async directionTransitIntegrated(@Body() body): Promise<any> {
        return this.mapService.directionTransitIntegrated(body);
    }

    // 驾车路径规划
    @Post('directionDriving')
    async directionDriving(@Body() body): Promise<any> {
        return this.mapService.directionDriving(body);
    }

    // 骑行路径规划
    @Post('directionBicycling')
    async directionBicycling(@Body() body): Promise<any> {
        return this.mapService.directionBicycling(body);
    }

    // 货车路径规划
    @Post('directionTruck')
    async directionTruck(@Body() body): Promise<any> {
        return this.mapService.directionTruck(body);
    }

    // 距离测量
    @Post('distance')
    async distance(@Body() body): Promise<any> {
        return this.mapService.distance(body);
    }

    // 行政区域查询
    @Post('configDistrict')
    async configDistrict(@Body() body): Promise<any> {
        return this.mapService.configDistrict(body);
    }

    // 关键字搜索
    @Post('placeText')
    async placeText(@Body() body): Promise<any> {
        return this.mapService.placeText(body);
    }

    // 周边搜索
    @Post('placeAround')
    async placeAround(@Body() body): Promise<any> {
        return this.mapService.placeAround(body);
    }

    // 多边形搜索
    @Post('placePolygon')
    async placePolygon(@Body() body): Promise<any> {
        return this.mapService.placePolygon(body);
    }

    // ID查询
    @Post('placeDetail')
    async placeDetail(@Body() body): Promise<any> {
        return this.mapService.placeDetail(body);
    }

    // IP定位
    @Post('v3Ip')
    async v3Ip(@Body() body): Promise<any> {
        return this.mapService.v3Ip(body);
    }

    // 静态地图
    @Post('v3Staticmap')
    async v3Staticmap(@Body() body): Promise<any> {
        let url = this.mapService.v3Staticmap(body);
        url = JSON.stringify(url);
        return url;
    }

    // 坐标转换
    @Post('coordinateConvert')
    async coordinateConvert(@Body() body): Promise<any> {
        return this.mapService.coordinateConvert(body);
    }

    // 天气查询
    @Post('weatherWeatherInfo')
    async weatherWeatherInfo(@Body() body): Promise<any> {
        return this.mapService.weatherWeatherInfo(body);
    }

    // 输入提示
    @Post('assistantInputtips')
    async assistantInputtips(@Body() body): Promise<any> {
        return this.mapService.assistantInputtips(body);
    }

    // 支持交通态势的城市列表
    @Get('getStatusRectangleList')
    async getStatusRectangleList(): Promise<any> {
        return this.mapService.getStatusRectangleList();
    }

    // 矩形区域交通态势
    @Post('statusRectangle')
    async statusRectangle(@Body() body): Promise<any> {
        return this.mapService.statusRectangle(body);
    }

    // 圆形区域交通态势
    @Post('statusCircle')
    async statusCircle(@Body() body): Promise<any> {
        return this.mapService.statusCircle(body);
    }

    // 指定线路交通态势
    @Post('statusRoad')
    async statusRoad(@Body() body): Promise<any> {
        return this.mapService.statusRoad(body);
    }

    // 轨迹纠偏
    @Post('grasproadDriving')
    async grasproadDriving(@Body() body): Promise<any> {
        return this.mapService.grasproadDriving(body);
    }
}
