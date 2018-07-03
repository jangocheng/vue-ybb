<template>
  <div>
    <div class="ybb-list order-list-box" v-for="item in items" @click="goInfo(item.id)">
      <a class="mint-cell">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text gray">{{item.reserveDate}}</span>
          </div>
          <div class="mint-cell-value ">
            <!-- 状态  1：预约；2：成交；3：未成交；4：失效 -->
            <span class="sl-status order-color-1" v-if="item.status === 1">已预约</span>
            <span class="sl-status order-color-2" v-if="item.status === 2">已成交</span>
            <span class="sl-status gray" v-if="item.status === 3">未成交</span>
            <span class="sl-status red" v-if="item.status === 4">已失效</span>
          </div>
        </div>
      </a>
      <a class="mint-cell">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-value"><img v-lazy="item.reserveGoods.imgUrl" class="img-box1"></div>
          <div class="mint-cell-title">
            <div class="text-overflow1">{{item.reserveGoods.title}}{{item.reserveGoods.styleID}}</div>
            <div class="m-t-5"><span class="price-box">￥<i>{{item.reserveGoods.pirce}}</i></span></div>
          </div>
        </div>
      </a>
      <span class="mint-cell-mask"></span> 
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
      id !== '' ? this.$router.push({name: 'OrderDetail', params: {orderId: id, type: 'booking'}}) : Toast('预约订单id为空')
    }
  }
}
</script>
