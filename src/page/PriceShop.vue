<template>
<div>
<com-header :title="headerData.title" :toLink="headerData.toLink"></com-header>
    <div class="jf-mine-box hhxh-flex hhxh-justify-center">
     <div class="jf-rule-box" @click="goMessage">积分规则&nbsp;<img src="../assets/question.png"></div>
     <div>
       <div class="img-box"><img v-bind:src="data.photo" :onerror="headImg" ></div>
       <div class="text-center m-t-8">当前积分：<span class="title-3">{{data.remainScore}}</span></div>
     </div>
    </div>
    <!-- abstractDesc -->
    <a class="jf-see-btn text-center title-0" @click="goToIntegralrecord">积分查询</a>
  <div class="jf-mine-list">
    <div class="jf-mine-tab-header hhxh-flex">
        <div class="jf-mine-item flex-1 item" :class="{ active: isInfo === '1'}" @click="SelectedGift"><span>礼品兑换</span></div>
        <div class="jf-mine-item flex-1 item" :class="{ active: isInfo === '2'}" @click="SelectedVoucher"><span>抵扣券兑换</span></div>
        <div class="jf-mine-item flex-1 item" :class="{ active: isInfo === '3'}" @click="SelectedService"><span>服务兑换</span></div>
    </div>
    <div class="jf-mine-container" v-if="isInfo === '1'">
      <mt-loadmore :bottom-method="loadMoreGoodslist" :bottom-all-loaded="GoodsingallLoaded" ref="loadmore" :auto-fill="false" >
        <PgMaterialList :items="pgMaterials"></PgMaterialList>
        <no-data :items="pgMaterials"></no-data>
      </mt-loadmore>
    </div>
    <div class="jf-mine-container" v-if="isInfo === '2'">
      <mt-loadmore :bottom-method="loadMoreGoodslist" :bottom-all-loaded="GoodsingallLoaded" ref="loadmore" :auto-fill="false" >
        <PgMaterialTwo :items="pgMaterialTwos"></PgMaterialTwo>
        <no-data :items="pgMaterialTwos"></no-data>
      </mt-loadmore>
    </div>
    <div class="jf-mine-container" v-if="isInfo === '3'">
      <mt-loadmore :bottom-method="loadMoreGoodslist" :bottom-all-loaded="GoodsingallLoaded" ref="loadmore" :auto-fill="false" >
        <PgMaterialThree :items="pgMaterialThrees"></PgMaterialThree>
        <no-data :items="pgMaterialThrees"></no-data>
      </mt-loadmore>
    </div>
  </div>
  <!--footer-->
    <!-- <div class="yuyue-submit-empty"></div>
    <div class="yuyue-submit is-fixed" v-show="showTrad === '0'" @click="selectVoucher()">
      <span class="mint-cell-mask"></span>
      <div class="hhxh-flex">
        <div class="flex-1 text-center blue">积分兑抵换券</div>
      </div>
    </div> -->
    
    <!--fonter end-->

    <!--弹出框-->
    <!-- <div class="mint-actionsheet jf-trade-msg" v-show="showTrad === '2'" style="z-index: 2001;">
      <ul class="mint-actionsheet-list">
        <li class="mint-actionsheet-listitem text-left">
          <div class="title-3">积分兑抵换卷</div>
          <div class="m-t-8 gray">当前积分：<span>{{data.remainScore}}</span></div>
        </li>
        <li class="mint-actionsheet-listitem ">
          <div class="text-left" style="min-height: 120px;">
            <div class="hhxh-flex hhxh-vertical-top">
              <div class="flex-0 gray">种类</div>
              <div class="m-l-10 flex-1">
                <button v-for="voucher in pgVoucher" v-bind:class="{'selected': voucher.id==voucherChoose}" @click.stop="voucherChoose = voucher.id">
                  {{voucher.amount}}元抵换卷<br />
                  <span >消耗{{voucher.ponits}}积分</span>
                </button>
              </div>
            </div>
            
          </div>
        </li>
      </ul>
      <a class="mint-actionsheet-button ybb-btn" @click="goExchange()">确认兑换</a>
    </div>
    <div class="v-modal" style="z-index: 2000;" v-show="showTrad === '2'" @click="showTrad = '1'"></div> -->
    <!--弹出框结束-->
