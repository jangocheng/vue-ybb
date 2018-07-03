<template>
 <div class="soul-sure-box">
      <div class="header-box">您工单编号为<span class="blue">{{reserveNumber}}</span>的订单检查问题如下</div>
      <div>
        <div class="item-box">
          <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-value m-r-10">
                <span>故障描述</span>
              </div>
              <div class="mint-cell-title ">
                <div class="mint-cell-text hhxh-right">
                  <span class="line-block" v-for="trouble in mtTroubleTypeifyList">&nbsp;&nbsp;{{trouble.name}}<i v-if="trouble.quality == 1">(质量问题)</i></span>
                  
                </div>
              </div>
              
            </div>
          </a>
          <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-value m-r-10">
                <span>检查结果</span>
              </div>
              <div class="mint-cell-title">
                <span class="mint-cell-text hhxh-right"><p style="float: left;margin-left: 5px;margin-right: 10px;" v-for="repairdescList in repairdescList">{{repairdescList}}</p></span>
              </div>
              
            </div>
          </a>
          <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-value m-r-10">
                <span>服务项目</span>
              </div>
              <div class="mint-cell-title ">
                <div class="mint-cell-text hhxh-right">
                  <span class="line-block" v-for="servicedescList in servicedescList"><img src="../assets/soul-checked.png" class="m-r-5">&nbsp;&nbsp;{{servicedescList.name}}（<i>￥{{servicedescList.price}}</i>）</span>
                  
                </div>
              </div>
              
            </div>
          </a>
          <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-value m-r-10">
                <span>补充说明</span>
              </div>
              <div class="mint-cell-title">
                <span class="mint-cell-text hhxh-right">{{serviceremark}}</span>
              </div>
              
            </div>
          </a>
          <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-value m-r-10">
                <span>所需配件</span>
              </div>
              <div class="mint-cell-title">
                <span class="mint-cell-text hhxh-right" v-for="entryList in entryList">{{entryList.materialName}}：{{entryList.qty}}{{entryList.measureunitname}}（<i class="blue">￥{{entryList.amount}}</i>）</span>
              </div>
              
            </div>
          </a>
          <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-value m-r-10">
                <span>维修总费</span>
              </div>
              <div class="mint-cell-title">
                <span class="mint-cell-text hhxh-right">
                  <span class="price-box">￥<i>{{amount}}</i></span>
                </span>
              </div>
              
            </div>
          </a>
        </div>
        <div class="item-box m-t-">
          <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-value m-r-10">
                <span>维修门店</span>
              </div>
              <div class="mint-cell-title">
                <span class="mint-cell-text hhxh-right">{{repairdotName}}</span>
              </div>
              
            </div>
          </a>
          <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-value m-r-10">
                <span>接单人员</span>
              </div>
              <div class="mint-cell-title ">
                <span class="mint-cell-text hhxh-right">{{receiverName}}</span>
              </div>
              
            </div>
          </a>
          <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-value m-r-10">
                <span>维修时间</span>
              </div>
              <div class="mint-cell-title">
                <span class="mint-cell-text hhxh-right">{{repairedate}}</span>
              </div>
              
            </div>
          </a>
          <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-value m-r-10">
                <span>预计取表时间</span>
              </div>
              <div class="mint-cell-title">
                <span class="mint-cell-text hhxh-right">{{pickdate}}</span>
              </div>
              
            </div>
          </a>
          
        </div>
        <div class="yuyue-submit">
          <div class="hhxh-flex">
            <div class="flex-1">
              <button @click="goWindowTan(reserveId, '-1')" class="mint-button mint-button--danger mint-button--large is-plain ybb-btn-1"><label class="mint-button-text title-1">不需要维修</label></button>
            </div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="flex-1">
              <button @click="goWindowTan(reserveId, '1')" class="mint-button mint-button--default mint-button--large ybb-btn"><label class="mint-button-text title-1">确认维修</label></button>
            </div>
          </div>

          
          
        </div>
      </div>
      
    
    </div>
</template>


<script>
import maiService from 'SERVICES/maiService'
import { Toast, MessageBox } from 'mint-ui'
export default {
  data: () => ({
    model: '',
    reserveId: '',
    bizdate: '',
    repairdescList: [],
    description: '',
    servicedescList: '',
    serviceremark: '',
    amount: '',
    repairdotName: '',
    receiverName: '',
    repairedate: '',
    pickdate: '',
    isRepair: '',
    status: '',
    entryList: [],
    photoList: [],
    repairNumber: '',
    mtTroubleTypeifyList: [],
    reserveNumber: ''
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadRepairConfirm()
  },
  methods: {
    loadRepairConfirm: function () {
      this.reserveId = this.$route.params.reserveId
      maiService.loadRepairConfirm(this.reserveId).then(res => {
        this.reserveId = res.t.reserveId
        this.bizdate = res.t.bizdate
        this.repairdescList = res.t.repairdescList
        this.description = res.t.description
        this.servicedescList = res.t.servicedescList
        this.serviceremark = res.t.serviceremark
        this.amount = res.t.amount
        this.repairdotName = res.t.repairdotName
        this.receiverName = res.t.receiverName
        this.repairedate = res.t.repairedate
        this.pickdate = res.t.pickdate
        this.isRepair = res.t.isRepair
        this.status = res.t.status
        this.entryList = res.t.entryList
        this.photoList = res.t.photoList
        this.reserveNumber = res.t.repairNumber
        this.mtTroubleTypeifyList = res.t.mtTroubleTypeifyList
      })
    },
    goWindowTan: function (reserveId, isRepair) {
      this.status = '您确认不需要维修？'
      if (isRepair === '1') {
        this.status = '您是否确认维修？'
      }
      MessageBox.confirm(this.status).then(action => {
        maiService.entryRepairConfirm(reserveId, isRepair).then(res => {
          this.status = res.code
          if (this.status === 200) {
            Toast('操作成功!')
            reserveId !== '' ? this.$router.push({name: 'MaintainSrv', params: {reserveId: reserveId}}) : alert('产品id为空')
          }
        })
      })
    }
  }
}
</script>
