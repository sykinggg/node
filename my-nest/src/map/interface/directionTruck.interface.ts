/**
 *
 * 高德 货车路径规划 数据结构
 * @export
 * @interface IdirectionTruck
 */
export interface IdirectionTruck {
    /**
     *
     * 出发点经纬度
     * @example
     * 填入规则：X,Y，采用","分隔，例如“ 117.500244, 40.417801 ”
     * 小数点后不得超过6位
     * @type {string}
     * @memberof IdirectionTruck
     */
    origin?: string;

    /**
     *
     * 出发POI的唯一编号
     * @example
     * 当起点为POI时，建议填充此值
     * 填充此值以后，会影响路径规划的结果，举例来说，当起点的经纬度在高架桥上面
     * 若填充了此值我们会以此POI的经纬度作为更高优的处理
     * @type {string}
     * @memberof IdirectionTruck
     */
    originid?: string;

    /**
     *
     * 出发POI的类型
     * @example
     * 当起点为POI时，建议填充此值
     * @type {(string | number)}
     * @memberof IdirectionTruck
     */
    originidtype?: string | number;

    /**
     *
     * 目的地经纬度
     * @example
     * 填入规则：X,Y，采用","分隔，例如“ 117.500244, 40.417801 ”
     * 小数点后不得超过6位
     * @type {string}
     * @memberof IdirectionTruck
     */
    destination?: string;

    /**
     *
     * 终点POI的唯一编号
     * @example
     * 当终点为POI时，建议填充此值
     * 填充此值以后，会影响路径规划的结果，举例来说，当终点的经纬度在高架桥上面
     * 若填充了此值我们会以此POI的经纬度作为更高优的处理
     * @type {string}
     * @memberof IdirectionTruck
     */
    destinationid?: string;

    /**
     *
     * 终点POI的类型
     * @example
     * 当起点为POI时，建议填充此值
     * @type {string}
     * @memberof IdirectionTruck
     */
    destinationtype?: string;

    /**
     *
     * 设备唯一编号
     * @example
     * android的imei
     * ios的idfa
     * @type {string}
     * @memberof IdirectionTruck
     */
    diu?: string;

    /**
     *
     * 驾车选择策略
     * @example
     * 1，返回的结果考虑路况，尽量躲避拥堵而规划路径；对应导航SDK货导策略12；(默认)
     * 2，返回的结果考虑路况，不走高速；对应导航SDK货导策略13；
     * 3，返回的结果考虑路况，尽可能规划收费较低甚至免费的路径；对应导航SDK货导策略14
     * 4，返回的结果考虑路况，尽量躲避拥堵，并且不走高速；对应导航SDK货导策略15；
     * 5，返回的结果考虑路况，尽量不走高速，并且尽量规划收费较低甚至免费的路径结果；对应导航SDK货导策略16；
     * 6，返回的结果考虑路况，尽量的躲避拥堵，并且规划收费较低甚至免费的路径结果；对应导航SDK货导策略17；
     * 7，返回的结果考虑路况，尽量躲避拥堵，规划收费较低甚至免费的路径结果，并且尽量不走高速路；对应导航SDK货导策略18；
     * 8，返回的结果考虑路况，会优先选择高速路；对应导航SDK货导策略19；
     * 9，返回的结果考虑路况，会优先考虑高速路，并且会考虑路况躲避拥堵；对应导航SDK货导策略20；
     * 10，不考虑路况，返回速度优先的路线，此路线不一定距离最短；如果不需要路况干扰计算结果，推荐使用此策略；（导航SDK货导策略无对应，真实导航时均会考虑路况）
     * 11，返回的结果会考虑路况，躲避拥堵，速度优先以及费用优先；500Km规划以内会返回多条结果，500Km以外会返回单条结果；
     *      考虑路况情况下的综合最优策略，推荐使用；对应导航SDK货导策略10；
     * @type {(number | string)}
     * @memberof IdirectionTruck
     */
    strategy?: number | string;

