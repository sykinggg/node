/**
 *
 * 高德 多边形搜索 数据结构
 * @export
 * @interface IplacePolygon
 */
export interface IplacePolygon {

    /**
     *
     * 经纬度坐标对
     * @example
     * 规则：经度和纬度用","分割，经度在前，纬度在后，坐标对用"|"分割。经纬度小数点后不得超过6位
     * 多边形为矩形时，可传入左上右下两顶点坐标对；其他情况下首尾坐标对需相同
     * @type {string}
     * @memberof IplacePolygon
     */
    polygon?: string;

    /**
     *
     * 查询关键字
     * @example
     * 规则： 多个关键字用“|”分割
     * @type {string}
     * @memberof IplacePolygon
     */
    keywords?: string;

    /**
     *
     * 查询POI类型
     * @example
     * 可选值：分类代码 或 汉字（若用汉字，请严格按照附件之中的汉字填写）
     * 分类代码由六位数字组成，一共分为三个部分，前两个数字代表大类；中间两个数字代表中类；最后两个数字代表小类
     * 若指定了某个大类，则所属的中类、小类都会被显示
     * 例如：010000为汽车服务（大类）
     *          010100为加油站（中类）
     *              010101为中国石化（小类）
     *          010900为汽车租赁（中类）
     *              010901为汽车租赁还车（小类）
     * 当指定010000，则010100等中类、010101等小类都会被包含，当指定010900，则010901等小类都会被包含
     * https://lbs.amap.com/api/webservice/download
     * 若不指定city，返回的内容为城市列表以及此城市内有多少结果符合要求
     * 当keywords和types为空的时候， 我们会默认指定types为120000（商务住宅）&150000（交通设施服务）
     * @type {string}
     * @memberof IplacePolygon
     */
    types?: string;

    /**
     *
     * 每页记录数据
     * @example
     * 强烈建议不超过25，若超过25可能造成访问报错
     * 默认 20
     * @type {number}
     * @memberof IplacePolygon
     */
    offset?: number;

    /**
     *
     * 当前页数
     * @example
     * 最大翻页数100
     * 默认 1
     * @type {number}
     * @memberof IplacePolygon
     */
    page?: number;

    /**
     *
     * 返回结果控制
     * @example
     * extensions 参数默认取值是 base，也就是返回基本地址信息(默认)
     * extensions 参数取值为 all 时会返回基本地址信息、附近 POI 内容、道路信息以及道路交叉口信息
     * @type {string}
     * @memberof IplacePolygon
     */
    extensions?: string;

    /**
     *
     * 数字签名
     * @wxample
     * https://lbs.amap.com/faq/account/key/72
     * @type {*}
     * @memberof IplacePolygon
     */
    sig?: any;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选输入内容包括：JSON(默认)，XML。设置 JSON 返回结果数据将会以JSON结构构成
     * 如果设置 XML 返回结果数据将以 XML 结构构成
     * @type {string}
     * @memberof IplacePolygon
     */
    output?: string | JSON;
}