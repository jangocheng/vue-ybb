<template>
    <div>
    <com-header :title="headerData.title" :toLink="headerData.toLink"></com-header>
    	<div class="ybb-yuyue">
			<div class="yy-item-box">
				<a class="mint-cell mint-field">
					<div class="mint-cell-left"></div>
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<span class="mint-cell-text">手表款号</span>
						</div>
						<div class="mint-cell-value">
							<img v-lazy="productCentersAdds.imgUrl" class="img-box">
              <div class="text-overflow2">{{productCentersAdds.title}}</div>
							<div class="text-overflow2">{{productCentersAdds.styleID}}</div>
						</div>
					</div>
				</a>
			</div>
			<div class="yy-item-box">
				<a class="mint-cell mint-field">
					<div class="mint-cell-left"></div>
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<span class="mint-cell-text">预约人</span>
						</div>
						<div class="mint-cell-value">
							<div class="mint-cell-value">
								<input placeholder="请输入用户名" type="text" class="mint-field-core text-right"  v-model="data.userName">
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
								<input placeholder="请输入电话号码" type="tel" readonly="readonly" class="mint-field-core text-right gray" v-model="data.mobile">
								<div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>

							</div>
						</div>
					</div>
				</a>
			</div>
			<div class="yy-item-box">
        <a class="mint-cell mint-field" >
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">预约门店</span>
            </div>
            <div class="mint-cell-value" >
              <div class="mint-cell-value is-link" @click="goSalesOutlets(productCenterId)">
                <input placeholder="请选择门店" type="text" class="mint-field-core text-right" v-model="addressname">
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>

              </div>
            </div>
            <i class="mint-cell-allow-right"></i>
          </div>
        </a>
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">预约时间</span>
            </div>
            <div class="mint-cell-value">
              <div class="mint-cell-value is-link" @click="open('datePicker')">
                <input placeholder="请选择时间" type="text" class="mint-field-core text-right" readonly="readonly" v-model="data.arrivalDate">
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
              </div>
            </div>
            <i class="mint-cell-allow-right"></i>
               <mt-datetime-picker
                           ref="datePicker"
                           type="date"
                           :startDate="startDate"
                           :endDate="endDate"
                           v-model="dateValue"
                           @confirm="handleChange">
                           </mt-datetime-picker>
          </div>
        </a>
			</div>
		</div>
    <div v-show="isInfo === true">
    <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 1003;">
      <div class="mint-msgbox">
        <div class="mint-msgbox-message">
          <div class="yy-msg-title"><img src=".../../assets/yy-msg-title.png" ></div>
          <div class="yy-msg-body">
            <div class="title-0">您的预约号为：<span class="red">{{message}}</span></div>
            <div class="gray m-t-5">您可以在我的订单查看预约详情</div>
          </div>
        </div>
        <div class="mint-msgbox-btns" @click="goIndex">
          <button class="mint-msgbox-btn mint-msgbox-confirm">好的，知道了</button>
        </div>
      </div>
    </div>
    <div class="v-modal" style="z-index: 1002;"></div>
   </div>
		<div class="yuyue-submit">
			<button id="infoSave" class="mint-button mint-button--default mint-button--large ybb-btn" @click="infoSave">提交预约</button>
		</div>
	</div>
</template>
<script>
import comHeader from 'components/comHeader'
import productCenterService from 'SERVICES/productCenterService'
import mineInfoService from 'SERVICES/mineInfoService'
import helpers from 'utils/helpers'
import { Toast } from 'mint-ui'
import validators from '../utils/validators'
import $ from 'jquery'
export default {
  components: {
    comHeader
  },
  data: () => ({
    headerData: {
      title: '预约申请',
      toLink: '/'
    },
    data: {
      userName: '',
      mobile: '',
      goodsId: '',
      arrivalDate: '',
      shopId: ''
    },
    isInfo: false,
    message: '',
    productCenterId: '',
    addressname: '',
    disableCar: true, // 防止多次提交
    productCentersAdds: {},
    dateValue: new Date(),
    startDate: new Date(),
    endDate: new Date('2099-12-31')
  }),
  created () {
    this.loadMineInfo()
    this.getProductCentersDetail()
    this.loadMaps()
  },
  activated () {
    this.loadData()
  },
  methods: {
    getProductCentersDetail: function () {
      productCenterService.loadProductCentersDetail(this.$route.query.productCenterId).then(res => {
        this.productCentersAdds = res.t
        this.productCenterId = this.productCentersAdds.id
      })
    },
    loadMaps: function () {
      this.productCentersAdds = {}
      this.addressname = this.$route.query.name
      this.shopId = this.$route.query.id
      this.data.arrivalDate = this.$route.query.data.arrivalDate
      this.productCenterId = this.$route.query.productCenterId
      productCenterService.loadProductCentersDetail(this.productCenterId).then(res => {
        this.productCentersAdds = res.t
      })
      console.info('pageNo===>' + this.addressname)
      // setTimeout(this.ready, 0)
    },
    goIndex: function () {
      this.isInfo = false
      this.$router.push('/')
    },
    goSalesOutlets: function () {
      this.$router.push({name: 'ProductCenterSalesOutlets', query: {productCenterId: this.productCenterId, data: this.data}})
    },
    open: function (picker) {
      this.dateValue = this.data.arrivalDate
      this.$refs[picker].open()
    },
    loadMineInfo: function () {
      mineInfoService.loadMineInfo().then(res => {
        if (this.data.userName === '') {
          this.data.userName = res.t.member.userName
        }
        this.data.mobile = res.t.member.mobile || ''
        // this.data.areaId = res.t.member.area.id
        // this.data.areaText = res.t.member.area.name
      })
    },
    infoSave: function () {
      if (this.data.userName.trim() === '') {
        Toast('请输入姓名')
      } else if (this.data.userName.trim().length > 12) {
        Toast('姓名不能超过12个字符')
      } else if (this.data.mobile.trim() === '') {
        Toast('请输入电话号码')
      } else if (!validators.mobile(this.data.mobile.trim())) {
        Toast('电话号码不正确')
      } else if (this.addressname === undefined) {
        Toast('请选择门店')
      } else if (this.data.arrivalDate === undefined || this.data.arrivalDate === '') {
        Toast('请选择预约日期')
      } else {
        $('#infoSave').attr('disabled', true)
        this.doyuyueAdd()
      }
    },
    doyuyueAdd: function () {
      this.data.shopId = this.$route.query.id
      this.data.goodsId = this.productCentersAdds.id
      this.data.userName = this.data.userName
      productCenterService.saveProductCenter(this.data).then(
        res => {
          $('#infoSave').attr('disabled', false)
          this.isInfo = true
          this.message = res.t
        },
        res => {
          $('#infoSave').attr('disabled', false)
        }
      )
    },
    handleChange: function (value) {
      this.data.arrivalDate = window.moment(value).format('YYYY-MM-DD')
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      // console.info(url)
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    },
    loadData: function () {
      this.addressname = this.$route.query.name
    }
  }
}
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
