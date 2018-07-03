<template>
  <div>
    <!--header-->
    <header class="mint-header is-fixed">
      <div class="mint-header-button is-left">
        <a class="router-link-active" @click="goback">
          <button class="mint-button mint-button--default mint-button--normal">
            <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
          </button>
        </a>
      </div>
      <h1 class="mint-header-title title-3">双倍保障卡</h1>
      <div class="mint-header-button is-right"></div>
    </header>
    <div class="header-empty"></div>
    <!--header end-->
    <div class="zb-flag-box">
    <mt-loadmore :bottom-method="loadMoreQualityService" :bottom-all-loaded="qualityallLoaded" ref="loadmore" :auto-fill=false >
      <div class="item-box " v-for="item in qualityServiceItems">
        <div class="hhxh-flex">
          <div class="flex-0"><img src="../assets/zb-flag.png"></div>
          <div class="flex-1 txt1-box">
            <div class="hhxh-flex">
              <div class="flex-0">商品款号：</div>
              <div class="flex-1">{{item.productCode}}</div>
            </div>
            <div class="hhxh-flex hhxh-vertical-top">
              <div class="flex-0">购买门店：</div>
              <div class="flex-1" >{{item.shopName}}</div>
            </div>
            <div class="hhxh-flex">
              <div class="flex-0">购买日期：</div>
              <div class="flex-1">{{item.saleDate}}</div>
            </div>
            <div class="hhxh-flex">
              <div class="flex-0">质保日期：</div>
              <div class="flex-1">{{item.expireDate}}</div>
            </div>
            <div class="hhxh-flex">
              <div class="flex-0">保障卡号：</div>
              <div class="flex-1">{{item.cardNo}}</div>
            </div>
            
          </div>
        </div>
      </div>
      <no-data :items="qualityServiceItems"></no-data>
    </mt-loadmore>
    </div>
  </div>
</template>

<script>
import comHeader from 'components/comHeader'
import noData from 'components/noData'
import qualityServiceDetail from 'components/QualityServiceDetail'
import qualityService from 'SERVICES/qualityService'
// import {Toast} from 'mint-ui'
export default {
  components: {
    comHeader,
    noData,
    qualityServiceDetail
  },
  data: () => ({
    headerData: {
      title: '质保服务',
      toLink: '/Mine'
    },
    isInfo: false,
    qualityallLoaded: false,
    pageNo: 1,
    pageSize: 10,
    qualityServiceItems: [],
    detailItem: {}
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadQualityServiceList()
  },
  methods: {
    loadQualityServiceList: function () {
      qualityService.loadQualityServiceList(this.pageNo, this.pageSize).then(res => {
        let list = res.t
        if (list.length === 0) {
          // 若数据已全部获取完毕，将绑定到组件bottom-all-loaded属性的变量赋值为true，这样bottom-method就不会再次执行了
          this.qualityallLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            if (list[i].cardNo !== '') {
              this.qualityServiceItems.push(list[i])
            }
          }
          if (list.length === this.pageSize) { // 长度达到每页的最大长度，说明后面可能还有数据
            this.pageNo += 1
          } else { // 没有更多的数据了
            this.qualityallLoaded = true
          }
        }
        console.log('length=' + list.length)
        console.info('pageNo===>' + this.pageNo)
      })
    },
    loadMoreQualityService: function () {
      // 加载更多数据
      this.loadQualityServiceList()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    },
    /* seeDetail: function (id) {
      this.isInfo = true
      this.detailItem = {}
      qualityService.loadQualityServiceDetail(id).then(res => {
        this.detailItem = res.t
      })
    }, */
    hiddenDetail: function () {
      this.isInfo = false
    },
    goback: function () {
      window.history.back()
    }
  }
}
</script>
