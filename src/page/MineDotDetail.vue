<!-- 页面模版 -->
<template>
  <div>
    <!--header-->
    <com-header :title="headerData.title" :toLink="headerData.toLink"></com-header>
    <!--header end-->

    <!--container-->
    <div class="dot-map-box" id="allmap"></div>
    <div class="dot-detail-box">
      <div class="title-1 name-box hhxh-flex hhxh-vertical-top">
        <div class="flex-1">{{name}}</div>
        <div class="flex-0 blue"><a @click="getNavigation"><img src="../assets/map-search.png" style="vertical-align: middle;height: 16px;">&nbsp;线路查询</a></div>
      </div>
      <div class="txt-box m-t-8">
        <div class="gray title-0"><img src="../assets/dot-location.png">{{address}}</div>
        <div class="gray title-0"><img src="../assets/dot-tel.png">
        <a :href="'tel:'+telephone" class="gray">{{telephone}}</a></div>
      </div>
    </div>
    <!--container end-->
    <div class="yuyue-submit-empty"></div>
    <div class="yuyue-submit is-fixed" v-if="path === '/MineBookSalesOutlets' || path === '/ProductCenterSalesOutlets'">
      <div class="hhxh-flex">
        <div class="flex-1">
          <button class="mint-button mint-button--default mint-button--large ybb-btn" @click="goChoose()"><label class="mint-button-text title-1">选择</label></button>
        </div>
      </div>
    </div>
    <!--fonter end-->
  </div>
</template>
<script>
import comHeader from 'components/comHeader'
import BMap from 'BMap'
export default {
  components: {
    comHeader
  },
  data: () => ({
    headerData: {
      title: '网点详情',
      toLink: '/SalesOutlets'
    },
    productData: {
      userName: '',
      arrivalDate: '',
      shopId: '',
      address: ''
    },
    productCenterId: '',
    id: '',
    name: '',
    address: '',
    telephone: '',
    path: ''
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadMap()
    // this.ready() // 如果在此处直接调用this.ready()方法，将无法加载地图
  },
  mounted () {
    this.ready()
  },
  methods: {
    loadMap: function () {
      this.id = this.$route.query.id
      this.name = this.$route.query.name
      this.address = this.$route.query.addr
      this.telephone = this.$route.query.phone
      this.path = this.$route.query.path
      this.productData = this.$route.query.data
      this.productCenterId = this.$route.query.productCenterId
      // setTimeout(this.ready, 0)
    },
    getNavigation: function () {
      var addressUrl = 'http://api.map.baidu.com/geocoder?address=' + this.address + '&output=html&src=yourCompanyN'
      window.location.href = addressUrl
    },
    ready: function () {
      var map = new BMap.Map('allmap')
      map.enableScrollWheelZoom(true)
      console.log(map)

      var localSearch = new BMap.LocalSearch(map)
      // localSearch.enableAutoViewport() // 允许自动调节窗体大小
      map.clearOverlays() // 清空原来的标注
      localSearch.setSearchCompleteCallback(function (searchResult) {
        var poi = searchResult.getPoi(0)
        map.centerAndZoom(poi.point, 20)
        var point = new BMap.Point(poi.point.lng, poi.point.lat)
        var marker = new BMap.Marker(point) // 创建标注，为要查询的地方对应的经纬度
        map.addOverlay(marker)
      })
      localSearch.search(this.$route.query.addr)
    },
    goChoose: function () {
      if (this.path === '/MineBookSalesOutlets') {
        this.$router.push({name: 'MaiBook', query: {addressname: this.name, addressId: this.id, phone: this.telephone}})
      } else if (this.path === '/ProductCenterSalesOutlets') {
        this.$router.push({name: 'ProductCenterInfo', query: {name: this.name, id: this.id, data: this.productData, productCenterId: this.productCenterId}})
      }
    }
  }
}
</script>
<style>
  /* 去掉地图左下角的百度LOGO */
  .anchorBL {
    display:none
  }
</style>
