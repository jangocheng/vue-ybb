import Vue from 'vue'
import Router from 'vue-router'
import hooks from './hooks/'

import Index from 'page/Index'
import Login from 'page/Login'
import Mine from 'page/Mine'
import MineOrder from 'page/MineOrder'
import OrderDetail from 'page/OrderDetail'
import MineInfo from 'page/MineInfo'
import SwipeInfo from 'page/SwipeInfo'
import PriceShop from 'page/PriceShop'
import PgMaterialDetail from 'page/PgMaterialDetail'
import IntegralRules from 'page/IntegralRules'
import PgMaterialInfo from 'page/PgMaterialInfo'
import ForRecordDetail from 'page/ForRecordDetail'
import MinePreferential from 'page/MinePreferential'
import QualityService from 'page/QualityService'
import MineChat from 'page/MineChat'
import MaintainSrv from 'page/MaintainSrv'
import MaiBillSearch from 'page/MaiBillSearch'
import MaiBook from 'page/MaiBook'
import MaiList from 'page/MaiList'
import MaiDetail from 'page/MaiDetail'
import MaiLoginTest from 'page/MaiLoginTest'
import MaiSure from 'page/MaiSure'
import MineDot from 'page/MineDot'
import MineDotDetail from 'page/MineDotDetail'
import Address from 'page/Address'
import MineBookSalesOutlets from 'page/MineBookSalesOutlets'
import MineBookWatch from 'page/MineBookWatch'
import UpLoad from 'page/upLoad'
import Ces from 'page/Ces'
import MaiDetailSearch from 'page/MaiDetailSearch'

import SalesOutlets from 'page/SalesOutlets'
import SalesOutletsMap from 'page/SalesOutletsMap'
import ProductCenterDetail from 'page/ProductCenterDetail'
import ProductCenterInfo from 'page/ProductCenterInfo'
import ProductCenterSalesOutlets from 'page/ProductCenterSalesOutlets'
import Integralrecord from 'page/Integralrecord'

import TradeExchange from 'page/TradeExchange'
import TradeList from 'page/TradeList'

