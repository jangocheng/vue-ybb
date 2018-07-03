<template>
  <div>
		<!--container-->
		<div class="mine-order-header">
			<div class="hhxh-flex">
				<a class="flex-1 text-center title-0" :class="{ active: isInfo === '1'}" @click="SelectedRecord">积分记录</a>
				<a class="flex-1 text-center title-0" :class="{ active: isInfo === '2'}" @click="SelectedRedeem">兑换记录</a>
			</div>
		</div>
		<div>
		  <div class="ybb-list order-list-box"  v-if="isInfo === '1'">
			
		    <mt-loadmore :bottom-method="loadMoreIntegralsslist" :bottom-all-loaded="IntegralLoaded" ref="loadmore1" :auto-fill=false >
		      <IntegralRecordList :items="integrals""></IntegralRecordList>
		      <no-data :items="integrals"></no-data>
		    </mt-loadmore>
		    
		    
		  </div>
		  <div class="ybb-list order-list-box" v-if="isInfo === '2'">
		     <mt-loadmore :bottom-method="loadMoreOrderslist" :bottom-all-loaded="OrdersingallLoaded" ref="loadmore" :auto-fill=false >
		      <ForRecordList :items="forRecords" @reload="reload"></ForRecordList>
		      <no-data :items="forRecords"></no-data>
		    </mt-loadmore>
		  </div>
		</div>
		<!--container end-->
  </div>
</template>

<script>
import ForRecordList from 'components/ForRecordList'
import IntegralRecordList from 'components/IntegralRecordList'
import priceShopService from 'SERVICES/priceShopService'
import noData from 'components/noData'
import $ from 'jquery'
export default {
  components: {
    ForRecordList,
    IntegralRecordList,
    noData
  },
  data: () => ({
    integrals: [],
    pageNo1: 1,
    pageSize1: 12,
    pageNo: 1,
    pageSize: 12,
    isInfo: '1',
    IntegralLoaded: false,
    OrdersingallLoaded: false,
    forRecords: [],
    routerName: '',
    loading: false
  }),
  created () {
    this.loadIntegralslist()
  },
  activated () {
    this.isInfo = '2'
    this.forRecords = this.$store.state.forRecords
    this.pageNo = this.$store.state.page
    $(window).scrollTop(sessionStorage.getItem('scorllTop'))
  },
  methods: {
    loadIntegralslist: function () {
      priceShopService.loadIntegralslist(this.pageNo1, this.pageSize1).then(res => {
        let list = res.t.scoreDetailList
        if (list.length === 0) {
          this.IntegralLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize1) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.integrals.push(list[i])
          }
          if (list.length === this.pageSize1) {
            this.pageNo1 += 1
          } else { // 没有更多的数据了
            this.IntegralLoaded = true
          }
        }
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
            this.$store.state.forRecords = this.forRecords
          }
          if (list.length === this.pageSize) { // 没有更多的数据了
            this.pageNo += 1
            this.$store.state.page = this.pageNo
          } else {
            this.OrdersingallLoaded = true
          }
        }
      })
    },
    loadMoreIntegralsslist: function () {
      // 加载更多数据
      this.loadIntegralslist()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore1.onBottomLoaded()
    },
    loadMoreOrderslist: function () {
      // 加载更多数据
      this.loadOrderslist()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    },
    SelectedRecord: function () {
      this.isInfo = '1'
      this.initPage()
      this.integrals = []
      this.loadIntegralslist()
    },
    SelectedRedeem: function () {
      this.isInfo = '2'
      this.initPage()
      this.forRecords = []
      this.loadOrderslist()
    },
    initPage: function () {
      this.pageNo1 = 1
      this.pageNo = 1
      this.pageSize = 12
      this.pageSize1 = 12
    },
    reload: function () {
      this.forRecords = []
      this.initPage()
      this.loadOrderslist()
    }
  }
}
</script>
