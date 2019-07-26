/**
 *
 * 高德 步行路径规划 数据结构
 * @export
 * @interface IdirectionWalking
 */
export interface IdirectionWalking {
    /**
     *
     * 出发点
     * @example
     * 规则： lon，lat（经度，纬度）
     *  “,”分割，如117.500244, 40.417801
     * 经纬度小数点不超过6位
     * @type {string}
     * @memberof IdirectionWalking
     */
    origin?: string;

    /**
     *
     * 目的地
     * @example
     * 规则： lon，lat（经度，纬度）
     * “,”分割，如117.500244, 40.417801
     * 经纬度小数点不超过6位
     * @type {string}
     * @memberof IdirectionWalking
     */
    destination?: string;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选值：JSON，XML
     * @type {string}
     * @memberof IdirectionWalking
     */
    output?: string;
}