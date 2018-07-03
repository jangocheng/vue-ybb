<!-- 维修首页 -->
<template>
<div>
  <!--header-->
    <!--header end-->
  <div class="soul-header">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title" @click="goRepair">
          <img src="../assets/soul-1.png">
        </div>
        <div class="mint-cell-title" @click="goMaintainBook">
          <img src="../assets/soul-2.png">
        </div>
        <div class="mint-cell-title" @click="goShop">
          <img src="../assets/soul-3.png">
        </div>
      </div>
  </div>
  <div class="soul-header">
    <div class="mint-cell-wrapper hhxh-flex">
      <div class="flex-1 blue text-center" @click="goRepairknowledge">保养常识</div>
      <div class="gray">|</div>
      <div class="flex-1 blue text-center" @click="goCommonProblem">常见问题</div>
    </div>
  </div> 
  <div class="title-0 soul-header-box">我的维修</div>
  <div class="ybb-list soul-list">
      <div class="soul-list-box1" v-for="item in items" @click="goRepairingPa(item.reserveId)">
        <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <span class="mint-cell-text gray">{{item.bizdate}}</span>
              </div>
              <div class="soul-btn-box flex-0">
                  <span class="blue" v-if="item.status==-1">失效</span>
                  <span class="blue" v-if="item.status==-2">弃修</span>
                  <span class="blue" v-if="item.status==0">预约</span>
                  <span class="blue" v-if="item.status==1 || item.status==7">已接单</span>
                  <span class="blue" v-else-if="item.status==3">维修中</span>
                  <span class="blue" v-else-if="item.status==4">领料中</span>
                  <span class="blue" v-else-if="item.status==6">已收款</span>
                  <button class="mint-button mint-button--small ybb-btn" v-else-if="item.status==8" @click.stop="goToEval(item.reserveId)"><label class="mint-button-text">评价</label></button>
                  <button class="mint-button mint-button--small ybb-btn" v-else-if="item.status==5" @click.stop="goSignFor(item.reserveId)"><label class="mint-button-text">签收确认</label></button>
                  <button class="mint-button mint-button--small ybb-btn" v-else-if="item.status==2" @click.stop="goRepairConfirm(item.reserveId)"><label class="mint-button-text">维修确认</label></button>
                  <span class="blue" v-else-if="item.status==9">已评价</span>
              </div>
            </div>
          </a>
          <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title sl-item-box">
                <div class="hhxh-flex ">
                  <div class="flex-0 sl-item-title gray">手表名称：</div>
                  <div class="flex-1 sl-item-name text-overflow1">{{item.goodsName}}</div>
                </div>
                <div class="hhxh-flex " style="margin-top: 8px">
                  <div class="flex-0 sl-item-title gray">手表型号：</div>
                  <div class="flex-1 sl-item-name text-overflow1">{{item.model}}</div>
                </div>
                <div class="hhxh-flex m-t-8">
                  <div class="flex-0 sl-item-title gray">接修人员：</div>
                  <div class="flex-1 sl-item-name text-overflow1">{{item.receiverName}}</div>
                </div>
              </div>
            </div>
          </a>
      </div>
    </div>
      <div class="no-data" v-if="items.length <= 0">
        <img src="../assets/no-data.png">
        <div class="gray text-center msg title-3">暂时没有数据哦！</div>
      </div>
  <!--footer-->
  <div class="footer-empty"></div>
  <div class="mint-tabbar is-fixed ybb-footer">
    <a class="mint-tab-item " @click="goIndex">
      <div class="mint-tab-item-icon product"></div>
      <div class="mint-tab-item-label">首页</div>
    </a>
    <a class="mint-tab-item " @click="goMine">
      <div class="mint-tab-item-icon mine"></div>
      <div class="mint-tab-item-label">我的</div>
    </a>
    <a class="mint-tab-item is-selected">
      <div class="mint-tab-item-icon soul"></div>
      <div class="mint-tab-item-label">售后</div>
    </a>
  </div>
  <!--fonter end-->
</div>
</template>

<script>
import maiService from 'SERVICES/maiService'
import {Toast, MessageBox} from 'mint-ui'
export default {
  data: () => ({
    items: []
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadMineInfo()
  },
  methods: {
    goIndex: function () {
      this.$router.push('/')
    },
    goMine: function () {
      this.$router.push('/Mine')
    },
    goRepairingPa: function (reserveId) {
      // 我的维修详情
      reserveId !== '' ? this.$router.push({name: 'MaiDetail', params: {reserveId: reserveId}}) : alert('产品id为空')
    },
    goGet: function () {
      this.$router.push('/Mine')
    },
    goRepair: function () {
      this.$router.push('/MaiBillSearch')
    },
    goRepairConfirm: function (reserveId) {
      // 我的维修详情
      reserveId !== '' ? this.$router.push({name: 'MaiSure', params: {reserveId: reserveId}}) : alert('产品id为空')
    },
    loadMineInfo: function () {
      maiService.loadMyRepairing().then(res => {
        this.items = res.t
      })
    },
    goShop: function () {
      this.$router.push('/MineDot')
    },
    goMaintainBook: function () {
      this.$router.push({name: 'MaiBook', params: {path: this.$route.path}})
    },
    goback: function () {
      this.$router.go(-1)
    },
    goSignFor: function (reserveId) {
      if (reserveId === undefined || reserveId === '') {
        Toast('数据出错')
      } else {
        MessageBox({
          title: '提示',
          message: '是否确认签收?',
          showCancelButton: true
        }).then(res => {
          if (res !== 'cancel') {
            maiService.SignFor(reserveId).then(res => {
              Toast(res.msg)
              for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].reserveId === reserveId) {
                  let item = this.items[i]
                  item.status = 8
                  this.items.splice(i, 1, item)
                }
              }
            })
            this.$router.push({
              name: 'evaluate',
              query: {
                reserveId: reserveId
              }
            })
          }
        })
      }
    },
    goRepairknowledge: function () {
      this.$router.push('/repairknowledge')
    },
    goCommonProblem: function () {
      this.$router.push('/commonProblem')
    },
    goToEval: function (reserveId) {
      this.$router.push({
        name: 'evaluate',
        query: {
          reserveId: reserveId
        }
      })
    }
  }
}
</script>
