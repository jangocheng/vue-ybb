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
      <h1 class="mint-header-title title-3">添加手表类型</h1>
      <div class="mint-header-button is-right"></div>
    </header>
    <div class="header-empty"></div>
    <!--header end-->
    
    <!--container-->
    
    <div class="ybb-yuyue">
      <div class="yy-item-box">
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">手表品牌</span>
            </div>
            <div class="mint-cell-value">
              <div class="mint-cell-value is-link" @click="brandStatus = true">
                <input placeholder="请选择手表品牌" readonly="readonly" v-model="brandText" type="text" class="mint-field-core text-right">
              </div>
            </div>
            <i class="mint-cell-allow-right"></i>
          </div>
        </a>
        <!-- <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">手表名称</span>
            </div>
            <div class="mint-cell-value">
              <div class="mint-cell-value">
                <input placeholder="请输入手表名称" v-model="watchName" type="text" class="mint-field-core text-right">
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
                
              </div>
            </div>
            
          </div>
        </a> -->
        <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">手表款号</span>
            </div>
            <div class="mint-cell-value">
              <div class="mint-cell-value">
                <input placeholder="请输入款号名称" v-model="watchNumber" type="text" class="mint-field-core text-right">
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
                
              </div>
            </div>
            
          </div>
        </a>
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">购买时间</span>
            </div>
            <div class="mint-cell-value">
              <div class="mint-cell-value is-link" @click="open('datePicker')">
                <input placeholder="请选择购买时间" type="text" readonly="readonly" class="mint-field-core text-right" v-model="buyDate">
              </div>
            </div>
            <i class="mint-cell-allow-right"></i>
          </div>
        </a>
        <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">二维码号</span>
            </div>
            <div class="mint-cell-value">
              <div class="mint-cell-value">
                <input placeholder="请输入二维码（非必填）" v-model="qrcode" type="text" class="mint-field-core text-right">
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
                
              </div>
            </div>
            
          </div>
        </a>
      </div>
      
    </div>

    <div class="yuyue-submit">
      <div class="hhxh-flex">
        <div class="flex-1">
          <button id="infoSave" class="mint-button mint-button--danger mint-button--large ybb-btn" @click="submit()"><label class="mint-button-text title-1">提交</label></button>
        </div>
      </div>
    </div>
    <mt-datetime-picker
                          ref="datePicker"
                          type="date"
                          :startDate="startDate"
                          :endDate="endDate"
                         v-model="dataValue"
                         @confirm="handleChange">
                         </mt-datetime-picker>
    <mt-actionsheet :actions="allStatus" v-model="brandStatus" cancel-text="取消" position="bottom"></mt-actionsheet>
    <!--container end-->

    <!--footer-->
    
    <!--fonter end-->
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
import mineOrderService from 'SERVICES/mineOrderService'
import $ from 'jquery'
export default {
  data: () => ({
    buyDate: '',
    dataValue: '',
    startDate: new Date('2000-01-01'),
    endDate: new Date('2099-12-31'),
    brandStatus: false,
    brand: '1',
    brandText: '依波表',
    allStatus: [],
    watchName: '',
    watchNumber: '',
    qrcode: ''
  }),
  mounted: function () {
    this.allStatus = [{
      name: '依波表',
      method: this.selectybb
    }, {
      name: '其他',
      method: this.selectother
    }]
  },
  methods: {
    open: function (picker) {
      this.$refs[picker].open()
    },
    handleChange: function (value) {
      this.dataValue = window.moment(value).format('YYYY-MM-DD')
      this.buyDate = window.moment(value).format('YYYY-MM-DD')
    },
    selectybb: function () {
      this.brand = '1'
      this.brandText = '依波表'
    },
    selectother: function () {
      this.brand = '2'
      this.brandText = '其他'
    },
    goback: function () {
      this.$router.go(-1)
    },
    submit: function () {
      if (this.watchNumber === '') {
        Toast('请填写手表款号')
      } else {
        $('#infoSave').attr('disabled', true)
        mineOrderService.addAsorderWatch(this.brand, this.watchName, this.watchNumber, this.buyDate, this.qrcode).then(
          res => {
            $('#infoSave').attr('disabled', false)
            Toast(res.msg)
            if (res.code === 200) {
              this.$router.replace('MineBookWatch')
            }
          },
          res => {
            $('#infoSave').attr('disabled', false)
          }
        )
      }
    }
  }
}
</script>
