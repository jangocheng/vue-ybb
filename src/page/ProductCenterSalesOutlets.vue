<!-- 页面模版 -->
<template>
  <div>
    <!--header-->
    <com-header :title="headerData.title" :toLink="headerData.toLink"></com-header>
    <!--header end-->

    <!--container-->
    <div class="mine-dot-search-box">
      <div class="hhxh-flex">
        <div class="flex-0 city-box text-overflow" @click="choiceArea">
          <span class="mint-cell-mask"></span>
          <img src="../assets/mine-dot-location-1.png">
          <span>{{choiceCity}}</span>
        </div>
        <div class="flex-1 dot-box m-r-5">
          <input type="search" class="mint-field-core" placeholder="请输入搜索条件" id="keyword" @keyup="onKeyPress($event.keyCode||$event.which)" v-model="searchName" >
        </div>
        <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4" :closeOnClickModal=false>
          <div class="picker-toolbar">
            <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>
            <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>
          </div>
          <mt-picker :slots="citySlots" @change="onCityChange" :visible-item-count="3"></mt-picker>
        </mt-popup>
      </div>
    </div>
    <div class="gray mine-dot-city">当前所在城市：<span >{{currentCity}}</span></div>
    <div class="soul-list-box1">
      <a class="mint-cell" v-for="item in items" @click="goMap(item.name, item.id, productCenterId)">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div class="mine-dot-item">
              <div class="hhxh-flex">
                <div class="flex-1 title-0">{{item.name}}</div>
                <div class="flex-0" @click.stop="goToMap(item.name, item.address, item.id, item.phone)"><img src="../assets/mine-dot-location-2.png"></div>
              </div>
              <div class="hhxh-flex m-t-8 gray">
                <div class="flex-1 m-r-10 text-overflow1">{{item.address}}</div>
                <div class="flex-0">{{item.distanceFormat}}</div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <no-data :items="items"></no-data>
    <!--container end-->
  </div>
