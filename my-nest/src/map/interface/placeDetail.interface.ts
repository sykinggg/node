/**
 *
 * 高德 ID查询 数据结构
 * @export
 * @interface IplaceDetail
 */
export interface IplaceDetail {

    /**
     *
     * 兴趣点ID
     * @example
     * 兴趣点的唯一标识ID
     * @type {string}
     * @memberof IplaceDetail
     */
    id?: string;

    /**
     *
     * 数字签名
     * @wxample
     * https://lbs.amap.com/faq/account/key/72
     * @type {*}
     * @memberof IplaceDetail
     */
    sig?: any;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选输入内容包括：JSON(默认)，XML。设置 JSON 返回结果数据将会以JSON结构构成
     * 如果设置 XML 返回结果数据将以 XML 结构构成
     * @type {string}
     * @memberof IplaceDetail
     */
    output?: string | JSON;
}