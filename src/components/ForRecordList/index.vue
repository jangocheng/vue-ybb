<template>
<div class="jf-record-list" >
          <div class="soul-list-box1" >
            <a class="mint-cell" v-for="item in items" >
              <div class="mint-cell-wrapper" @click="goInfo(item.id, item.pgOrderentry.pgMaterial.pgMaterialType.name)">
                <div style="width: 100%;" class="sl-item-box">
                    <div class="hhxh-flex">
                      <div class="flex-1"><span class="mint-cell-text gray">{{item.bizDate}}</span></div>
                      <div class="flex-0">
                        <div  v-if="item.status===1"><span style="color: #7aae1f">已兑换</span></div>
                        <!-- <div  v-if="item.status===1"><span class="sl-status red">已兑换</span></div> -->
                        <div  v-if="item.status===3"><span class="sl-status red">已发货</span></div>
                        <div  v-if="item.status===4"><span class="sl-status gray">已取消</span></div>
                        <div  v-if="item.status===2"><span class="sl-status red">已使用</span></div>
                      </div>
                    </div>
                    <div class="m-t-8">
                      <div class="hhxh-flex hhxh-vertical-bottom">
                        <div class="flex-1 sl-item-title m-r-10">
                          <div>{{item.pgOrderentry.pgMaterial.name}}</div>
                          <div style="color: #d2ac67; margin-top: 6px;" v-if="item.pgOrderentry.pgMaterial.pgMaterialType.name ==='抵扣券'">{{item.redeemCode}}</div>
                          <div style="color: #b2b2b2; margin-top: 5px; ">-{{item.amount}}</div>
                        </div>
                        <div class="flex-0 sl-item-name text-overflow1" @click="alreadyUse(item.id)" v-if="item.pgOrderentry.pgMaterial.pgMaterialType.name ==='抵扣券'">
                          <button v-if="item.status!=2" class="mint-button mint-button--small ybb-btn"><label class="mint-button-text">使用</label></button>
                        </div>
                      </div>
                    </div>
                </div>
                
              </div>
            </a>
          </div>
</div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui'
import helpers from '../../utils/helpers'
import priceShopService from 'SERVICES/priceShopService'
import $ from 'jquery'
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    pgMaterialTypeName: ''
  }),
  methods: {
    goInfo: function (id, pgMaterialTypeName) {
      sessionStorage.setItem('scorllTop', $(window).scrollTop())
      id !== '' ? this.$router.push({name: 'ForRecordDetail', params: {ForRecordDetailId: id, pgMaterialTypeName: pgMaterialTypeName}}) : Toast('产品id为空')
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      // console.info(url)
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    },
    cancelRecords: function (id) {
      MessageBox({
        title: '提示',
        message: '确认取消此次兑换吗?',
        showCancelButton: true
      }).then(res => {
        if (res !== 'cancel') {
          priceShopService.cancelRecord(id).then(res => {
            this.$emit('reload')
          })
        }
      })
    },
    alreadyUse: function (id) {
      MessageBox({
        title: '提示',
        message: '确认使用此项目吗?',
        showCancelButton: true
      }).then(res => {
        if (res !== 'cancel') {
          priceShopService.isAlreadyUse(id).then(res => {
            Toast('使用成功')
            this.$emit('reload')
          })
        }
      })
    }
  }
}
</script>
