<!-- 页面模版 -->
<template>
  <div>
    <!--header-->
    <header class="mint-header is-fixed">
      <div class="mint-header-button is-left">
        <a class="router-link-active" @click="goback()">
          <button class="mint-button mint-button--default mint-button--normal">
            <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
          </button>
        </a>
      </div>
      <h1 class="mint-header-title title-3">我的手表</h1>
      <div class="mint-header-button is-right"></div>
    </header>

    <div class="header-empty"></div>
    <!--header end-->
    <!--container-->
<!--     <mt-loadmore :bottom-method="loadMoreBuyOrder" :bottom-all-loaded="buyallLoaded" ref="loadmore" :auto-fill=false >
      <buy-list :items="buyItems" v-show="isInfo === true"></buy-list>
      <no-data :items="buyItems" v-show="isInfo === true"></no-data>
    </mt-loadmore> -->
    <div class="ybb-list order-list-box" v-for="item in buyItems" @click="onClickBook(item.gwGoods.styleID, item.id, '')">
      <a class="mint-cell">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text gray">{{item.saleDate}}</span>
          </div>
        </div>
      </a>
      <a class="mint-cell">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-value"><img v-lazy="item.gwGoods.imgUrl" class="img-box1"></div>
          <div class="mint-cell-title">
            <div class="text-overflow1">{{item.gwGoods.title}}{{item.gwGoods.styleID}}</div>
            <div class="m-t-5"><span class="price-box">￥<i>{{item.amount}}</i></span></div>
          </div>
        </div>
      </a>
      <span class="mint-cell-mask"></span> 
    </div>
    <div class="ybb-list order-list-box" v-for="item in watchItems" @click="onClickBook(item.number, item.id, '1')">
      <a class="mint-cell">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text gray">{{item.buyDate}}</span>
          </div>
        </div>
      </a>
      <a class="mint-cell">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-value"><img src="../assets/watch-default.jpg" class="img-box1"></div>
          <div class="mint-cell-title">
            <div class="text-overflow1">{{item.name}}{{item.number}}</div>
          </div>
        </div>
      </a>
      <span class="mint-cell-mask"></span> 
    </div>
    <div class="no-data" v-if="buyItems.length <= 0 && watchItems.length <= 0">
      <img src="../assets/no-data.png">
      <div class="gray text-center msg title-3">暂时没有数据哦！</div>
    </div>
    <!--container end-->
    <!--footer-->
    <div class="yuyue-submit-empty"></div>
    <div class="yuyue-submit is-fixed" style="background-color: #d2ac67;color: #fff; z-index: 99;" @click="add">
      <div class="hhxh-flex" >
        <div class="flex-1 text-center" >添加其他手表</div>
      </div>
    </div>
  </div>
</template>
<script>
import comHeader from 'components/comHeader'
import noData from 'components/noData'
import bookingList from 'components/BookingList'
import buyList from 'components/BuyListBook'
import mineOrderService from 'SERVICES/mineOrderService'
// import helpers from '../utils/helpers'
// import validators from '../utils/validators'
// import {Toast, MessageBox} from 'mint-ui'
export default {
  components: {
    comHeader,
    noData,
    bookingList,
    buyList
  },
  data: () => ({
    headerData: {
      title: '我的订单',
      toLink: '/Mine'
    },
    isInfo: true,
    bookingallLoaded: false,
    buyallLoaded: false,
    pageSize: 10,
    buyPageNo: 1,
    buyItems: [],
    watchItems: [],
    bookingPageNo: 1,
    bookingItems: [],
    list: [],
    addressId: '',
    addressname: '',
    iType: []
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadMaiBook()
    this.loadBookinglist()
    this.loadBuylist()
    this.loadAsorderWatchList()
  },
  methods: {
    loadBookinglist: function () {
      mineOrderService.loadBookinglist(this.bookingPageNo, this.pageSize).then(res => {
        this.list = res.t
        if (this.list.length === 0) {
          // 若数据已全部获取完毕，将绑定到组件bottom-all-loaded属性的变量赋值为true，这样bottom-method就不会再次执行了
          this.bookingallLoaded = true
        } else if (this.list.length > 0 && this.list.length <= this.pageSize) {
          for (let i = 0; i <= this.list.length - 1; i++) {
            this.bookingItems.push(this.list[i])
          }
          if (this.list.length === this.pageSize) { // 长度达到每页的最大长度，说明后面可能还有数据
            this.bookingPageNo += 1
          } else { // 没有更多的数据了
            this.bookingallLoaded = true
          }
        }
        console.info('bookingPageNo===>' + this.bookingPageNo)
      })
    },
    loadMoreBookingOrder: function () {
      // 加载更多数据
      this.loadBookinglist()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    },
    loadBuylist: function () {
      mineOrderService.loadBuylist(this.buyPageNo, this.pageSize).then(res => {
        let list = res.t
        if (list.length === 0) {
          // 数据已全部获取完毕或者没有数据了，将绑定到组件bottom-all-loaded属性的变量赋值为true，这样bottom-method就不会再次执行了
          this.buyallLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.buyItems.push(list[i])
          }
          if (list.length === this.pageSize) { // 长度达到每页的最大长度，说明后面可能还有数据
            this.buyPageNo += 1
          } else { // 没有更多的数据了
            this.buyallLoaded = true
          }
        }
        console.info('buyPageNo===>' + this.buyPageNo)
      })
    },
    loadMoreBuyOrder: function () {
      // 加载更多数据
      this.loadBuylist()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    },
    goback: function () {
      this.$router.go(-1)
    },
    add: function () {
      this.$router.push('MineBookWatchAdd')
    },
    loadAsorderWatchList: function () {
      mineOrderService.loadAsorderWatchList().then(res => {
        let list = res.t
        for (let i = 0; i <= list.length - 1; i++) {
          this.watchItems.push(list[i])
        }
      })
    },
    onClickBook: function (WatchNumber, WatchId, type) {
      WatchNumber !== '' ? this.$router.replace({name: 'MaiBook', query: {WatchNumber: WatchNumber, WatchId: WatchId, type: type}}) : alert('产品id为空')
    },
    loadMaiBook: function () {
      this.WatchId = this.$route.query.WatchId
      this.dateValue = this.$route.query.dateValue
      this.WatchNumber = this.$route.query.WatchNumber
      this.addressId = this.$route.query.addressId
      this.addressname = this.$route.query.addressname
    }
  }
}
</script>
