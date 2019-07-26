/**
 *
 * 高德 IP定位 数据结构
 * @export
 * @interface Iv3Ip
 */
export interface Iv3Ip {

    /**
     *
     * ip地址
     * @example
     * 需要搜索的IP地址（仅支持国内）
     * 若用户不填写IP，则取客户http之中的请求来进行定位
     * @type {string}
     * @memberof Iv3Ip
     */
    ip?: string;

    /**
     *
     * 数字签名
     * @wxample
     * https://lbs.amap.com/faq/account/key/72
     * @type {*}
     * @memberof Iv3Ip
     */
    sig?: any;

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