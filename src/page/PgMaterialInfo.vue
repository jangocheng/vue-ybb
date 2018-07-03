<!-- 页面模版 -->
<template>
  <div>
    <!--header-->
    <com-header :title="headerData.title" :toLink="headerData.toLink"></com-header>
    <!--header end-->
    <!--container-->
    <div class="ybb-yuyue">
      <div class="yy-item-box mine-me">
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">兑换商品</span>
            </div>
            <div class="mint-cell-value hhxh-flex">
              <div class="flex-1 text-right"><img v-lazy="makePhotoUrl(PgMaterialDetailAdd.imagePath)" class="img-box5 m-r-10">{{PgMaterialDetailAdd.name}}</div>
            </div>
          </div>
        </a>
      </div>
      <div class="yy-item-box mine-me">
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">收件人</span>
            </div>
            <div class="mint-cell-value">
              <div class="mint-cell-value">
                <input placeholder="请输入姓名" type="text" class="mint-field-core text-right" v-model="data.userName">
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
              </div>
            </div>
          </div>
        </a>
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">电话号码</span>
            </div>
            <div class="mint-cell-value">
              <div class="mint-cell-value">
                <input placeholder="请输入电话号码" type="tel" class="mint-field-core text-right" v-model="data.mobile" >
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
              </div>
            </div>
          </div>
        </a>
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">所在地区</span>
            </div>
            <div class="mint-cell-value">
              <div class="mint-cell-value is-link" @click="popupVisible = true">
                <input placeholder="请选择省市" type="text" class="mint-field-core text-right" readonly="readonly" v-model="data.areaText">
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
              </div>
            </div>
            <i class="mint-cell-allow-right"></i>
            <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
              <div class="picker-toolbar">
                <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible = false">取消</span>
                <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>
              </div>
              <mt-picker :slots="citySlots" @change="onCityChange" :visible-item-count="3"></mt-picker>
            </mt-popup>
          </div>
        </a>
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">详细地址</span>
            </div>
            <div class="mint-cell-value">
              <div class="mint-cell-value">
                <input placeholder="街道、楼牌号等" type="text" class="mint-field-core text-right" v-model="data.address">
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div class="jf-exchange-div">本次兑换所需积分：<span class="blue title-1">{{PgMaterialDetailAdd.price}}</span>，剩余积分：<b class="title-1">{{data.remainScore}}</b></div>
    </div>

    <div class="yuyue-submit" v-if="isOk">
      <button id="infoSave" class="mint-button mint-button--default mint-button--large ybb-btn" @click="infoSave"><label class="mint-button-text title-1">确认兑换</label></button>
    </div>
    </div>
</template>
<script>
import {Toast, Indicator} from 'mint-ui'
import validators from '../utils/validators'
import comHeader from 'components/comHeader'
import priceShopService from 'SERVICES/priceShopService'
import mineInfoService from 'SERVICES/mineInfoService'
import helpers from 'utils/helpers'
import $ from 'jquery'
export default {
  components: {
    comHeader
  },
  data: () => ({
    headImg: 'this.src="' + require('../assets/img.png') + '"',
    headerData: {
      title: '积分兑换',
      toLink: ''
    },
    isOk: false,
    PgMaterialDetailAdd: {},
    popupVisible: false,
    cityVisible: false,
    areaList: [],
    data: {
      userName: '',
      mobile: '',
      areaId: '',
      provinceId: '',
      cityId: '',
      area: {},
      address: '',
      areaText: '',
      remainScore: '',
      newAddress: '',
      pgMaterialId: ''
    },
    addressSlot: [{
      flex: 1,
      values: [],
      className: 'slot1'
    }],
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
    ],
    addressProvince: '',
    addressCity: ''
  }),
  created () {
    this.loadAreaList()
    this.getpgMaterialAdd()
  },
  methods: {
    loadAreaList: function () {
      mineInfoService.loadAreaList().then(res => {
        if (res.t) {
          this.areaList = res.t
          address = this.areaList.areaList[0]
          provinceCodeList = this.areaList.provinceCodeList[0]
          cityCodeList = this.areaList.cityCodeList[0]
          console.log(provinceCodeList)
          console.log(cityCodeList)
          this.citySlots[0].values = Object.keys(address)
          this.citySlots[2].values = Object.values(address)[0]
          // this.addressSlot[0].values = res.t.map(a => a.name)
        } else {
          Toast('地区数据异常')
        }
      })
    },
    onAddressChange: function (picker, values) {
      // this.data.areaId = this.areaList.filter(item => item.name === values[0]).map(a => a.id)
      // console.info('asdf+++>' + this.data.areaId)
      // this.data.areaText = values[0]
      this.addressChangeData.id = this.areaList.filter(item => item.name === values[0]).map(a => a.id)[0]
      this.addressChangeData.name = values[0]
    },
    selectaddress: function () {
      // this.data.areaId = this.addressChangeData.id
      // console.info(this.data.areaId)
      // this.data.areaText = this.addressChangeData.name
      this.popupVisible = false
      this.data.areaText = this.addressProvince + this.addressCity
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      // console.info(url)
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    },
    getpgMaterialAdd: function () {
      priceShopService.loadGoodDetail(this.$route.params.pgMaterialDetailId).then(res => {
        // res.t.description = this.html_decode(res.t.description)
        this.PgMaterialDetailAdd = res.t
        this.loadMineInfo()
      })
    },
    infoSave: function () {
      if (this.data.userName.trim() === '') {
        Toast('请输入姓名')
      } else if (this.data.mobile.trim() === '') {
        Toast('请输入电话号码')
      } else if (!validators.mobile(this.data.mobile.trim())) {
        Toast('电话号码不正确')
      } else if (this.data.areaText.toString().trim() === '') {
        Toast('请选择所在地区')
      } else if (this.data.address.trim() === '') {
        Toast('请输入详细地址')
      } else {
        $('#infoSave').attr('disabled', true)
        this.doAdd()
      }
    },
    doAdd: function () {
      // this.data.areaId = 'cc9c229d324042a491767a8c7341a8bb'
      this.data.pgMaterialId = this.PgMaterialDetailAdd.id
      this.data.newAddress = this.data.areaText.toString() + this.data.address
      priceShopService.savePgMaterial(this.data).then(
        res => {
          $('#infoSave').attr('disabled', false)
          Toast('兑换成功,已扣' + this.PgMaterialDetailAdd.price + '积分')
          this.$router.replace('/PriceShop')
        },
        res => {
          $('#infoSave').attr('disabled', false)
        }
      )
    },
    loadMineInfo: function () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      mineInfoService.loadMineInfo().then(res => {
        this.data.userName = res.t.member.userName || ''
        this.data.mobile = res.t.member.mobile || ''
        this.data.area = res.t.member.area || ''
        this.data.remainScore = res.t.member.remainScore
        this.data.address = res.t.member.address
        this.data.areaText = res.t.member.priviceName + '' + res.t.member.cityName || ''
        this.isOk = true
        Indicator.close()
      })
    },
    onCityChange: function (picker, values) {
      picker.setSlotValues(1, address[values[0]])
      this.addressProvince = values[0]
      this.addressCity = values[1]
      this.data.area = values[0] + values[1]
    },
    open: function (picker) {
      this.$refs[picker].open()
    }
  }
}

let address = {}
let provinceCodeList = {}
let cityCodeList = {}
</script>
</script>
<style scoped>
.mint-popup-4 {
    width: 100%;
}
.mint-popup-4 .picker-slot-wrapper, .page-popup .mint-popup-4 .picker-item {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
</style>
