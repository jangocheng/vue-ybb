<template>
  <div class="jf-sp-list">
    <div class="item hhxh-left  box-sizing" v-for="item in items">
          <div class="item-box hhxh-left">
            <div>
              <div @click="goInfos(item.id)"><img v-lazy="makePhotoUrl(item.imagePath)" class="img-box"></div>
              <div class="m-t-8 text-overflow" @click="goInfos(item.id)">{{item.name}}</div>
              <div class="hhxh-flex m-t-8">
                <div class="blue flex-1" @click="goInfos(item.id)">{{item.price}}积分</div>
                <div @click="goInfo(item.id)">
                  <button class="mint-button mint-button--small ybb-btn"><label class="mint-button-text">立即兑换</label></button>
                </div>
              </div>
            </div>
          </div>
    </div>     
  </div> 
</template>
<script>
import { Toast } from 'mint-ui'
import helpers from '../../utils/helpers'
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    goInfo: function (id) {
      id !== '' ? this.$router.push({name: 'PgMaterialInfo', params: {pgMaterialDetailId: id}}) : Toast('产品id为空')
    },
    goInfos: function (id) {
      id !== '' ? this.$router.push({name: 'PgMaterialDetail', params: {pgMaterialDetailId: id}}) : Toast('产品id为空')
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
