
<template>
  <div class="jf-sp-list clearbox">
          <div class="item-box hhxh-left" v-for="item in items">
            <div>
              <div @click="goInfos(item.id, item.status)"><img v-lazy="makePhotoUrl(item.imagePath)" class="img-box"></div>
              <div class="m-t-8 text-overflow" @click="goInfos(item.id, item.status)">{{item.name}}</div>
              <div class="hhxh-flex m-t-8">
                <div class="blue flex-1" @click="goInfos(item.id, item.status)">{{item.price}}积分</div>
                <div @click.stop="goInfo(item.id, item.price, data.remainScore)" v-if="item.status === 1 || item.status === '1'">
                  <button class="mint-button mint-button--small ybb-btn"><label class="title-small1 mint-button-text">兑换</label></button>
                </div>
                <div v-if="item.status === -1 || item.status === '-1'">
                  <button class="mint-button mint-button--small ybb-btn" style="background-color: #c7c7c7!important;"><label class="title-small1 mint-button-text" >未上架</label></button>
                </div>
              </div>
            </div>
          </div>
  </div>
</template>
<script>
import {Toast, MessageBox} from 'mint-ui'
import helpers from '../../utils/helpers'
import mineInfoService from 'SERVICES/mineInfoService'
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    data: {
      photo: '',
      userName: '',
      mobile: '',
      areaId: '',
      provinceId: '',
      cityId: '',
      area: {},
      address: '',
      areaText: '',
      remainScore: ''
    }
  }),
  created () {
    this.loadMineInfo()
  },
  methods: {
    goInfo: function (id, price, remainScore) {
      if (this.data.userName === null || this.data.userName === '') {
        MessageBox.confirm('是否完善资料，完善资料可获取积分').then(
          //  确定
          action => {
            this.$router.push('MineInfo')
          }
       )
      } else {
        if (remainScore >= price) {
          id !== '' ? this.$router.push({name: 'PgMaterialInfo', params: {pgMaterialDetailId: id}}) : Toast('产品id为空')
        } else {
          Toast('积分不足')
        }
      }
    },
    goInfos: function (id, status) {
      id !== '' ? this.$router.push({name: 'PgMaterialDetail', params: {pgMaterialDetailId: id, pgMaterialStatus: status + ''}}) : Toast('产品id为空')
    },
    loadMineInfo: function () {
      mineInfoService.loadMineInfo().then(res => {
        this.data.photo = res.t.member.photo || ''
        this.data.userName = res.t.member.userName || ''
        this.data.mobile = res.t.member.mobile || ''
        this.data.area = res.t.member.area || ''
        this.data.address = res.t.member.address || ''
        this.dateValue = this.data.birthday
        this.data.remainScore = res.t.member.remainScore
        this.$store.state.remainScore = this.data.remainScore
      })
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      // console.info(url)
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    },
    html_decode: function (str) {
      return helpers.html_decode(str)
    }
  }
}
</script>
