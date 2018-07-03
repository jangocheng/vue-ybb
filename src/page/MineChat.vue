<template>
<div>
<com-header :title="headerData.title" :toLink="headerData.toLink"></com-header>
        <div class="mine-chat-box">
			<div class="img-box"><img src="../assets/ybb-code.png"></div>
			<div class="text-center m-t-8"><span class="title-3">依波精品(ebohrluxury)
</span></div>
			<div class="text-center">
				<a href="tel:4007009988"><button class="mint-button mint-button--normal ybb-btn"><label class="mint-button-text title-3"><img src="../assets/tel.png">400-700-9988</label></button></a>
			</div>
			<div class="text-center m-t-8 gray title-0">点击拨打电话咨询</div>
		</div>	
</div>
</template>

<script>
import comHeader from 'components/comHeader'
export default {
  components: {
    comHeader
  },
  data: () => ({
    headerData: {
      title: '咨询购买',
      toLink: '/Mine'
    }
  })
}
</script>

<style scoped>
 .mint-popup {
    width: 70%;
    height: 100%;
}
</style>
