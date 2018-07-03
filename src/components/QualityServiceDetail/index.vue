<template>
<div>
	<div class="mint-msgbox-wrapper" style="position: absolute; z-index: 1003;">
		<div class="mint-msgbox">
			<div class="mint-msgbox-message">
				<div class="yy-msg-title"><img src="../../assets/mine-service-title.png" ></div>
				<div class="yy-msg-body text-left">
					<div class="hhxh-flex">
						<div class="flex-0 gray m-r-10">商品款号</div>
						<div class="flex-1">{{item.productCode}}</div>
					</div>
					<div class="hhxh-flex m-t-5">
						<div class="flex-0 gray m-r-10">购买日期</div>
						<div class="flex-1">{{item.saleDate}}</div>
					</div>
					<div class="hhxh-flex m-t-5">
						<div class="flex-0 gray m-r-10">质保日期</div>
						<div class="flex-1">{{item.expireDate}}</div>
					</div>
					<div class="hhxh-flex m-t-5">
						<div class="flex-0 gray m-r-10">购买店名</div>
						<div class="flex-1">{{item.shopName}}</div>
					</div>
				</div>
			</div>
			<div class="mint-msgbox-btns" @click="Isee">
				<button class="mint-msgbox-btn mint-msgbox-confirm">好的，知道了</button>
			</div>
		</div>
	</div>
	<div class="v-modal" style="z-index: 1002;"></div>
</div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isInfo: false
  }),
  methods: {
    Isee: function () {
      this.$emit('ok') // 主动触发ok方法
    }
  }
}
</script>
