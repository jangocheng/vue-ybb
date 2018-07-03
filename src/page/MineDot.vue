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
          <span>{{currentCity}}</span>
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
    <div class="gray mine-dot-city">当前所在城市：<span>{{choiceCity}}</span></div>
    <div class="soul-list-box1">
      <a class="mint-cell" v-for="item in items" @click="goMap(item.name, item.address, item.phone)">
        <span class="mint-cell-mask"></span>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div class="mine-dot-item">
              <div class="hhxh-flex">
                <div class="flex-1 title-0">{{item.name}}</div>
                <div class="flex-0"><img src="../assets/mine-dot-location-2.png"></div>
              </div>
              <div class="hhxh-flex m-t-8 gray">
                <div class="flex-1 m-r-10 text-overflow1">{{item.address}}</div>
                <div class="flex-0">{{item.distanceFormat}}</div>
              </div>
              <div class="hhxh-flex m-t-8 gray">
                 <div class="flex-1 m-r-10 text-overflow1">{{item.phone}}</div>
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
import {Toast} from 'mint-ui'
import maiService from 'SERVICES/maiService'
import salesOutletsService from 'SERVICES/salesOutletsService'
import ENV from '../SERVICES/xhr/config'
import indexService from 'SERVICES/indexService'
import BMap from 'BMap'
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
    addressChangeData: {
      id: '',
      name: ''
    },
    addressSlot: [{
      flex: 1,
      values: [],
      className: 'slot1'
    }],
    latitude: '',
    longitude: '',
    isInfo: true,
    popupVisible: false,
    areaPicker: '',
    currentCity: '深圳市',
    currentAddress: '新能源大厦',
    choiceCity: '',
    choiceProvince: '',
    navigationItem: {},
    cityName: '',
    provinceName: '',
    searchName: '',
    productCenterId: '',
    userName: '',
    defaultCity: {
      name: '',
      id: '' // 写死是不对的 但是没时间找数据同步的方案了  目前定位太慢容易
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
    this.getLocation()
    this.loadAreaList()
    this.loadMaps()
    this.ifAutoLogin()
  },
  beforeRouteLeave (to, from, next) {
    sessionStorage.scrollTop = document.body.scrollTop
    next()
  },
  activated () {
    document.body.scrollTop = sessionStorage.scrollTop
  },
  methods: {
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
    loadNavigation: function (params) {
      const navigationItem = sessionStorage.getItem('navigationItem')
      if (navigationItem) {
        this.navigationItem = JSON.parse(navigationItem)
      } else {
        indexService.loadNavigation().then(res => {
          this.navigationItem = res.t
          sessionStorage.setItem('navigationItem', JSON.stringify(this.navigationItem))
        })
      }
    },
    /**
     * 判断是否需要自动登录
     * 微信端进入且退出登录了
     *
     */
    ifAutoLogin: function () {
      const isOut = localStorage.getItem('isOut')
      // if (isOut !== 'true') {
      console.info('判断是否微信环境')
      var ua = navigator.userAgent.toLowerCase()
      // 判断是否微信环境
      if (ua.match(/MicroMessenger/i)) {
        if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
          if (isOut !== 'true') {
            const openId = localStorage.getItem('openId')
            // alert('调试信息--openId-->' + openId)
            console.info('openId==>' + openId)
            if (!openId || openId === 'null') {
              this.checkLogin()
            } else {
              const accessToken = localStorage.getItem('accessToken')
              if (!accessToken) {
                this.autoLogin(openId)
              }
            }
          }
          // 加载微信jssdk配置
          this.loadJsConfig()
          this.doWxjsPai()
        }
      } else {
        Toast('提示：不是微信端')
      }
    },
    goMap: function (name, address, phone) {
      this.$router.push({name: 'MineDotDetail', query: {name: name, addr: address, phone: phone}})
    },
    loadMaps: function () {
      this.userName = this.$route.params.userName
      this.productCenterId = this.$route.params.productCenterId
      console.info('pageNo===2314>' + this.productCenterId)
      console.info('pageNo===2525234>' + this.userName)
      // setTimeout(this.ready, 0)
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
    positioning: function () {
      this.loadOutletsList()
    },
    loadOutletsList: function () {
      this.data.city = this.currentCity
      this.data.address = this.currentAddress
      this.data.name = this.searchName
      maiService.loadAllOrganization(this.data).then(res => {
        let list = res.t
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
      if (this.choiceProvince !== '' && this.currentCity !== '') {
        this.areaPicker.setSlotValue(0, this.choiceProvince)
        this.areaPicker.setSlotValue(1, this.currentCity)
        console.log(this.choiceProvince + '-' + this.currentCity)
      }
    },
    cancleaddress: function () {
      this.popupVisible = false
      this.areaPicker.setSlotValue(0, this.choiceProvince)
      this.areaPicker.setSlotValue(1, this.currentCity)
    },
    selectaddress: function () {
      this.popupVisible = false
      this.choiceProvince = this.provinceName
      this.currentCity = this.cityName
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
    }
  }
}
let address = {}
</script>
