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
      <h1 class="mint-header-title title-3">我的抵换卷</h1>
      <div class="mint-header-button is-right"></div>
    </header>
    <div class="header-empty"></div>
    <!--header end-->
    
    <!--container-->
    <div class="ybb-yuyue trade-box">
      <div class="jf-exchange-div gray">未使用</div>
      <div class="yy-item-box mine-me">
        <a class="mint-cell mint-field" v-for="unusedVoucherList in unusedVoucherList">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-value hhxh-flex">
              <div class="flex-0">
              <img v-if="unusedVoucherList.amount==='30'" src="../assets/trade-30.png">
              <img v-if="unusedVoucherList.amount==='50'" src="../assets/trade-50.png">
              </div>
              <div class="flex-1 m-l-10">
                <div>序列号：&nbsp;&nbsp;<span>{{unusedVoucherList.number}}</span></div>
                <div class="m-t-5 time gray">有效期：&nbsp;&nbsp;<span>{{unusedVoucherList.time}}-{{unusedVoucherList.usetime}}</span></div>
              </div>
              <div class="flex-0">
                <button class="mint-button mint-button--small ybb-btn"><label class="mint-button-text">立即使用</label></button>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div class="jf-exchange-div gray" v-show="useShow===true">已使用</div>
      <div class="yy-item-box mine-me">
        <a class="mint-cell mint-field" v-for="usedVoucherList in usedVoucherList">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-value hhxh-flex">
              <div class="flex-0"><img src="../assets/trade-30.png"></div>
              <div class="flex-1 m-l-10">
                <div>序列号：&nbsp;&nbsp;<span>{{usedVoucherList.number}}</span></div>
                <div class="m-t-5 time gray">有效期：&nbsp;&nbsp;<span>{{usedVoucherList.time}}-{{usedVoucherList.usetime}}</span></div>
              </div>
              <div class="flex-0">
                <img src="../assets/done.png" class="img1">
              </div>
            </div>
          </div>
        </a>
        <a class="mint-cell mint-field" v-for="overdueVoucherList in overdueVoucherList">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-value hhxh-flex">
              <div class="flex-0"><img src="../assets/trade-50.png"></div>
              <div class="flex-1 m-l-10">
                <div>序列号：&nbsp;&nbsp;<span>{{overdueVoucherList.number}}</span></div>
                <div class="m-t-5 time gray">有效期：&nbsp;&nbsp;<span>{{overdueVoucherList.time}}-{{overdueVoucherList.usetime}}</span></div>
              </div>
              <div class="flex-0">
                <img src="../assets/overdue.png" class="img1">
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>

    

    <!--container end-->

    <!--footer-->

    
    <!--fonter end-->
  </div>
</template>
<script>
import priceShopService from 'SERVICES/priceShopService'
export default {
  data: () => ({
    usedVoucherList: [],
    unusedVoucherList: [],
    overdueVoucherList: [],
    useShow: false
  }),
  created: function () {
    this.loadVoucher()
  },
  methods: {
    loadVoucher: function () {
      priceShopService.loadMyVoucher().then(res => {
        let voucherList = res.t
        for (var i = 0; i < voucherList.length; i++) {
          var time = window.moment(voucherList[i].time).format('YYYY.MM.DD')
          voucherList[i].time = time
          time = window.moment(voucherList[i].usetime).format('YYYY.MM.DD')
          voucherList[i].usetime = time
          if (voucherList[i].status === 1) {
            this.unusedVoucherList.push(voucherList[i])
          } else if (voucherList[i].status === 2) {
            this.useShow = true
            this.usedVoucherList.push(voucherList[i])
          } else if (voucherList[i].status === 3) {
            this.useShow = true
            this.overdueVoucherList.push(voucherList[i])
          }
        }
      })
    },
    goback: function () {
      this.$router.push('Mine')
    }
  }
}
</script>
