/**
 *
 * 高德 坐标转换 数据结构
 * @export
 * @interface IcoordinateConvert
 */
export interface IcoordinateConvert {

    /**
     *
     * 坐标点
     * @example
     * 经度和纬度用","分割，经度在前，纬度在后，经纬度小数点后不得超过6位
     * 多个坐标对之间用”|”进行分隔最多支持40对坐标
     * @type {string}
     * @memberof IcoordinateConvert
     */
    locations?: string;

    /**
     *
     * 原坐标系
     * @example
     * gps;
     * mapbar;
     * baidu;
     * autonavi(不进行转换)(默认)
     * @type {string}
     * @memberof IcoordinateConvert
     */
    coordsys?: string;

    /**
     *
     * 数字签名
     * @wxample
     * https://lbs.amap.com/faq/account/key/72
     * @type {*}
     * @memberof IcoordinateConvert
     */
    sig?: any;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选输入内容包括：JSON(默认)，XML。设置 JSON 返回结果数据将会以JSON结构构成
     * 如果设置 XML 返回结果数据将以 XML 结构构成
     * @type {string}
     * @memberof IcoordinateConvert
     */
    output?: string | JSON;
}