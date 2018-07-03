<template>
<div>
<com-header :title="headerData.title" :toLink="headerData.toLink"></com-header>
<div class="jf-sp-header">
			<div><img v-lazy="makePhotoUrl(PgMaterialDetail.imagePath)" class="img-box"></div>
			<div class="m-t-8 text-center title-1">{{PgMaterialDetail.name}}</div>
			<div class="m-t-5 text-center title-0 blue">{{PgMaterialDetail.price}}积分</div>
		</div>
		<div>
			<div class="jf-sp-title gray title-1">商品介绍</div>
			<div class="jf-sp-container" v-html="PgMaterialDetail.materialDesc">
			</div>
		</div>
		<!--container end-->

		<!--footer-->
		<div class="footer-empty"></div>
		<div class="mint-tabbar is-fixed ybb-footer" @click="goPgMaterialInfo(PgMaterialDetail.id)" v-if="$store.state.pgMaterialStatus == '1'">
			<a class="mint-tab-item jf-sp-footer-btn">
				<button class="mint-button mint-button--default mint-button--large ybb-btn"><label class="mint-button-text title-1">立即兑换</label></button>
			</a>
		</div>
    <div class="mint-tabbar is-fixed ybb-footer" v-if="$store.state.pgMaterialStatus == '-1'">
      <a class="mint-tab-item jf-sp-footer-btn">
        <button class="mint-button mint-button--default mint-button--large ybb-btn" style="background-color: #c7c7c7!important;"><label class="mint-button-text title-1">立即兑换</label></button>
      </a>
    </div>
		</div>
</template>
<script>
import comHeader from 'components/comHeader'
import priceShopService from 'SERVICES/priceShopService'
import noData from 'components/noData'
import helpers from 'utils/helpers'
import { Toast } from 'mint-ui'
export default {
  components: {
    comHeader,
    noData
  },
  data: () => ({
    headerData: {
      title: '积分商品详情',
      toLink: '/PriceShop'
    },
    PgMaterialDetail: {},
    disableCar: true, // 防止多次提交
    logos: []
  }),
  created () {
    this.getpgMaterial()
  },
  methods: {
    getpgMaterial: function () {
      if (this.$route.params.pgMaterialStatus !== undefined) {
        this.$store.state.pgMaterialStatus = this.$route.params.pgMaterialStatus
      }
      priceShopService.loadGoodDetail(this.$route.params.pgMaterialDetailId).then(res => {
        res.t.materialDesc = this.html_decode(res.t.materialDesc)
        this.PgMaterialDetail = res.t
      })
    },
    goPgMaterialInfo: function (id) {
      if (this.PgMaterialDetail.price <= this.$store.state.remainScore) {
        id !== '' ? this.$router.push({name: 'PgMaterialInfo', params: {pgMaterialDetailId: id}}) : Toast('产品id为空')
      } else {
        Toast('积分不足')
      }
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      // console.info(url)
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    },
    html_decode: function (str) {
      return helpers.html_decode(str)
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
