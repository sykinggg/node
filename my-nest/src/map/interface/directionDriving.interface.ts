/**
 *
 * 高德 驾车路径规划 数据结构
 * @export
 * @interface IdirectionDriving
 */
export interface IdirectionDriving {

    /**
     *
     * 出发点
     * @example
     * 经度在前，纬度在后，经度和纬度用","分割，经纬度小数点后不得超过6位
     * 格式为x1,y1|x2,y2|x3,y3
     * 由于在实际使用过程中，存在定位飘点的情况。为了解决此类问题，允许传入多个起点用于计算车头角度
     * 最多允许传入3个坐标对，每对坐标之间距离必须超过2m
     * 虽然对每对坐标之间长度没有上限，但是如果超过4米会有概率性出现不准确的情况
     * 使用三个点来判断距离和角度的有效性，如果两者都有效，使用第一个点和最后一个点计算的角度设置抓路的角度，规划路径时以最后一个坐标对进行规划
     * @type {string}
     * @memberof IdirectionDriving
     */
    origin?: string;

    /**
     *
     * 目的地
     * @example
     * 经度在前，纬度在后，经度和纬度用","分割，经纬度小数点后不得超过6位
     * @type {string}
     * @memberof IdirectionDriving
     */
    destination?: string;

    /**
     *
     * 出发点poiid
     * @example
     * 当起点为POI时，建议填充此值
     * @type {string}
     * @memberof IdirectionDriving
     */
    originid?: string;

    /**
     *
     * 目的地poiid
     * @example
     * 当终点为POI时，建议填充此值
     * @type {string}
     * @memberof IdirectionDriving
     */
    destinationid?: string;

    /**
     *
     * 起点的poi类别
     * @example
     * 当用户知道起点POI的类别时候，建议填充此值
     * @type {string}
     * @memberof IdirectionDriving
     */
    origintype?: string;

    /**
     *
     * 终点的poi类别
     * 当用户知道终点POI的类别时候，建议填充此值
     * @type {string}
     * @memberof IdirectionDriving
     */
    destinationtype?: string;

    /**
     *
     * 驾车选择策略
     * @example
     * 10~20的策略，会返回多条路径规划结果
     * 0~9的策略，仅会返回一条路径规划结果
     * 10~20
     *      10，返回结果会躲避拥堵，路程较短，尽量缩短时间，与高德地图的默认策略也就是不进行任何勾选一致
     *      11，返回三个结果包含：时间最短；距离最短；躲避拥堵 （由于有更优秀的算法，建议用10代替）
     *      12，返回的结果考虑路况，尽量躲避拥堵而规划路径，与高德地图的“躲避拥堵”策略一致
     *      13，返回的结果不走高速，与高德地图“不走高速”策略一致
     *      14，返回的结果尽可能规划收费较低甚至免费的路径，与高德地图“避免收费”策略一致
     *      15，返回的结果考虑路况，尽量躲避拥堵而规划路径，并且不走高速，与高德地图的“躲避拥堵&不走高速”策略一致
     *      16，返回的结果尽量不走高速，并且尽量规划收费较低甚至免费的路径结果，与高德地图的“避免收费&不走高速”策略一致
     *      17，返回路径规划结果会尽量的躲避拥堵，并且规划收费较低甚至免费的路径结果，与高德地图的“躲避拥堵&避免收费”策略一致
     *      18，返回的结果尽量躲避拥堵，规划收费较低甚至免费的路径结果，并且尽量不走高速路，与高德地图的“避免拥堵&避免收费&不走高速”策略一致
     *      19，返回的结果会优先选择高速路，与高德地图的“高速优先”策略一致
     *      20，返回的结果会优先考虑高速路，并且会考虑路况躲避拥堵，与高德地图的“躲避拥堵&高速优先”策略一致
     * 0~9
     *      0，速度优先，不考虑当时路况，此路线不一定距离最短(默认)
     *      1，费用优先，不走收费路段，且耗时最少的路线
     *      2，距离优先，不考虑路况，仅走距离最短的路线，但是可能存在穿越小路/小区的情况
     *      3，速度优先，不走快速路，例如京通快速路（因为策略迭代，建议使用13）
     *      4，躲避拥堵，但是可能会存在绕路的情况，耗时可能较长
     *      5，多策略（同时使用速度优先、费用优先、距离优先三个策略计算路径）
     *      6，速度优先，不走高速，但是不排除走其余收费路段
     *      7，费用优先，不走高速且避免所有收费路段
     *      8，躲避拥堵和收费，可能存在走高速的情况，并且考虑路况不走拥堵路线，但有可能存在绕路和时间较长
     *      9，躲避拥堵和收费，不走高速
     * @type {number}
     * @memberof IdirectionDriving
     */
    strategy?: number;