    /**
     *
     * 途经点
     * @example
     * "规则：经度和纬度用“,”分隔，坐标点之间用";分隔
     * 默认值：无
     * 最大数目：16个坐标点，如果输入多个途径点，则按照用户输入的顺序进行路径规划
     * @type {string}
     * @memberof IdirectionTruck
     */
    waypoints?: string;

    /**
     *
     * 车辆大小
     * @example
     * 国标
     * 1：微型车
     * 2：轻型车（默认值）
     * 3：中型车
     * 4：重型车
     * @type {(number | string)}
     * @memberof IdirectionTruck
     */
    size?: number | string;

    /**
     *
     * 车辆高度
     * @example
     * 单位米，取值[0 – 25.5]米，默认 1.6 米，会严格按照填写数字进行限行规避，请按照车辆真实信息合理填写
     * @type {number}
     * @memberof IdirectionTruck
     */
    height?: number;

    /**
     *
     * 车辆宽度
     * @example
     * 单位米，取值[0 – 25.5]米，默认 2.5 米，会严格按照填写数字进行限行规避，请按照车辆真实信息合理填写
     * @type {number}
     * @memberof IdirectionTruck
     */
    width?: number;

    /**
     *
     * 车辆总重
     * @example
     * 单位吨，取值[0 – 6553.5]吨，默认 0.9 吨
     * 会严格按照填写数字进行限行规避，请按照车辆真实信息合理填写
     * 总重的含义是核定载重加上车辆自重的总质量
     * @type {number}
     * @memberof IdirectionTruck
     */
    load?: number;

    /**
     *
     * 货车核定载重
     * @example
     * 单位吨，取值[0 – 6553.5]吨，默认 10 吨，会严格按照填写数字进行限行规避，请按照车辆真实信息合理填写
     * 核定载重的含义是可装载货物的最大重量
     * @type {number}
     * @memberof IdirectionTruck
     */
    weight?: number;

    /**
     *
     * 车辆轴数
     * @example
     * 单位个，取值[0 –255]个，默认 2个轴
     * 会严格按照填写数字进行限行规避
     * @type {number}
     * @memberof IdirectionTruck
     */
    axis?: number;

    /**
     *
     * 车牌省份
     * @example
     * 用汉字填入车牌省份缩写。用于判断是否限行
     * @type {string}
     * @memberof IdirectionTruck
     */
    province?: string;

    /**
     *
     * 车牌详情
     * @example
     * 填入除省份及标点之外的字母和数字（需大写），用于判断限行相关
     * 支持6位传统车牌和7位新能源车牌
     * @type {string}
     * @memberof IdirectionTruck
     */
    number?: string;

    /**
     *
     * 车辆类型
     * @example
     * 0：普通货车（默认值）
     * 1：纯电动货车
     * 2：插电混动货车
     * @type {number}
     * @memberof IdirectionTruck
     */
    cartype?: number;

    /**
     *
     * 避让区域
     * @example
     * 区域避让，支持100个避让区域，每个区域最多可有16个顶点，每个区域的最大面积是100平方公里
     * 经度和纬度用"",""分隔，坐标点之间用";"分隔，区域之间用"|"分隔。如果是四边形则有四个坐标点，如果是五边形则有五个坐标点
     * @type {string}
     * @memberof IdirectionTruck
     */
    avoidpolygons?: string;

    /**
     *
     * 是否返回路线数据
     * @example
     * 取值为1时，steps与tmcs下的polyline数据会正常返回
     * 取值为0时，steps与tmcs下的polyline数据返回""
     * @type {number}
     * @memberof IdirectionTruck
     */
    showpolyline?: number;

    /**
     *
     * 是否返回steps字段内容
     * @example
     * 取值为0时，steps字段内容正常返回
     * 取值为1时，steps字段内容为空
     * @type {number}
     * @memberof IdirectionTruck
     */
    nosteps?: number;
}