/**
 *
 * 高德 公交路径规划 数据结构
 * @export
 * @interface IdirectionTransitIntegrated
 */
export interface IdirectionTransitIntegrated {

    /**
     *
     * 出发点
     * @example
     * 规则： lon，lat（经度，纬度），“,”分割，如117.500244, 40.417801
     * 经纬度小数点不超过6位
     * @type {string}
     * @memberof IdirectionTransitIntegrated
     */
    origin?: string;

    /**
     *
     * 目的地
     * @example
     * 规则： lon，lat（经度，纬度）， “,”分割，如117.500244, 40.417801
     * 经纬度小数点不超过6位
     * @type {string}
     * @memberof IdirectionTransitIntegrated
     */
    destination?: string;

    /**
     *
     * 城市/跨城规划时的起点城市
     * @example
     * 目前支持市内公交换乘/跨城公交的起点城市
     * 可选值：城市名称/citycode
     * @type {string}
     * @memberof IdirectionTransitIntegrated
     */
    city?: string;

    /**
     *
     * 跨城公交规划时的终点城市
     * @example
     * 跨城公交规划必填参数
     * 可选值：城市名称/citycode
     * @type {string}
     * @memberof IdirectionTransitIntegrated
     */
    cityd?: string;

    /**
     *
     * 返回结果详略
     * @example
     * 可选值：base(default)/all
     * base:返回基本信息；all：返回全部信息
     * @type {string}
     * @memberof IdirectionTransitIntegrated
     */
    extensions?: string;

    /**
     *
     * 公交换乘策略
     * @example
     * 0：最快捷模式
     * 1：最经济模式
     * 2：最少换乘模式
     * 3：最少步行模式
     * 5：不乘地铁模式
     * @type {number}
     * @memberof IdirectionTransitIntegrated
     */
    strategy?: number;

    /**
     *
     * 是否计算夜班车
     * @example
     * 0：不计算夜班车(默认)
     * 1：计算夜班车
     * @type {number}
     * @memberof IdirectionTransitIntegrated
     */
    nightflag?: number;

    /**
     *
     * 出发日期
     * @example
     * 根据出发时间和日期（未来时间点）筛选可乘坐的公交路线
     * 格式：date=2014-3-19
     * 在无需设置预计出发时间时，请不要在请求之中携带此参数
     * @type {string}
     * @memberof IdirectionTransitIntegrated
     */
    date?: string;

    /**
     *
     * 出发时间
     * @example
     * 根据出发时间和日期（未来时间点）筛选可乘坐的公交路线
     * 格式：time=22:34
     * 在无需设置预计出发时间时，请不要在请求之中携带此参数
     * @type {string}
     * @memberof IdirectionTransitIntegrated
     */
    time?: string;

    /**
     *
     * 数字签名
     * @type {string}
     * @memberof IdirectionTransitIntegrated
     */
    sig?: string;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选值：JSON，XML
     * @type {string}
     * @memberof IdirectionTransitIntegrated
     */
    output?: string;
}