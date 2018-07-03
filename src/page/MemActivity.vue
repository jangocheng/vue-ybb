<!-- 页面模版 -->
<template>
<div>
  <!--header-->
    <header class="mint-header is-fixed">
      <div class="mint-header-button is-left">
        <a class="router-link-active" @click="goHistory()">
          <button class="mint-button mint-button--default mint-button--normal">
            <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
          </button>
        </a>
      </div>
      <h1 class="mint-header-title title-3">会员活动</h1>
      <div class="mint-header-button is-right"></div>
    </header>
    <div class="header-empty"></div>
    <!--header end-->
    
    <!--container-->
    <div class="ybb-hd-container" v-if="activityList.length != 0">
      <!-- 优惠券列表 -->
      <div class="item-box" v-for="(item, index) in activityList" :class="isUsed(item.status)">
        <div class="hhxh-flex" @click="popQRCode(item.id)">
          <div class="flex-0 number1">￥<span>{{item.money}}</span></div>
          <div class="flex-1">
            <div class="text-overflow1">购买单只{{item.useLimit}}元以上腕表使用</div>
            <div class="gray title-small1">有效期：{{item.validityDate}}-{{item.expireDate}}</div>
            <div class="m-t-10" v-if="item.status == 0"><a class="yellow">立即使用></a></div>
          </div>
        </div>
      </div>
      <!-- 优惠券列表J结束 -->
    </div>
    <!--container end-->
    <no-data v-else="activityList.length == 0" :items="activityList"></no-data>
    <!--footer-->

    
    <!--fonter end-->

    <!--预约成功提示-->
  <div v-if="popVisible == true">
    <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 1003;">
      <div class="mint-msgbox" style="overflow: visible;">
        <div class="ybb-close-btn" @click="closePop()">x</div>
        <div class="mint-msgbox-message">
          <div class="yy-msg-title"><img src="../assets/code-h.png" ></div>
          <div class="yy-msg-body">
            <img :src="makePhotoUrl(qrcode)" style="width: 200px;">
            <div class="m-t-10 text-center yellow title-small1">将此二维码给门店店员扫描，获取优惠</div>
          </div>
        </div>
      </div>
    </div>
    <div class="v-modal" style="z-index: 1002;"></div>
  </div>
    <!-- 预约成功提示结束 -->
</div>
</template>

<script>
import ActivityService from 'SERVICES/ActivityService'
import helpers from 'utils/helpers'
export default {
  data: () => ({
    pageNo: 1,
    pageSize: 12,
    activityList: [],
    qrcode: '',
    popVisible: false
  }),
  created () {
    this.loadActivities()
  },
  methods: {
    loadActivities () {
      ActivityService.loadActivities(this.pageNo, this.pageSize).then(res => {
        this.activityList = res.t
      })
    },
    isUsed (status) {
      if (status === 10) {
        return 'disabled done'
      } else if (status === -10) {
        return 'disabled'
      }
    },
    popQRCode (id) {
      ActivityService.loadQRCode(id).then(res => {
        this.qrcode = res.t.qrcode
        this.$nextTick(() => {
          this.popVisible = true
          this.loadActivities()
        })
      })
    },
    closePop () {
      this.popVisible = false
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    goHistory () {
      this.$router.go(-1)
    }
  }
}
</script>
