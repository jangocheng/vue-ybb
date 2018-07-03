<template>
  <div>
    <!--header-->
    <header class="mint-header is-fixed">
      <div class="mint-header-button is-left">
        <a class="router-link-active" @click="goback()">
          <button class="mint-button mint-button--default mint-button--normal">
            <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
          </button>
        </a>
      </div>
      <h1 class="mint-header-title title-3">确认兑换</h1>
      <div class="mint-header-button is-right"></div>
    </header>
    <div class="header-empty"></div>
    <!--header end-->
    
    <!--container-->
    <div class="ybb-yuyue">
      <div class="yy-item-box mine-me">
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">兑换种类</span>
            </div>
            <div class="mint-cell-value hhxh-flex">
              <div class="flex-1 text-right">{{nowVoucher.amount}}元抵换卷</div>
            </div>
          </div>
        </a>
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">消耗积分</span>
            </div>
            <div class="mint-cell-value hhxh-flex">
              <div class="flex-1 text-right">{{nowVoucher.ponits}}</div>
            </div>
          </div>
        </a>
      </div>
      
      <div class="jf-exchange-div gray">当前积分：<span class="blue title-1">{{remainScore}}</span></div>
    </div>

    <div class="yuyue-submit">
      <button class="mint-button mint-button--default mint-button--large ybb-btn" @click="convert()"><label class="mint-button-text title-1">确认兑换</label></button>
    </div>

    <!--container end-->

    <!--footer-->

    
    <!--fonter end-->
  </div>
</template>
<script>
import priceShopService from 'SERVICES/priceShopService'
import { Toast } from 'mint-ui'
export default {
  data: () => ({
    nowVoucher: '',
    remainScore: ''
  }),
  created: function () {
    this.nowVoucher = this.$route.params.nowVoucher
    this.remainScore = this.$route.params.remainScore
  },
  methods: {
    goback: function () {
      this.$router.push('/PriceShop')
    },
    convert: function () {
      priceShopService.convertPgVoucher(this.nowVoucher.id).then(res => {
        Toast(res.msg)
        if (res.code === 200) {
          this.$router.push('TradeList')
        }
      })
    }
  }
}
</script>
