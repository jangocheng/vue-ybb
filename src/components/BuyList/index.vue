<template>
  <div>
    <div class="ybb-list order-list-box" v-for="item in items" @click="goInfo(item.id)">
      <a class="mint-cell">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text gray">{{item.saleDate}}</span>
          </div>
        </div>
      </a>
      <a class="mint-cell">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-value"><img v-lazy="item.gwGoods.imgUrl" class="img-box1"></div>
          <div class="mint-cell-title">
            <div class="text-overflow1">{{item.gwGoods.title}}{{item.gwGoods.styleID}}</div>
            <div class="m-t-5"><span class="price-box">￥<i>{{item.amount}}</i></span></div>
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
      id !== '' ? this.$router.push({name: 'OrderDetail', params: {orderId: id, type: 'buy'}}) : Toast('购买订单id为空')
    }
  }
}
</script>
