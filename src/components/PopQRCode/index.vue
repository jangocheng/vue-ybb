<template>
   <div v-show="isInfo === true">
		<div class="mint-msgbox-wrapper" style="position: absolute; z-index: 1003;">
			<div class="mint-msgbox">
				<div class="mint-msgbox-message">
					<div class="yy-msg-title title-1" style="background-color: transparent;">我的二维码</div>
					<div class="yy-msg-body">
						<div class="title-0"><img v-lazy="makePhotoUrl(image)" style="width: 4rem;"></div>
						<div class="gray m-t-5">长按二维码发送给好友</div>
					</div>
				</div>
				<div class="mint-msgbox-btns">
					<button class="mint-msgbox-btn mint-msgbox-confirm gray" @click="goMine">关闭</button>
				</div>
			</div>
		</div>
		<div class="v-modal" style="z-index: 1002;"></div>
   </div>
</template>
<script>
import helpers from '../../utils/helpers'
export default {
  data: function () {
    return {
      isInfo: this.isOk,
      image: this.imagePath
    }
  },
  props: ['isOk', 'imagePath'],
  methods: {
    goMine: function () {
      this.isInfo = false
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      // console.info(url)
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    }
  },
  watch: {
    isOk (val) {
      this.isInfo = val
    },
    isInfo (val) {
      this.$emit('listenChildEvent', val)
    },
    imagePath (val) {
      this.image = val + ''
    }
  }
}
</script>
