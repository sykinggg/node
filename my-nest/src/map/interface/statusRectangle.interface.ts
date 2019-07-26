/**
 *
 * 高德 矩形区域交通态势 数据结构
 * @export
 * @interface IstatusRectangle
 */
export interface IstatusRectangle {

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
     * @memberof IstatusRectangle
     */
    level?: number;

    /**
     *
     * 返回结果控制
     * @example
     * 可选值：base(默认),all
     * @type {string}
     * @memberof IstatusRectangle
     */
    extensions?: string;

    /**
     *
     * 代表此为矩形区域查询
     * @example
     * 左下右上顶点坐标对。矩形对角线不能超过10公里
     * 两个坐标对之间用”;”间隔
     * xy之间用”,”间隔
     * @type {string}
     * @memberof IstatusRectangle
     */
    rectangle?: string;

    /**
     *
     * 数字签名
     * @wxample
     * https://lbs.amap.com/faq/account/key/72
     * @type {*}
     * @memberof IstatusRectangle
     */
    sig?: any;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选输入内容包括：JSON(默认)，XML。设置 JSON 返回结果数据将会以JSON结构构成
     * 如果设置 XML 返回结果数据将以 XML 结构构成
     * @type {string}
     * @memberof IstatusRectangle
     */
    output?: string | JSON;
}