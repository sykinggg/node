/**
 *
 * 高德 关键字搜索 数据结构
 * @export
 * @interface IplaceText
 */
export interface IplaceText {

    /**
     *
     * 查询关键字
     * @example
     * 规则： 多个关键字用“|”分割
     * 若不指定city，并且搜索的为泛词（例如“美食”）的情况下
     * 返回的内容为城市列表以及此城市内有多少结果符合要求
     * @type {string}
     * @memberof IplaceText
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
     * 当keywords和types都是空时，默认指定types为120000（商务住宅）&150000（交通设施服务）
     * @type {string}
     * @memberof IplaceText
     */
    types?: string;

    /**
     *
     * 查询城市
     * @example
     * 可选值：城市中文、中文全拼、citycode、adcode
     * 如：北京/beijing/010/110000
     * 填入此参数后，会尽量优先返回此城市数据，但是不一定仅局限此城市结果，若仅需要某个城市数据请调用citylimit参数
     * 如：在深圳市搜天安门，返回北京天安门结果
     * @type {string}
     * @memberof IplaceText
     */
    city?: string;

    /**
     *
     * 仅返回指定城市数据
     * @example
     * 可选值：true/false(默认)
     * @type {boolean}
     * @memberof IplaceText
     */
    citylimit?: boolean;

    /**
     *
     * 是否按照层级展示子POI数据
     * @example
     * 当为0的时候，子POI都会显示(默认)
     * 当为1的时候，子POI会归类到父POI之中
     * 仅在extensions=all的时候生效
     * @type {(number | string)}
     * @memberof IplaceText
     */
    children?: number | string;

    /**
     *
     * 每页记录数据
     * @example
     * 强烈建议不超过25，若超过25可能造成访问报错
     * 默认 20
     * @type {number}
     * @memberof IplaceText
     */
    offset?: number;

    /**
     *
     * 当前页数
     * @example
     * 最大翻页数100
     * 默认 1
     * @type {number}
     * @memberof IplaceText
     */
    page?: number;

    /**
     *
     * 返回结果控制
     * @example
     * base(默认) | all
     * 取值为all返回地址信息、附近POI、道路以及道路交叉口信息
     * @type {string}
     * @memberof IplaceText
     */
    extensions?: string;

    /**
     *
     * 数字签名
     * @example
     * https://lbs.amap.com/faq/account/key/72
     * @type {string}
     * @memberof IplaceText
     */
    sig?: string;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选值：JSON(默认)，XML
     * @type {string}
     * @memberof IplaceText
     */
    output?: string;
}