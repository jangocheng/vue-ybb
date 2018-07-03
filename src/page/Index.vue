<template>
  <div>
    <div v-show="zModal == false">
      <swipe :items="swipeItems"></swipe>
      <div class="ybb-sr-box hhxh-flex">
      <!--<div class="flex-1 text-center" @click="goSalesOutlets">
        <img src="../assets/service-dot.png"><span class="title-1">销售门店</span>
      </div>
      <div class="flex-1 text-center" @click="goDot">
        <img src="../assets/repair-dot.png"><span class="title-1">维修网点</span>
      </div>-->
    </div>
        <productSelect></productSelect>
        <!--footer-->
        <div class="footer-empty"></div>
        <div class="mint-tabbar is-fixed ybb-footer">
          <a class="mint-tab-item is-selected">
            <div class="mint-tab-item-icon product"></div>
            <div class="mint-tab-item-label">首页</div>
          </a>
          <a class="mint-tab-item " @click="goMine">
            <div class="mint-tab-item-icon mine"></div>
            <div class="mint-tab-item-label">我的</div>
          </a>
          <a class="mint-tab-item" @click="goMai">
            <div class="mint-tab-item-icon soul"></div>
            <div class="mint-tab-item-label">售后</div>
          </a>
        </div>
    </div>
    <div class="index-mask-box" v-show="zModal == true"><img :src="makePhotoUrl(bigPicture)" @click="closeModal()"></div>
      <!--fonter end-->
  </div>
</template>
<script>
// 导航栏
import productSelect from 'components/ProductSelect'
// 轮播图片
import swipe from 'components/swipe'
// 特惠套餐
// 首页资源
// import {Toast} from 'mint-ui'
import productCenterService from 'SERVICES/productCenterService'
// import loginService from 'SERVICES/loginService'
import indexService from 'SERVICES/indexService'
import helpers from 'utils/helpers'
import $ from 'jquery'
export default {
  components: {
    productSelect,
    swipe
  },
  data: () => ({
    swipeItems: [],
    navigationItem: {},
    zModal: true
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    // this.ifAutoLogin()
    this.loadSwipeItems()
    this.getBigPicture()
  },
  beforeRouteLeave (to, from, next) {
    this.$store.state.index.scrolltop = $(window).scrollTop()
    next()
  },
  activated () {
    $(window).scrollTop(this.$store.state.index.scrolltop)
  },
  methods: {
    loadSwipeItems: function () {
      productCenterService.loadSwipeInfo().then(res => {
        let list = res.t.activityList
        this.swipeItems = []
        for (let i = 0; i <= list.length - 1; i++) {
          this.swipeItems.push(list[i])
        }
      })
    },
    getBigPicture () {
      indexService.getBigPicture().then(res => {
        if (res.t === null) {
          this.zModal = false
        } else {
          this.bigPicture = res.t.imageUrl
          this.$nextTick(rs => {
            this.zModal = true
          })
        }
      })
    },
    closeModal () {
      this.zModal = false
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      // console.info(url)
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    goSalesOutlets: function () {
      this.$router.push('SalesOutlets')
    },
    goMine: function () {
      this.$router.push('/Mine')
    },
    goMai: function () {
      this.$router.push('/MaintainSrv')
    },
    goDot: function () {
      this.$router.push('/MineDot')
    }
  }
}

</script>
