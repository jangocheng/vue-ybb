<template>
<div>
    <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 1003;">
      <div class="mint-msgbox">
        <div class="mint-msgbox-message">
          <div class="yy-msg-title"><img src=".../../assets/yy-msg-title.png" ></div>
          <div class="yy-msg-body">
            <div class="title-0">您的预约号为：<span class="red">{{item.productCode}}</span></div>
            <div class="gray m-t-5">您可以在我的订单中查看详情</div>
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
