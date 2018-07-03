<!-- 页面模版 -->
<template>
<div>
  <!--header-->
  <!-- <div>
    <header class="mint-header is-fixed">
      <div class="mint-header-button is-left"></div>
      <h1 class="mint-header-title title-3">我的</h1>
      <div class="mint-header-button is-right"></div>
    </header>
    <div class="header-empty"></div>
  </div> -->
  <!--header end-->
  <!--container-->
  <div>
    <div class="ybb-list mine-list">
      <a class="mint-cell" @click="goMineInfo">
        <span class="mint-cell-mask"></span>
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <span class="vip-level "
          :class="{
              'vip-1':userData.memberLevel === 'VIP会员',
              'vip-2':userData.memberLevel === '银牌会员',
              'vip-3':userData.memberLevel === '金牌会员',
              'vip-4':userData.memberLevel === '钻石会员',
              'vip-5':userData.memberLevel === '皇冠会员'}"></span>
          <div class="mint-cell-value vip-level-box">
            <img v-bind:src="makePhotoUrl(userData.photo)" :onerror="headImg" class="img-box4">
          </div>
          <div class="mint-cell-title title-0">{{userData.mobile}}</div>
          <i class="mint-cell-allow-right"></i>
        </div>
      </a>
    </div>
    <div class="ybb-list mine-list">
      <a class="mint-cell"  @click="goOrder">
        <span class="mint-cell-mask"></span>
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-value vip-level-box"><img src="../assets/mine-icon-1.png" class="img-box5"></div>
          <div class="mint-cell-title title-0">我的订单</div>
          <i class="mint-cell-allow-right"></i>
        </div>
      </a>
      <a class="mint-cell" @click="goPriceShop">
        <span class="mint-cell-mask"></span>
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-value vip-level-box"><img src="../assets/mine-icon-2.png" class="img-box5"></div>
          <div class="mint-cell-title title-0">积分商城</div>
          <i class="mint-cell-allow-right"></i>
        </div>
      </a>
      <a class="mint-cell">
        <span class="mint-cell-mask" @click="goMinePreferential"></span>
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-value vip-level-box"><img src="../assets/mine-icon-3.png" class="img-box5"></div>
          <div class="mint-cell-title title-0">我的特权</div>
          <i class="mint-cell-allow-right"></i>
        </div>
      </a>
    </div>
    <div class="ybb-list mine-list">
       <a class="mint-cell">
          <span class="mint-cell-mask" @click="goDynamicList"></span> 
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-value vip-level-box"><img src="../assets/dynamic-icon.png" class="img-box5"></div>
            <div class="mint-cell-title title-0">品牌动态</div>
            <i class="mint-cell-allow-right"></i>
          </div>
        </a>
        <a class="mint-cell">
          <span class="mint-cell-mask" @click="goMemActivity"></span> 
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-value vip-level-box"><img src="../assets/ybb-hd.png" class="img-box5"></div>
            <div class="mint-cell-title title-0">会员活动</div>
            <i class="mint-cell-allow-right"></i>
          </div>
        </a>
        
      </div>
    <div class="ybb-list mine-list">
      <a class="mint-cell">
        <span class="mint-cell-mask" @click="goQualityService"></span>
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-value vip-level-box"><img src="../assets/mine-icon-4.png" class="img-box5"></div>
          <div class="mint-cell-title title-0">双倍保障</div>
          <i class="mint-cell-allow-right"></i>
        </div>
      </a>
      <a class="mint-cell" @click="goSalesOutlets">
        <span class="mint-cell-mask"></span>
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-value vip-level-box"><img src="../assets/mine-icon-5.png" class="img-box5"></div>
          <div class="mint-cell-title title-0">销售网点查询</div>
          <i class="mint-cell-allow-right"></i>
        </div>
      </a>
    </div>
    <div class="ybb-list mine-list">
      <a class="mint-cell">
        <span class="mint-cell-mask" @click="goMineChat"></span>
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-value vip-level-box"><img src="../assets/mine-icon-6.png" class="img-box5"></div>
          <div class="mint-cell-title title-0">咨询购买</div>
          <i class="mint-cell-allow-right"></i>
        </div>
      </a>
      <a class="mint-cell">
        <span class="mint-cell-mask" @click="recommendFriends"></span>
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-value vip-level-box"><img src="../assets/recommend-code.png" class="img-box5"></div>
          <div class="mint-cell-title title-0">推荐二维码</div>
          <i class="mint-cell-allow-right"></i>
        </div>
      </a>
    </div>
    <div class="ybb-list mine-list" @click="loginOut">
      <a class="mint-cell">
        <span class="mint-cell-mask"></span>
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title title-0 text-center color-1" @click="loginOut">退出</div>
        </div>
      </a>
    </div>
  </div>
  <!--container end-->

  <!--footer-->
  <div class="footer-empty"></div>
  <div class="mint-tabbar is-fixed ybb-footer">
    <a class="mint-tab-item " @click="goIndex">
      <div class="mint-tab-item-icon product"></div>
      <div class="mint-tab-item-label">首页</div>
    </a>
    <a class="mint-tab-item is-selected">
      <div class="mint-tab-item-icon mine"></div>
      <div class="mint-tab-item-label">我的</div>
    </a>
    <a class="mint-tab-item" @click="goMaintain">
      <div class="mint-tab-item-icon soul"></div>
      <div class="mint-tab-item-label">售后</div>
    </a>
  </div>
  <!--fonter end-->
  <popQRCode :imagePath="image" :isOk="isInfo" @listenChildEvent="goMine"></popQRCode>
