/**
 *
 * 高德 静态地图 数据结构
 * @export
 * @interface Iv3Staticmap
 */
export interface Iv3Staticmap {

    /**
     *
     * 地图中心点
     * @example
     * 中心点坐标
     * 规则：经度和纬度用","分隔 经纬度小数点后不得超过6位
     * @type {string}
     * @memberof Iv3Staticmap
     */
    location?: string;

    /**
     *
     * 地图级别
     * @example
     * 地图缩放级别:[1,17]
     * @type {number}
     * @memberof Iv3Staticmap
     */
    zoom?: number;

    /**
     *
     * 地图大小
     * @example
     * 图片宽度*图片高度。最大值为1024*1024
     * 默认 400*400
     * @type {string}
     * @memberof Iv3Staticmap
     */
    size?: string;

    /**
     *
     * 普通/高清
     * @example
     * 1:返回普通图；
     * 2:调用高清图，图片高度和宽度都增加一倍，zoom也增加一倍（当zoom为最大值时，zoom不再改变）
     * 默认 1
     * @type {string}
     * @memberof Iv3Staticmap
     */
    scale?: string;

    /**
     *
     * 标注
     * @example
     * 使用规则见markers详细说明，标注最大数10个
     * @type {string}
     * @memberof Iv3Staticmap
     */
    markers?: string;

    /**
     *
     * 标签
     * @example
     * 使用规则见labels详细说明，标签最大数10个
     * @type {string}
     * @memberof Iv3Staticmap
     */
    labels?: string;

    /**
     *
     * 折线
     * @example
     * 使用规则见paths详细说明，折线和多边形最大数4个
     * @type {string}
     * @memberof Iv3Staticmap
     */
    paths?: string;

    /**
     *
     * 交通路况标识
     * @example
     * 底图是否展现实时路况。 可选值： 0，不展现；1，展现。
     * 默认 0
     * @type {string}
     * @memberof Iv3Staticmap
     */
    traffic?: string;
}