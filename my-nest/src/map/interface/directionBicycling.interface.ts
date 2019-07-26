/**
 *
 * 高德 骑行路径规划 数据结构
 * @export
 * @interface IdirectionBicycling
 */
export interface IdirectionBicycling {

    /**
     *
     * 出发点经纬度
     * @example
     * 填入规则：X,Y，采用","分隔，例如“ 117.500244, 40.417801 ” 小数点后不得超过6位
     * @type {string}
     * @memberof IdirectionBicycling
     */
    origin?: string;

    /**
     *
     * 目的地经纬度
     * @example
     * 填入规则：X,Y，采用","分隔，例如“ 117.500244, 40.417801 ” 小数点后不得超过6位
     * @type {string}
     * @memberof IdirectionBicycling
     */
    destination?: string;
}