import MineBookWatchAdd from 'page/MineBookWatchAdd'
import evaluate from 'page/evaluate'
import repairknowledge from 'page/repairknowledge'
import commonProblem from 'page/commonProblem'
import MemActivity from 'page/MemActivity'
import DynamicList from 'page/DynamicList'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: evaluate,
      meta: {
        title: '评价',
        needAuth: true
      }
    },
    {
      path: '/Integralrecord',
      name: 'Integralrecord',
      component: Integralrecord,
      meta: {
        title: '积分记录',
        needAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/ProductCenterSalesOutlets',
      name: 'ProductCenterSalesOutlets',
      component: ProductCenterSalesOutlets,
      meta: {
        title: '选择门店',
        needAuth: true
      }
    },
    {
      path: '/ProductCenterDetail/:productCenterId',
      name: 'ProductCenterDetail',
      component: ProductCenterDetail,
      meta: {
        title: '商品详情',
        needAuth: false
      }
    },
    {
      path: '/ProductCenterInfo/:productCenterId',
      name: 'ProductCenterInfo',
      component: ProductCenterInfo,
      meta: {
        title: '商品预约',
        needAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Mine',
      name: 'Mine',
      component: Mine,
      meta: {
        title: '我的',
        needAuth: true,
        keepAlive: false
      }
    },
    {
      path: '/PriceShop',
      name: 'PriceShop',
      component: PriceShop,
      meta: {
        title: '积分商城',
        needAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/PgMaterialDetail/:pgMaterialDetailId',
      name: 'PgMaterialDetail',
      component: PgMaterialDetail,
      meta: {
        title: '积分商品详情',
        needAuth: true
      }
    },
    {
      path: '/ForRecordDetail/:ForRecordDetailId',
      name: 'ForRecordDetail',
      component: ForRecordDetail,
      meta: {
        title: '积分兑换详情',
        needAuth: true
      }
    },
    {
      path: '/IntegralRules',
      name: 'IntegralRules',
      component: IntegralRules,
      meta: {
        title: '积分兑换规则'
      }
    },
    {
      path: '/MinePreferential',
      name: 'MinePreferential',
      component: MinePreferential,
      meta: {
        title: '我的优惠'
      }
    },
    {
      path: '/QualityService',
      name: 'QualityService',
      component: QualityService,
      meta: {
        title: '质保服务',
        keepAlive: false
      }
    },
    {
      path: '/MaintainSrv',
      name: 'MaintainSrv',
      component: MaintainSrv,
      meta: {
        title: '维修',
        needAuth: true,
        keepAlive: false
      }
    },
    {
      path: '/MaiBillSearch',
      name: 'MaiBillSearch',
      component: MaiBillSearch,
      meta: {
        title: '工单查询',
        keepAlive: false,
        needAuth: true
      }
    },
    {
      path: '/MaiDetailSearch',
      name: 'MaiDetailSearch',
      component: MaiDetailSearch,
      meta: {
        title: '预约详情(搜索进入)',
        keepAlive: false,
        needAuth: true
      }
    },
    {
      path: '/UpLoad',
      name: 'UpLoad',
      component: UpLoad,
      meta: {
        title: '图片上传',
        keepAlive: false,
        needAuth: true
      }
    },
    {
      path: '/Ces',
      name: 'Ces',
      component: Ces,
      meta: {
        title: '测试',
        needAuth: true
      }
    },
    {
      path: '/MaiSure',
      name: 'MaiSure',
      component: MaiSure,
      meta: {
        title: '我的维修',
        needAuth: true
      }
    },
    {
      path: '/MineDot',
      name: 'MineDot',
      component: MineDot,
      meta: {
        title: '维修网点',
        keepAlive: true
      }
    },
    {
      path: '/MineBookSalesOutlets',
      name: 'MineBookSalesOutlets',
      component: MineBookSalesOutlets,
      meta: {
        title: '维修网点获取',
        needAuth: true
      }
    },
    {
      path: '/MineDotDetail',
      name: 'MineDotDetail',
      component: MineDotDetail,
      meta: {
        title: '维修网点详情',
        needAuth: true
      }
    },
    {
      path: '/MineBookWatch',
      name: 'MineBookWatch',
      component: MineBookWatch,
      meta: {
        title: '用户手表获取',
        needAuth: true
      }
    },
    {
      path: '/Address',
      name: 'Address',
      component: Address,
      meta: {
        title: '维修门店选择',
        needAuth: true
      }
    },
    {
      path: '/MaiBook',
      name: 'MaiBook',
      component: MaiBook,
      meta: {
        title: '维修预约',
        keepAlive: false,
        needAuth: true
      }
    },
    {
      path: '/MaiList',
      name: 'MaiList',
      component: MaiList,
      meta: {
        title: '维修列表',
        needAuth: true,
        keepAlive: false
      }
    },
    {
      path: '/MaiLoginTest',
      name: 'MaiLoginTest',
      component: MaiLoginTest,
      meta: {
        title: '维修测试登陆口',
        keepAlive: false
      }
    },
    {
      path: '/MaiDetail',
      name: 'MaiDetail',
      component: MaiDetail,
      meta: {
        title: '维修详情(列表进入)',
        needAuth: true,
        keepAlive: false
      }
    },
    {
      path: '/MineChat',
      name: 'MineChat',
      component: MineChat,
      meta: {
        title: '咨询购买',
        keepAlive: false
      }
    },
    {
      path: '/PgMaterialInfo/:pgMaterialDetailId',
      name: 'PgMaterialInfo',
      component: PgMaterialInfo,
      meta: {
        title: '积分兑换',
        needAuth: true
      }
    },
    {
      path: '/MineOrder',
      name: 'MineOrder',
      component: MineOrder,
      meta: {
        title: '我的订单',
        needAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {
        title: '订单详情',
        needAuth: true,
        keepAlive: false
      }
    },
    {
      path: '/MineInfo',
      name: 'MineInfo',
      component: MineInfo,
      meta: {
        title: '我的资料',
        needAuth: true,
        keepAlive: false
      }
    },
    {
      path: '/SwipeInfo/:id',
      name: 'SwipeInfo',
      component: SwipeInfo
    },
    {
      path: '/SalesOutlets',
      name: 'SalesOutlets',
      component: SalesOutlets,
      meta: {
        title: '销售网点查询',
       // needAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/SalesOutletsMap/:name/:addr/:phone',
      name: 'SalesOutletsMap',
      component: SalesOutletsMap,
      meta: {
        title: '网点详情',
        needAuth: true,
        keepAlive: false
      }
    },
    {
      path: '/TradeExchange',
      name: 'TradeExchange',
      component: TradeExchange,
      meta: {
        title: '确认兑换',
        needAuth: true,
        keepAlive: false
      }
    },
    {
      path: '/TradeList',
      name: 'TradeList',
      component: TradeList,
      meta: {
        title: '我的抵换卷',
        needAuth: true,
        keepAlive: false
      }
    },
    {
      path: '/MineBookWatchAdd',
      name: 'MineBookWatchAdd',
      component: MineBookWatchAdd,
      meta: {
        title: '添加手表类型',
        needAuth: true
      }
    },
    {
      path: '/repairknowledge',
      name: 'repairknowledge',
      component: repairknowledge,
      meta: {
        title: '维修常识',
        needAuth: true
      }
    },
    {
      path: '/commonProblem',
      name: 'commonProblem',
      component: commonProblem,
      meta: {
        title: '常见问题',
        needAuth: true
      }
    },
    {
      path: '/DynamicList',
      name: 'DynamicList',
      component: DynamicList,
      meta: {
        title: '品牌动态',
        needAuth: true
      }
    },
    {
      path: '/MemActivity',
      name: 'MemActivity',
      component: MemActivity,
      meta: {
        title: '会员动态',
        needAuth: true
      }
    }
  ]
})

hooks(router)

export default router