</template>
<script>
import comHeader from 'components/comHeader'
import noData from 'components/noData'
import salesOutletsService from 'SERVICES/salesOutletsService'
import {Toast} from 'mint-ui'
import ENV from '../SERVICES/xhr/config'
import BMap from 'BMap'
// import {Toast, MessageBox} from 'mint-ui'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    comHeader,
    noData
  },
  data: () => ({
    headerData: {
      title: '选择门店',
      toLink: ''
    },
    isInfo: true,
    popupVisible: false,
    areaPicker: '',
    currentCity: '',
    currentAddress: '新能源大厦',
    choiceCity: '深圳市',
    choiceProvince: '',
    cityName: '',
    provinceName: '',
    searchName: '',
    productCenterId: '',
    userName: '',
    productData: {
      userName: '',
      arrivalDate: '',
      shopId: '',
      address: ''
    },
    data: {
      id: '',
      city: '',
      address: '',
      name: '',
      pageNo: 1,
      pageSize: 10
    },
    items: [],
    citySlots: [
      {
        flex: 1,
        values: Object.keys(address),
        className: 'slot1',
        textAlign: 'center'
      }, {
        divider: true,
        content: '-',
        className: 'slot2'
      }, {
        flex: 1,
        values: Object.values(address)[0],
        className: 'slot3',
        textAlign: 'center'
      }
    ]
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadAreaList()
    this.loadMaps()
    this.getLocation()
  },
  beforeRouteLeave (to, from, next) {
    if (to.fullPath === '/ProductCenterInfo') {
      to.meta.keepAlive = true
    }
    next()
  },
  methods: {
    goToMap: function (name, address, id, phone) {
      this.$router.push({name: 'MineDotDetail', query: {id: id, path: this.$route.path, name: name, addr: address, phone: phone, productCenterId: this.productCenterId, data: this.productData}})
    },
    goMap: function (name, id, productCenterId) {
      this.$router.push({name: 'ProductCenterInfo', query: {name: name, id: id, productCenterId: productCenterId, data: this.productData}})
    },
    loadMaps: function () {
      this.productData = this.$route.query.data
      this.productCenterId = this.$route.query.productCenterId
      // setTimeout(this.ready, 0)
    },
    positioning: function () {
      // 定位
      this.loadOutletsList()
    },
    loadAreaList: function () {
      salesOutletsService.loadAreaList().then(res => {
        if (res.t) {
          this.areaList = res.t
          address = this.areaList.areaList[0]
          this.citySlots[0].values = Object.keys(address)
          this.citySlots[2].values = Object.values(address)[0]
        } else {
          Toast('地区数据异常')
        }
      })
    },
    loadOutletsList: function () {
      this.data.city = this.choiceCity
      this.data.address = this.currentAddress
      this.data.name = this.searchName
      salesOutletsService.loadOutletsList(this.data).then(res => {
        let list = res.t.list
        if (Math.ceil(list.length / 10) >= this.data.pageNo) {
          for (let i = 0; i <= list.length - 1; i++) {
            if (list[i].distance >= 1000) {
              list[i].distance = list[i].distance / 1000
              list[i].distance = list[i].distance.toFixed(2) + 'km'
            } else {
              list[i].distance = list[i].distance + 'm'
            }
            this.items.push(list[i])
          }
          this.data.pageNo += 1
        }
      })
    },
    onKeyPress: function (keyCode) {
      if (keyCode === 13) {
        this.data.pageNo = 1
        this.items = []
        this.loadOutletsList()
      }
    },
    choiceArea: function () {
      this.popupVisible = true
      // 设置默认选中
      if (this.choiceProvince !== '' && this.choiceCity !== '') {
        this.areaPicker.setSlotValue(0, this.choiceProvince)
        this.areaPicker.setSlotValue(1, this.choiceCity)
      }
    },
    cancleaddress: function () {
      this.popupVisible = false
      this.areaPicker.setSlotValue(0, this.choiceProvince)
      this.areaPicker.setSlotValue(1, this.choiceCity)
    },
    selectaddress: function () {
      this.popupVisible = false
      this.choiceProvince = this.provinceName
      this.choiceCity = this.cityName
      // 选择城市之后直接搜索
      this.data.pageNo = 1
      this.items = []
      this.loadOutletsList()
    },
    onCityChange: function (picker, values) {
      this.areaPicker = picker
      picker.setSlotValues(1, address[values[0]])
      this.provinceName = values[0]
      this.cityName = values[1]
    },
    getLocation: function () {
      var geolocation = new BMap.Geolocation()
      var _this = this
      geolocation.getCurrentPosition(function (r) {
        var longitude = r.point.lng
        var latitude = r.point.lat
        var latlonok = latitude + ',' + longitude
        var url = 'http://api.map.baidu.com/geocoder/v2/?ak=' + `${ENV.ak}` + '&callback=renderReverse&location=' + latlonok + '&output=json&pois=1'
        _this.$http.jsonp(url).then(function (response) {
          let res = JSON.parse(response.bodyText)
          Toast('定位到' + res.result.formatted_address)
          this.choiceProvince = res.result.addressComponent.province
          this.choiceCity = res.result.addressComponent.city
          this.currentAddress = res.result.formatted_address
          this.currentCity = this.choiceCity
          this.positioning()
        })
      }, {enableHighAccuracy: false})
    },
    showPosition: function (position) {
      var latlonok = ''
      //  经度+纬度
      var lonlat = position.coords.longitude + ',' + position.coords.latitude
      //  将GPS经度纬度转化为百度的经度纬度
      var urlchange = 'http://api.map.baidu.com/geoconv/v1/?&from=1&to=5&ak=' + `${ENV.ak}` + '&coords=' + lonlat
      // var urlchange = 'http://api.map.baidu.com/geoconv/v1/?&from=1&to=5&ak=OpBuE84DAct3wDFr2hGhDX7SnvYaHs4c&coords=118.8029140176,32.0647517242'
      this.$http.jsonp(urlchange).then(function (res) {
        var com = JSON.parse(res.bodyText)
        if (com.result.length === 1) {
          this.latlon = com.result[0].y
          this.lonlat = com.result[0].x
          latlonok = this.latlon + ',' + this.lonlat
        } else {
          //  纬度+经度
          latlonok = position.coords.latitude + ',' + position.coords.longitude
        }
        //  根据经度纬度获取地址信息
        var url = 'http://api.map.baidu.com/geocoder/v2/?ak=' + `${ENV.ak}` + '&callback=renderReverse&location=' + latlonok + '&output=json&pois=0'
        this.$http.jsonp(url).then(function (response) {
          let res = JSON.parse(response.bodyText)
          Toast('定位到' + res.result.formatted_address)
          this.choiceProvince = res.result.addressComponent.province
          this.choiceCity = res.result.addressComponent.city
          this.city = this.choiceCity
        })
      })
    },
    showError: function (error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          Toast('定位失败,用户拒绝请求地理定位')
          break
        case error.POSITION_UNAVAILABLE:
          Toast('定位失败,位置信息是不可用')
          break
        case error.TIMEOUT:
          Toast('定位失败,请求获取用户位置超时')
          break
        case error.UNKNOWN_ERROR:
          Toast('定位失败,定位系统失效')
          break
      }
    }
  }
}
let address = {}
</script>
