<!-- 页面模版 -->
<template>
  <div>
    <!--header-->
    <com-header :title="headerData.title" :toLink="headerData.toLink"></com-header>
    <!--header end-->

    <!--container-->
    <div class="mine-order-header">
      <div class="hhxh-flex">
        <a class="flex-1 text-center title-0" :class="{ active: isInfo === '1'}" @click="selectBook">预约订单</a>
        <a class="flex-1 text-center title-0" :class="{ active: isInfo === '2'}" @click="selectBuy">购买订单</a>
      </div>
    </div>
    <mt-loadmore :bottom-method="loadMoreBookingOrder" :bottom-all-loaded="bookingallLoaded" ref="loadmore" :auto-fill=false >
      <booking-list :items="bookingItems" v-show="isInfo === '1'"></booking-list>
      <no-data :items="bookingItems" v-show="isInfo === '1'"></no-data>
    </mt-loadmore>

    <mt-loadmore :bottom-method="loadMoreBuyOrder" :bottom-all-loaded="buyallLoaded" ref="loadmore" :auto-fill=false >
      <buy-list :items="buyItems" v-show="isInfo === '2'"></buy-list>
      <no-data :items="buyItems" v-show="isInfo === '2'"></no-data>
    </mt-loadmore>
    <!--container end-->
  </div>
</template>
<script>
import comHeader from 'components/comHeader'
import noData from 'components/noData'
import bookingList from 'components/BookingList'
import buyList from 'components/BuyList'
import mineOrderService from 'SERVICES/mineOrderService'
import $ from 'jquery'
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
    isInfo: '1',
    bookingallLoaded: false,
    buyallLoaded: false,
    pageSize: 10,
    buyPageNo: 1,
    buyItems: [],
    bookingPageNo: 1,
    bookingItems: []
  }),
  // created () {
  //   this.selectBook()
  // },
  activated () {
    this.isInfo = this.$store.state.mineOrder.isInfo
    if (this.isInfo === '1') {
      this.bookingItems = this.$store.state.mineOrder.bookingItems
      this.bookingPageNo = this.$store.state.mineOrder.bookingPageNo
    } else if (this.isInfo === '2') {
      this.buyItems = this.$store.state.mineOrder.buyItems
      this.buyPageNo = this.$store.state.mineOrder.buyPageNo
    }
    $(window).scrollTop(sessionStorage.getItem('scrollTop'))
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Mine') {
      sessionStorage.clear()
    } else {
      sessionStorage.setItem('scrollTop', $(window).scrollTop())
    }
    next()
  },
  beforeRouteEnter (to, from, next) {
    if (from.fullPath === '/Mine') {
      to.meta.keepAlive = true
      next(vm => {
        vm.selectBook()
      })
    } else {
      next()
    }
  },
  methods: {
    selectBook: function () {
      this.isInfo = '1'
      this.$store.state.mineOrder.isInfo = this.isInfo
      this.bookingPageNo = 1
      this.pageSize = 10
      this.bookingItems = []
      this.loadBookinglist()
    },
    selectBuy: function () {
      this.isInfo = '2'
      this.$store.state.mineOrder.isInfo = this.isInfo
      this.buyPageNo = 1
      this.pageSize = 10
      this.buyItems = []
      this.loadBuylist()
    },
    loadBookinglist: function () {
      mineOrderService.loadBookinglist(this.bookingPageNo, this.pageSize).then(res => {
        let list = res.t
        if (list.length === 0) {
          this.bookingallLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.bookingItems.push(list[i])
            this.$store.state.mineOrder.bookingItems = this.bookingItems
          }
          if (list.length === this.pageSize) {
            this.bookingPageNo += 1
            this.$store.state.mineOrder.bookingPageNo = this.bookingPageNo
          } else {
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
          this.buyallLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.buyItems.push(list[i])
            this.$store.state.mineOrder.buyItems = this.buyItems
          }
          if (list.length === this.pageSize) {
            this.buyPageNo += 1
            this.$store.state.mineOrder.buyPageNo = this.buyPageNo
          } else {
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
    }
  }
}
</script>
