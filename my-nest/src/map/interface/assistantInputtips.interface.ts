/**
 *
 * 高德 输入提示 数据结构
 * @export
 * @interface IassistantInputtips
 */
export interface IassistantInputtips {

    /**
     *
     * 查询关键词
     * @type {string}
     * @memberof IassistantInputtips
     */
    keywords?: string;

    /**
     *
     * POI分类
     * @example
     * 服务可支持传入多个分类，多个类型剑用“|”分隔
     * 可选值：POI分类名称、分类代码
     * @type {string}
     * @memberof IassistantInputtips
     */
    type?: string;

    /**
     *
     * 坐标
     * @example
     * 格式：“X,Y”（经度,纬度），不可以包含空格
     * 建议使用location参数，可在此location附近优先返回搜索关键词信息
     * @type {string}
     * @memberof IassistantInputtips
     */
    location?: string;

    /**
     *
     * 搜索城市
     * @example
     * 可选值：citycode、adcode，不支持县级市
     * 如：010/110000 adcode https://lbs.amap.com/api/webservice/download
     * 填入此参数后，会尽量优先返回此城市数据，但是不一定仅局限此城市结果，若仅需要某个城市数据请调用citylimit参数
     * 如：在深圳市搜天安门，返回北京天安门结果
     * 默认在全国范围内搜索
     * @type {(string | number)}
     * @memberof IassistantInputtips
     */
    city?: string | number;

    /**
     *
     * 仅返回指定城市数据
     * @example
     * 可选值：true/false(默认)
     * @type {boolean}
     * @memberof IassistantInputtips
     */
    citylimit?: boolean;

    /**
     *
     * 返回的数据类型
     * @example
     * 多种数据类型用“|”分隔
     * all-返回所有数据类型
     * poi-返回POI数据类型
     * bus-返回公交站点数据类型
     * busline-返回公交线路数据类型
     * @type {string}
     * @memberof IassistantInputtips
     */
    datatype?: string;

    /**
     *
     * 数字签名
     * @wxample
     * https://lbs.amap.com/faq/account/key/72
     * @type {*}
     * @memberof IassistantInputtips
     */
    sig?: any;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选输入内容包括：JSON(默认)，XML。设置 JSON 返回结果数据将会以JSON结构构成
     * 如果设置 XML 返回结果数据将以 XML 结构构成
     * @type {string}
     * @memberof IassistantInputtips
     */
    output?: string | JSON;
}