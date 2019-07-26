/**
 *
 * 高德 圆形区域交通态势 数据结构
 * @export
 * @interface IstatusCircle
 */
export interface IstatusCircle {
    /**
     *
     * 道路等级
     * @example
     * 1：高速（京藏高速）
     * 2：城市快速路、国道(西三环、103国道)
     * 3：高速辅路（G6辅路）
     * 4：主要道路（长安街、三环辅路路）
     * 5：一般道路（彩和坊路）(默认)
     * 6：无名道路
     * @type {number}
     * @memberof IstatusCircle
     */
    level?: number;

    /**
     *
     * 返回结果控制
     * @example
     * 可选值：base(默认),all
     * @type {string}
     * @memberof IstatusCircle
     */
    extensions?: string;

    /**
     *
     * 数字签名
     * @wxample
     * https://lbs.amap.com/faq/account/key/72
     * @type {*}
     * @memberof IstatusCircle
     */
    sig?: any;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选输入内容包括：JSON(默认)，XML。设置 JSON 返回结果数据将会以JSON结构构成
     * 如果设置 XML 返回结果数据将以 XML 结构构成
     * @type {string}
     * @memberof IstatusCircle
     */
    output?: string | JSON;

    /**
     *
     * 中心点坐标
     * @example
     * 经度在前，纬度在后。经度和纬度用","分割
     * 经纬度小数点后不得超过6位
     * @type {string}
     * @memberof IstatusCircle
     */
    location?: string;

    /**
     *
     * 半径
     * @example
     * 单位：米，最大取值5000米
     * 默认 1000
     * @type {number}
     * @memberof IstatusCircle
     */
    radius?: number;
}