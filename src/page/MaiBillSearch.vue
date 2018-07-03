<template>
  <div>
    <!--header-->
    <header class="mint-header is-fixed">
      <div class="mint-header-button is-left">
        <a class="router-link-active" @click="goback">
          <button class="mint-button mint-button--default mint-button--normal">
            <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
          </button>
        </a>
      </div>
      <h1 class="mint-header-title title-3">真伪查询</h1>
      <div class="mint-header-button is-right"></div>
    </header>
    <div class="header-empty"></div>
    <!--header end-->
    
    <!--container-->
    <div class="mine-dot-search-box">
      <div class="hhxh-flex" style="box-shadow: none;">
        <div class="flex-1 dot-box m-r-5" style="box-shadow: 0 0 1px #b8bbbf;padding: 3px 5px;overflow: hidden;border-radius: 4px;">
          <input type="search" class="mint-field-core" placeholder="请输入二维码号" v-model="qrcode">
        </div>
        <div class="flex-0 m-l-10">
          <button class="mint-button mint-button--default mint-button--small ybb-btn" @click="search()"><label class="mint-button-text title-1">查询</label></button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import maiService from 'SERVICES/maiService'
import { Toast } from 'mint-ui'
export default {
  data: () => ({
    qrcode: ''
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
  },
  methods: {
    search: function () {
      maiService.issueDetailSearch(this.qrcode).then(res => {
        if (res.t === null || res.t === undefined) {
          Toast(res.msg)
        } else {
          this.$router.push({name: 'OrderDetail', params: {orderId: res.t, type: 'buy'}})
        }
      })
    },
    goback: function () {
      this.$router.push({
        name: 'MaintainSrv'
      })
    }
  }
}
</script>
