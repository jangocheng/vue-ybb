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
        <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
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
              </div>
            </div>
          </div>
        </a>
      </div>
    <!--container end-->
  </div>
</template>
<script>
import comHeader from 'components/comHeader'
import noData from 'components/noData'
import salesOutletsService from 'SERVICES/salesOutletsService'
import {Toast} from 'mint-ui'
import BMap from 'BMap'
import ENV from '../SERVICES/xhr/config'
// import {Toast, MessageBox} from 'mint-ui'
export default {
  components: {
    comHeader,
    noData
  },
  data: () => ({
    headerData: {
      title: '销售网点查询',
      toLink: '/Mine'
    },
    isInfo: true,
    outletsallLoaded: false,
    popupVisible: false,
    areaPicker: '',
    currentCity: '',
    currentAddress: '新能源大厦',
    choiceCity: '深圳市',
    choiceProvince: '',
    cityName: '',
    provinceName: '',
    searchName: '',
    data: {
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
  },
  beforeRouteLeave (to, from, next) {
    sessionStorage.scrollTop = document.body.scrollTop
    next()
  },
  activated () {
    document.body.scrollTop = sessionStorage.scrollTop
  },
  methods: {
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
          this.currentCity = res.result.addressComponent.city
          this.currentAddress = res.result.formatted_address
          this.choiceCity = this.currentCity
          this.positioning()
        })
      }, {enableHighAccuracy: false})
    },
    goMap: function (name, address, phone) {
      this.$router.push({name: 'SalesOutletsMap', params: {name: name, addr: address, phone: phone}})
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
        for (let i = 0; i <= list.length - 1; i++) {
          this.items.push(list[i])
        }
        console.info('pageNo===>' + this.data.pageNo)
      })
    },
    loadMoreOutletsList: function () {
      // 加载更多数据
      this.loadOutletsList()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    },
    onKeyPress: function (keyCode) {
      if (keyCode === 13) {
        this.outletsallLoaded = false
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
        console.log(this.choiceProvince + '-' + this.choiceCity)
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
      this.outletsallLoaded = false
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
