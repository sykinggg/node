/**
 *
 * 高德 距离测量 数据结构
 * @export
 * @interface Idistance
 */
export interface Idistance {

    /**
     *
     * 出发点
     * @description
     * 可选值：JSON(默认)，XML
     * @example
     * 支持100个坐标对，坐标对见用“| ”分隔；经度和纬度用","分隔
     * @type {string}
     * @memberof Idistance
     */
    origins?: string;

    /**
     *
     * 目的地
     * @example
     * 规则： lon，lat（经度，纬度）， “,”分割
     * 如117.500244, 40.417801     经纬度小数点不超过6位
     * @type {string}
     * @memberof Idistance
     */
    destination?: string;

    /**
     *
     * 路径计算的方式和方法
     * @example
     * 0：直线距离
     * 1：驾车导航距离（仅支持国内坐标）(默认)
     *      1时会考虑路况，故在不同时间请求返回结果可能不同
     *      此策略和驾车路径规划接口的 strategy=4策略基本一致，策略为“ 躲避拥堵的路线，但是可能会存在绕路的情况，耗时可能较长 ”
     *      若需要实现高德地图客户端效果，可以考虑使用驾车路径规划接口
     * 3：步行规划距离（仅支持5km之间的距离）
     * @type {number}
     * @memberof Idistance
     */
    type?: number;

    /**
     *
     * 数字签名
     * @type {string}
     * @memberof Idistance
     */
    sig?: string;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选值：JSON(默认)，XML
     * @type {string}
     * @memberof Idistance
     */
    output?: string;
}