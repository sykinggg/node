/**
 *
 * 高德 周边搜索 数据结构
 * @export
 * @interface IplaceAround
 */
export interface IplaceAround {

    /**
     *
     * 中心点坐标
     * @example
     * 规则： 经度和纬度用","分割，经度在前，纬度在后，经纬度小数点后不得超过6位
     * @type {string}
     * @memberof IplaceAround
     */
    location?: string;

    /**
     *
     * 查询关键字
     * @example
     * 规则： 多个关键字用“|”分割
     * @type {string}
     * @memberof IplaceAround
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
     * 当keywords和types均为空的时候，默认指定types为050000（餐饮服务）、070000（生活服务）、120000（商务住宅）
     * @type {string}
     * @memberof IplaceAround
     */
    types?: string;

    /**
     *
     * 查询城市
     * @example
     * 可选值：城市中文、中文全拼、citycode、adcode
     * 如：北京/beijing/010/110000
     * 填入此参数后，会尽量优先返回此城市数据，但是不一定仅局限此城市结果，若仅需要某个城市数据请调用citylimit参数
     * 如：经纬度指定石家庄，而city却指定天津，若搜索范围内有天津的数据则返回相关数据，否则返回为空。
     * @type {string}
     * @memberof IplaceAround
     */
    city?: string;

    /**
     *
     * 查询半径
     * @example
     * 取值范围:0-50000。规则：大于50000按默认值，单位：米
     * 默认: 3000
     * @type {number}
     * @memberof IplaceAround
     */
    radius?: number;

    /**
     *
     * 排序规则
     * @example
     * 规定返回结果的排序规则
     * 按距离排序：distance(默认)；综合排序：weight
     * @type {string}
     * @memberof IplaceAround
     */
    sortrule?: string;

    /**
     *
     * 每页记录数据
     * @example
     * 强烈建议不超过25，若超过25可能造成访问报错
     * 默认：20
     * @type {number}
     * @memberof IplaceAround
     */
    offset?: number;

    /**
     *
     * 当前页数
     * @example
     * 最大翻页数100
     * @type {number}
     * @memberof IplaceAround
     */
    page?: number;

    /**
     *
     * 返回结果控制
     * @example
     * 取值为all返回地址信息、附近POI、道路以及道路交叉口信息
     * 默认base
     * @type {string}
     * @memberof IplaceAround
     */
    extensions?: string;

    /**
     *
     * 数字签名
     * @example
     * https://lbs.amap.com/faq/account/key/72
     * @type {string}
     * @memberof IplaceAround
     */
    sig?: string;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选值：JSON(默认)，XML
     * @type {string}
     * @memberof IplaceAround
     */
    output?: string;
}