<template>
    <div>
    <com-header :title="headerData.title" :toLink="headerData.toLink"></com-header>
    <Shuffling :items="photoLists"></Shuffling>
		<div>
			<a class="mint-cell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<span class="mint-cell-text">{{productCentersDetails.title}}</span>
						<div class="mint-cell-text m-t-5"><span class="price-box">￥<i>{{productCentersDetails.pirce}}</i></span></div>
					</div>
				</div>
			</a>
		</div>
		<div class="ybb-product-detail-box">
			<div class="jf-mine-tab-header hhxh-flex">
				<div class="jf-mine-item flex-1 " :class="{ active: isInfo}" @click="isInfo = true"><span class="title-0">图文详情</span></div>
				<div class="jf-mine-item flex-1 " :class="{ active: isInfo === false}" @click="isInfo = false"><span class="title-0">规格详情</span></div>
			</div>
			<div class="ybb-product-box">
				<div class="ybb-parameter-box" v-show="isInfo === false" :class="{ active: isInfo === false}" @click="isInfo = false">
					<div class="hhxh-flex">
						<div class="gray flex-0 txt-box">商品名称：</div>
						<div class="flex-1 val-box">{{productCentersDetails.title}}</div>
					</div>
					<div class="hhxh-flex m-t-8">
						<div class="gray flex-0 txt-box">商品编码：</div>
						<div class="flex-1 val-box">{{productCentersDetails.styleID}}</div>
					</div>
					<div class="hhxh-flex m-t-8">
						<div class="gray flex-0 txt-box">上架时间：</div>
						<div class="flex-1 val-box">{{productCentersDetails.addTime}}</div>
					</div>
					<div class="hhxh-flex m-t-8">
						<div class="gray flex-0 txt-box">货号：</div>
						<div class="flex-1 val-box"></div>
					</div>
					<div class="hhxh-flex m-t-8">
						<div class="gray flex-0 txt-box">机芯分类：</div>
						<div class="flex-1 val-box">{{productCentersDetails.zidingyiMap.other_2}}</div>
					</div>
					<div class="hhxh-flex m-t-8">
						<div class="gray flex-0 txt-box">表带材质：</div>
						<div class="flex-1 val-box">{{productCentersDetails.zidingyiMap.other_3}}</div>
					</div>
					<div class="hhxh-flex m-t-8">
						<div class="gray flex-0 txt-box">产品系列：</div>
						<div class="flex-1 val-box">{{productCentersDetails.zidingyiMap.other_8}}</div>
					</div>
					<div class="hhxh-flex m-t-8">
						<div class="gray flex-0 txt-box">表镜材质：</div>
						<div class="flex-1 val-box">{{productCentersDetails.zidingyiMap.other_9}}</div>
					</div>
					<div class="hhxh-flex m-t-8">
						<div class="gray flex-0 txt-box">表带颜色：</div>
						<div class="flex-1 val-box">{{productCentersDetails.zidingyiMap.other_12}}</div>
					</div>
					<div class="hhxh-flex m-t-8">
						<div class="gray flex-0 txt-box">防水深度：</div>
						<div class="flex-1 val-box">{{productCentersDetails.zidingyiMap.other_13}}</div>
					</div>
					<div class="hhxh-flex m-t-8">
						<div class="gray flex-0 txt-box">表盘颜色：</div>
						<div class="flex-1 val-box">{{productCentersDetails.zidingyiMap.other_15}}</div>
					</div>
				</div>
				<div class="ybb-detail-box" v-show="isInfo !== false" :class="{ active: isInfo}" @click="isInfo = true" v-html="productCentersDetails.content">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import productCenterService from 'SERVICES/productCenterService'
import Shuffling from 'components/Shuffling'
import comHeader from 'components/comHeader'
import helpers from 'utils/helpers'
export default {
  components: {
    comHeader,
    Shuffling
  },
  data: () => ({
    headerData: {
      title: '商品详情',
      toLink: '/'
    },
    photoLists: [],
    productCentersDetails: {},
    disableCar: true, // 防止多次提交
    isInfo: true
  }),
  created () {
    this.getProductCentersDetail()
  },
  methods: {
    getProductCentersDetail: function () {
      productCenterService.loadProductCentersDetail(this.$route.params.productCenterId).then(res => {
        res.t.content = this.html_decode(res.t.content)
        this.photoLists = res.t.photoList
        this.productCentersDetails = res.t
      })
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
