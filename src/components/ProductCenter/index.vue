<template>
    <div>
    <div v-for="item in items">
        <a class="mint-cell" >
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper" >
            <div class="mint-cell-value" @click="goInfo(item.id)"><img v-lazy="item.imgUrl" class="img-box"></div>
            <div class="mint-cell-title">
              <span class="mint-cell-text" @click="goInfo(item.id)">{{item.title}}</span>
              <div class="hhxh-flex m-t-5">
                <div class="mint-cell-text flex-1" @click="goInfo(item.id)"><span class="price-box">￥<i>{{item.pirce}}</i></span></div>
                <div @click="goSubscribe(item.id)">
                  <button class="mint-button mint-button--small ybb-btn"><label class="mint-button-text">预约看表</label></button>
                </div>
              </div>
            </div>
            <div class="mint-cell-value "></div>
          </div>
        </a>
      </div>
      </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    goInfo: function (id) {
      id !== '' ? this.$router.push({name: 'ProductCenterDetail', params: {productCenterId: id}}) : Toast('产品id为空')
    },
    goSubscribe: function (id) {
      id !== '' ? this.$router.push({name: 'ProductCenterInfo', query: {productCenterId: id}}) : Toast('产品id为空')
    }
  }
}
</script>
<style scoped>
  .page-lazyload-image[lazy=loading] {
    width:100%;
    height:4.66rem;
  }
</style>
