/**
 *
 * 高德 指定线路交通态势 数据结构
 * @export
 * @interface IstatusRoad
 */
export interface IstatusRoad {
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
     * @memberof IstatusRoad
     */
    level?: number;

    /**
     *
     * 返回结果控制
     * @example
     * 可选值：base(默认),all
     * @type {string}
     * @memberof IstatusRoad
     */
    extensions?: string;

    /**
     *
     * 数字签名
     * @wxample
     * https://lbs.amap.com/faq/account/key/72
     * @type {*}
     * @memberof IstatusRoad
     */
    sig?: any;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选输入内容包括：JSON(默认)，XML。设置 JSON 返回结果数据将会以JSON结构构成
     * 如果设置 XML 返回结果数据将以 XML 结构构成
     * @type {string}
     * @memberof IstatusRoad
     */
    output?: string | JSON;

    /**
     *
     * 道路名
     * @type {string}
     * @memberof IstatusRoad
     */
    name?: string;

    /**
     *
     * 城市名
     * @example
     * 由于开发者可能对城市称呼和高德的称呼存在差异
     * 例如开发者称呼为深圳，但高德仅识别深圳市
     * 故强烈建议使用adcode，不使用city字段
     * 另外此处的adcode仅识别市级的adcode
     * @type {string}
     * @memberof IstatusRoad
     */
    city?: string;

    /**
     *
     * 城市编码
     * @example
     * 由于开发者可能对城市称呼和高德的称呼存在差异
     * 例如开发者称呼为深圳，但高德仅识别深圳市
     * 故强烈建议使用adcode，不使用city字段
     * 另外此处的adcode仅识别市级的adcode
     * @type {string}
     * @memberof IstatusRoad
     */
    adcode?: string;
}