</div>
</template>

<script>
import popQRCode from 'components/PopQRCode'
import mineInfoService from 'SERVICES/mineInfoService'
import {MessageBox} from 'mint-ui'
import helpers from '../utils/helpers'
export default {
  components: {
    popQRCode
  },
  data: () => ({
    headImg: 'this.src="' + require('../assets/img.png') + '"',
    userData: JSON.parse(localStorage.getItem('userDate')) || {mobile: '', photo: '', memberLevel: ''},
    isInfo: false,
    image: ''
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadMineInfo()
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'MineOrder') {
      to.meta.keepAlive = false
    }
    next()
  },
  beforeRouteEnter (to, from, next) {
    sessionStorage.clear()
    next()
  },
  methods: {
    goIndex: function () {
      this.$router.push('/')
    },
    goOrder: function () {
      this.$router.push('MineOrder')
    },
    goMaintain: function () {
      this.$router.push('/MaintainSrv')
    },
    goMineInfo: function () {
      this.$router.push('MineInfo')
    },
    goSalesOutlets: function () {
      this.$router.push('SalesOutlets')
    },
    goPriceShop: function () {
      this.$router.push('PriceShop')
    },
    goMinePreferential: function () {
      this.$router.push('MinePreferential')
    },
    goQualityService: function () {
      this.$router.push('QualityService')
    },
    goMineChat: function () {
      this.$router.push('MineChat')
    },
    goTradeList: function () {
      this.$router.push('TradeList')
    },
    goDynamicList: function () {
      this.$router.push('DynamicList')
    },
    goMemActivity () {
      this.$router.push({
        name: 'MemActivity'
      })
    },
    loginOut: function () {
      MessageBox({
        title: '提示',
        message: '是否退出登录?',
        showCancelButton: true
      }).then(res => {
        if (res !== 'cancel') {
          const openId = localStorage.getItem('openId')
          localStorage.clear()
          localStorage.setItem('isOut', true)
          localStorage.setItem('openId', openId)
          this.$router.push('Login')
        }
      })
    },
    loadMineInfo: function () {
      mineInfoService.loadMineInfo().then(res => {
        let member = res.t.member
        if (member.photo === null) {
          member.photo = ''
        }
        localStorage.setItem('userDate', JSON.stringify(member))
        this.userData = JSON.parse(localStorage.getItem('userDate')) || {mobile: '', photo: '', memberLevel: ''}
      })
    },
    recommendFriends: function () {
      mineInfoService.recommendFriend().then(res => {
        this.image = res.t
        this.isInfo = true
      })
    },
    goMine: function (data) {
      this.isInfo = data
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
