/**
 *
 * 高德 天气查询 数据结构
 * @export
 * @interface IweatherWeatherInfo
 */
export interface IweatherWeatherInfo {

    /**
     *
     * 城市编码
     * @example
     * 输入城市的adcode
     * https://lbs.amap.com/api/webservice/download
     * @type {string}
     * @memberof IweatherWeatherInfo
     */
    city?: string;

    /**
     *
     * 气象类型
     * @example
     * 可选值：base/all
     * base:返回实况天气
     * all:返回预报天气
     * @type {string}
     * @memberof IweatherWeatherInfo
     */
    extensions?: string;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选输入内容包括：JSON(默认)，XML。设置 JSON 返回结果数据将会以JSON结构构成
     * 如果设置 XML 返回结果数据将以 XML 结构构成
     * @type {string}
     * @memberof Iv3Ip
     */
    output?: string | JSON;
}