</div>
</template>

<script>
import PgMaterialList from 'components/PgMaterialList'
import PgMaterialTwo from 'components/PgMaterialTwo'
import PgMaterialThree from 'components/PgMaterialThree'
import ForRecordList from 'components/ForRecordList'
import IntegralRecordList from 'components/IntegralRecordList'
import comHeader from 'components/comHeader'
import priceShopService from 'SERVICES/priceShopService'
import mineInfoService from 'SERVICES/mineInfoService'
import noData from 'components/noData'
export default {
  components: {
    PgMaterialList,
    PgMaterialTwo,
    PgMaterialThree,
    ForRecordList,
    IntegralRecordList,
    comHeader,
    noData
  },
  data: () => ({
    headImg: 'this.src="' + require('../assets/img.png') + '"',
    headerData: {
      title: '积分商城',
      toLink: '/Mine'
    },
    data: {
      photo: '',
      userName: '',
      mobile: '',
      areaId: '',
      provinceId: '',
      cityId: '',
      area: {},
      address: '',
      areaText: '',
      remainScore: ''
    },
    integrals: [],
    GoodsingallLoaded: false,
    OrdersingallLoaded: false,
    IntegralLoaded: false,
    isInfo: '1',
    showTrad: '1',
    forRecords: [],
    pgMaterials: [],
    pgVoucher: [],
    voucherChoose: '',
    disableCar: true, // 防止多次提交
    logos: [],
    pageNo: 1,
    pageSize: 12,
    itemsName: '礼品',
    pgMaterialTwos: [],
    pgMaterialThrees: [],
    timeStamp: new Date().getTime()
  }),
  beforeRouteEnter (to, from, next) {
    // console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
    // console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
    if (from.fullPath === '/Mine') {
      to.meta.keepAlive = false
    }
    sessionStorage.clear()
    next() // 大哥：过去吧！
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    // productService.loadProductInfo(to.params.productId).then(res => {
    //   next(vm => {
    //     res.t.description = vm.html_decode(res.t.description)
    //     // console.info('路由钩子 调用数据接口成功：res.t===>' + res.t)
    //     vm.productItem = res.t
    //   })
    // })
  },
  beforeRouteLeave (to, from, next) {
    if (to.fullPath === '/Integralrecord') {
      to.meta.keepAlive = false
    }
    next()
  },
  created () {
    this.loadMineInfo()
    this.loadGoodslist()
    // this.loadGoodslist()
    // this.loadOrderslist()
    // this.loadIntegralslist()
    //  this.loadVoucher()
  },
  activated () {
    this.loadMineInfo()
  },
  methods: {
    SelectedGift: function () {
      this.timeStamp = new Date().getTime()
      this.isInfo = '1'
      this.itemsName = '礼品'
      this.initPage()
      this.pgMaterials = []
      this.loadGoodslist()
    },
    SelectedVoucher: function () {
      this.timeStamp = new Date().getTime()
      this.isInfo = '2'
      this.itemsName = '抵扣券'
      this.initPage()
      this.pgMaterialTwos = []
      this.loadGoodslist()
    },
    SelectedService: function () {
      this.timeStamp = new Date().getTime()
      this.isInfo = '3'
      this.itemsName = '服务'
      this.initPage()
      this.pgMaterialThrees = []
      this.loadGoodslist()
    },
    initPage: function () {
      this.pageNo = 1
      this.pageSize = 12
      this.GoodsingallLoaded = false
    },
    loadGoodslist: function () {
      priceShopService.loadGoodslist(this.pageNo, this.pageSize, this.itemsName, this.timeStamp).then(
        res => {
          if (res.t.timeStamp === this.timeStamp + '') {
            let list = res.t.list
            if (list.length === 0) {
              this.GoodsingallLoaded = true
            } else if (list.length > 0 && list.length <= this.pageSize) {
              for (let i = 0; i <= list.length - 1; i++) {
                if (this.isInfo === '1') {
                  this.pgMaterials.push(list[i])
                } else if (this.isInfo === '2') {
                  this.pgMaterialTwos.push(list[i])
                } else if (this.isInfo === '3') {
                  this.pgMaterialThrees.push(list[i])
                }
              }
              if (list.length === this.pageSize) { // 长度达到每页的最大长度，说明后面可能还有数据
                this.pageNo += 1
              } else { // 没有更多的数据了
                this.GoodsingallLoaded = true
              }
            }
            console.info('pageNo===>' + this.pageNo)
          }
        })
    },
    isActive: function () {
      if (this.isInfo === '1') {
        return 'gift'
      } else if (this.isInfo === '2') {
        return 'voucher'
      } else if (this.isInfo === '3') {
        return 'service'
      }
    },
    loadMoreGoodslist: function () {
      // 加载更多数据
      this.loadGoodslist()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    },
    reload: function () {
      this.pageNo = 1
      this.forRecords = []
      this.loadOrderslist()
      this.loadMineInfo()
      this.loadVoucher()
    },
    goMessage: function () {
      this.$router.push('IntegralRules')
    },
    loadMineInfo: function () {
      mineInfoService.loadMineInfo().then(res => {
        this.data.photo = res.t.member.photo || ''
        this.data.userName = res.t.member.userName || ''
        this.data.mobile = res.t.member.mobile || ''
        this.data.area = res.t.member.area || ''
        this.data.address = res.t.member.address || ''
        this.dateValue = this.data.birthday
        this.data.remainScore = res.t.member.remainScore
        // this.data.areaId = res.t.member.area.id
        // this.data.areaText = res.t.member.area.name
      })
    },
    loadOrderslist: function () {
      priceShopService.loadOrderslist(this.pageNo, this.pageSize).then(res => {
        let list = res.t
        if (list.length === 0) {
          // 若数据已全部获取完毕，将绑定到组件bottom-all-loaded属性的变量赋值为true，这样bottom-method就不会再次执行了
          this.OrdersingallLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.forRecords.push(list[i])
          }
          if (list.length === this.pageSize) { // 长度达到每页的最大长度，说明后面可能还有数据
            this.pageNo += 1
          } else { // 没有更多的数据了
            this.OrdersingallLoaded = true
          }
        }
        console.info('pageNo===>' + this.pageNo)
      })
    },
    loadMoreOrderslist: function () {
      // 加载更多数据
      this.loadOrderslist()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    },
    loadIntegralslist: function () {
      priceShopService.loadIntegralslist(this.pageNo, this.pageSize).then(res => {
        let list = res.t.scoreDetailList
        console.info('pageNo===>' + list)
        if (list.length === 0) {
          // 若数据已全部获取完毕，将绑定到组件bottom-all-loaded属性的变量赋值为true，这样bottom-method就不会再次执行了
          this.IntegralLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.integrals.push(list[i])
          }
          if (list.length === this.pageSize) { // 长度达到每页的最大长度，说明后面可能还有数据
            this.pageNo += 1
          } else { // 没有更多的数据了
            this.IntegralLoaded = true
          }
        }
      })
    },
    loadMoreIntegralsslist: function () {
      // 加载更多数据
      this.loadIntegralslist()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    },
    loadVoucher: function () {
      // 读取积分抵用券列表
      priceShopService.loadVoucher().then(res => {
        this.pgVoucher = res.t
        this.voucherChoose = this.pgVoucher[0].id
      })
    },
    selectVoucher: function () {
      this.showTrad = '2'
    },
    goToIntegralrecord: function () {
      this.$router.push({
        name: 'Integralrecord'
      })
    },
    goExchange: function () {
      this.showTrad = '1'
      let nowVoucher = ''
      for (var i = 0; i < this.pgVoucher.length; i++) {
        if (this.pgVoucher[i].id === this.voucherChoose) {
          nowVoucher = this.pgVoucher[i]
        }
      }
      this.$router.push({name: 'TradeExchange', params: {remainScore: this.data.remainScore, nowVoucher: nowVoucher}})
    }
  }
}
</script>

<style scoped>
 .mint-popup {
    width: 70%;
    height: 100%;
}
</style>