    /**
     *
     * 途经点
     * @example
     * 经度和纬度用","分割，经度在前，纬度在后，小数点后不超过6位，坐标点之间用";"分隔
     * 最大数目：16个坐标点。如果输入多个途径点，则按照用户输入的顺序进行路径规划
     * @type {string}
     * @memberof IdirectionDriving
     */
    waypoints?: string;

    /**
     *
     * 避让区域
     * @example
     * 区域避让，支持32个避让区域
     * 每个区域最多可有16个顶点 经度和纬度用","分割，经度在前，纬度在后，小数点后不超过6位
     * 坐标点之间用";"分隔，区域之间用"|"分隔
     * 如果是四边形则有四个坐标点，如果是五边形则有五个坐标点
     * 同时传入避让区域及避让道路，仅支持避让道路
     * 避让区域不能超过81平方公里，否则避让区域会失效
     * @type {string}
     * @memberof IdirectionDriving
     */
    avoidpolygons?: string;

    /**
     *
     * 避让道路名
     * @example
     * 只支持一条避让道路
     * @type {string}
     * @memberof IdirectionDriving
     */
    avoidroad?: string;

    /**
     *
     * 用汉字填入车牌省份缩写，用于判断是否限行
     * @example
     * 京
     * @type {string}
     * @memberof IdirectionDriving
     */
    province?: string;

    /**
     *
     * 填入除省份及标点之外，车牌的字母和数字（需大写）。用于判断限行相关
     * @example
     * 例如:NH1N11 支持6位传统车牌和7位新能源车牌
     * @type {string}
     * @memberof IdirectionDriving
     */
    number?: string;

    /**
     *
     * 车辆类型
     * @example
     * 0：普通汽车(默认值)
     * 1：纯电动车
     * 2：插电混动车
     * @type {number}
     * @memberof IdirectionDriving
     */
    cartype?: number;

    /**
     *
     * 在路径规划中，是否使用轮渡
     * @example
     * 0:使用渡轮(默认)
     * 1:不使用渡轮
     * @type {number}
     * @memberof IdirectionDriving
     */
    ferry?: number;

    /**
     *
     * 是否返回路径聚合信息
     * @example
     * false:不返回路径聚合信息(默认)
     * true:返回路径聚合信息，在steps上层增加roads做聚合
     * @type {boolean}
     * @memberof IdirectionDriving
     */
    roadaggregation?: boolean;

    /**
     *
     * 是否返回steps字段内容
     * @example
     * 当取值为0时，steps字段内容正常返回
     * 当取值为1时，steps字段内容为空
     * @type {boolean}
     * @memberof IdirectionDriving
     */
    nosteps?: boolean;

    /**
     *
     * 数字签名
     * @example
     * 数字签名认证用户必填
     * @type {string}
     * @memberof IdirectionDriving
     */
    sig?: string;

    /**
     *
     * 返回数据格式类型
     * @example
     * 可选值：JSON(默认)，XML
     * @type {string}
     * @memberof IdirectionDriving
     */
    output?: string;

    /**
     *
     * 返回结果控制
     * @example
     * 可选值：base/all
     * base:返回基本信息(默认)
     * all：返回全部信息
     * @type {string}
     * @memberof IdirectionDriving
     */
    extensions?: string;
}