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
    name: '',
    address: '',
    telephone: ''
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
      this.name = this.$route.params.name
      this.address = this.$route.params.addr
      this.telephone = this.$route.params.phone
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
      localSearch.search(this.$route.params.addr)
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
