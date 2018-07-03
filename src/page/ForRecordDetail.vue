<template>
<div>
<div class="soul-list-box1">
			<a class="mint-cell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<span class="mint-cell-text title-1">兑换信息</span>
					</div>
				</div>
			</a>
			<a class="mint-cell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title sl-item-box">
						<div class="hhxh-flex ">
							<div class="flex-0 sl-item-title gray text-right m-r-5">商品名称：</div>
							<div class="flex-1 sl-item-name text-overflow1">{{pgMaterialName}}</div>
						</div>
						<div class="hhxh-flex m-t-8">
							<div class="flex-0 sl-item-title gray text-right m-r-5">兑换时间：</div>
							<div class="flex-1 sl-item-name text-overflow1">{{ForRecordDetail.bizDate}}</div>
						</div>
						<div class="hhxh-flex m-t-8">
							<div class="flex-0 sl-item-title gray text-right m-r-5">花费积分：</div>
							<div class="flex-1 sl-item-name text-overflow1">{{ForRecordDetail.amount}}</div>
						</div>
						<div class="hhxh-flex m-t-8">
							<div class="flex-0 sl-item-title gray text-right m-r-5">收件人：</div>
							<div class="flex-1 sl-item-name text-overflow1"><span class="name-box m-r-10">{{ForRecordDetail.consigneeName}}</span><span class="tel-box">{{ForRecordDetail.consigneePhone}}</span></div>
						</div>
						<div class="hhxh-flex m-t-8">
							<div class="flex-0 sl-item-title gray text-right m-r-5">收件地址：</div>
							<div class="flex-1 sl-item-name text-overflow1">{{ForRecordDetail.consigneeAddr}}</div>
						</div>
					</div>
				</div>
			</a>
		</div>
		<div class="soul-list-box1" v-if="pgMaterialTypeName === '礼品'">
			<a class="mint-cell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<span class="mint-cell-text title-1">配送信息</span>
					</div>
				</div>
			</a>
			<a class="mint-cell">
				<div class="mint-cell-wrapper" v-if="ForRecordDetail.status===1">
					<div class="mint-cell-title sl-item-box">
						<div class="hhxh-flex ">
							<div class="flex-0 sl-item-title gray text-right m-r-5">配送状态：</div>
                            <div class="flex-1 sl-item-name text-overflow1 blue" v-if="ForRecordDetail.status===1">未发货</div>
                            <div class="flex-1 sl-item-name text-overflow1 blue" v-if="ForRecordDetail.status===3">已发货</span></div>
                            <div class="flex-1 sl-item-name text-overflow1 blue" v-if="ForRecordDetail.status===4">已取消</span></div>
						</div>
					</div>
				</div>
				<div class="mint-cell-wrapper" v-if="ForRecordDetail.status===3">
					<div class="mint-cell-title sl-item-box">
						<div class="hhxh-flex ">
							<div class="flex-0 sl-item-title gray text-right m-r-5">配送状态：</div>
                            <div class="flex-1 sl-item-name text-overflow1 blue" v-if="ForRecordDetail.status===1">未发货</div>
                            <div class="flex-1 sl-item-name text-overflow1 blue" v-if="ForRecordDetail.status===3">已发货</span></div>
                            <div class="flex-1 sl-item-name text-overflow1 blue" v-if="ForRecordDetail.status===4">已取消</span></div>
						</div>
						<div class="hhxh-flex m-t-8">
							<div class="flex-0 sl-item-title gray text-right m-r-5">发货时间：</div>
							<div class="flex-1 sl-item-name text-overflow1">{{ForRecordDetail.shipperDate}}</div>
						</div>
						<div class="hhxh-flex m-t-8">
							<div class="flex-0 sl-item-title gray text-right m-r-5">物流公司：</div>
							<div class="flex-1 sl-item-name text-overflow1">{{ForRecordDetail.logisticsCompany}}</div>
						</div>
						<div class="hhxh-flex m-t-8">
							<div class="flex-0 sl-item-title gray text-right m-r-5">物流单号：</div>
							<div class="flex-1 sl-item-name text-overflow1">{{ForRecordDetail.logisticsNo}}</div>
						</div>
					</div>
				</div>
				<div class="mint-cell-wrapper" v-if="ForRecordDetail.status===4">
					<div class="mint-cell-title sl-item-box">
						<div class="hhxh-flex ">
							<div class="flex-0 sl-item-title gray text-right m-r-5">配送状态：</div>
                            <div class="flex-1 sl-item-name text-overflow1 blue" v-if="ForRecordDetail.status===1">未发货</div>
                            <div class="flex-1 sl-item-name text-overflow1 blue" v-if="ForRecordDetail.status===3">已发货</span></div>
                            <div class="flex-1 sl-item-name text-overflow1 blue" v-if="ForRecordDetail.status===4">已取消</span></div>
						</div>
					</div>
				</div>
			</a>
		</div>
		<div class="footer-empty"></div>
		<!-- <div class="mint-tabbar is-fixed ybb-footer" @click="cancelRecords(ForRecordDetail.id)" v-if="ForRecordDetail.status===1">
			<a class="mint-tab-item jf-sp-footer-btn">
				<button class="mint-button mint-button--default mint-button--large ybb-btn"><label class="mint-button-text title-1">取消兑换</label></button>
			</a>
		</div> -->
		</div>
</template>

<script>
import priceShopService from 'SERVICES/priceShopService'
import noData from 'components/noData'
import helpers from 'utils/helpers'
import { Toast, MessageBox } from 'mint-ui'
export default {
  components: {
    noData
  },
  data: () => ({
    headerData: {
      title: '积分兑换详情',
      toLink: ''
    },
    ForRecordDetail: {},
    disableCar: true, // 防止多次提交
    logos: [],
    pgMaterialTypeName: '',
    pgMaterialName: ''
  }),
  created () {
    this.getForRecordDetail()
  },
  beforeRouteLeave (to, from, next) {
     // 设置下一个路由的 meta
    if (to.fullPath === '/Integralrecord') {
      to.meta.keepAlive = true
    } // 让 A 缓存，即不刷新
    next()
  },
  methods: {
    getForRecordDetail: function () {
      priceShopService.loadRecordDetail(this.$route.params.ForRecordDetailId).then(res => {
        // res.t.description = this.html_decode(res.t.description)
        this.pgMaterialTypeName = this.$route.params.pgMaterialTypeName
        this.ForRecordDetail = res.t
        this.pgMaterialName = this.ForRecordDetail.pgOrderentryList[0].pgMaterial.name
      })
    },
    cancelRecords: function (id) {
      MessageBox({
        title: '提示',
        message: '确认取消此次兑换吗?',
        showCancelButton: true
      }).then(res => {
        if (res !== 'cancel') {
          priceShopService.cancelRecord(id).then(res => {
            this.$router.push('/PriceShop')
          })
        }
      })
    },
    goPgMaterialInfo: function (id) {
      id !== '' ? this.$router.push({name: 'PgMaterialInfo', params: {pgMaterialDetailId: id}}) : Toast('产品id为空')
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      // console.info(url)
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    }
  }
}
</script>

<style scoped>
 .mint-popup {
    width: 70%;
    height: 100%;
}
</style>
