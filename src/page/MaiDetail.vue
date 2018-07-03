<template>
  <div>
    <!--container-->
    <div class="soul-status-box hhxh-flex">
       <div class="flex-1 active" v-if="status >= '0'">
        <div class="img-box status-1"></div> 
        <div class="m-t-8 txt-box">已预约</div>
      </div>
      <div class="flex-1" v-else>
        <div class="img-box status-1"></div>
        <div class="m-t-8 txt-box">已预约</div>
      </div>

      <div class="flex-1 active" v-if="status >= '1' || status >= '7'">
        <div class="img-box status-2"></div>
        <div class="m-t-8 txt-box">检查中</div>
      </div>
      <div class="flex-1" v-else>
        <div class="img-box status-2"></div>
        <div class="m-t-8 txt-box">检查中</div>
      </div>

      <div class="flex-1 active" v-if="status >= '2' && status!= '7'">
        <div class="img-box status-3"></div>
        <div class="m-t-8 txt-box">待确认</div>
      </div>
      <div class="flex-1" v-else>
        <div class="img-box status-3"></div>
        <div class="m-t-8 txt-box">待确认</div>
      </div>

      <div class="flex-1 active" v-if="status >= '3' && status!= '7'">
        <div class="img-box status-4"></div>
        <div class="m-t-8 txt-box">维修中</div>
      </div>
      <div class="flex-1" v-else>
        <div class="img-box status-4"></div>
        <div class="m-t-8 txt-box">维修中</div>
      </div>

      <div class="flex-1 active" v-if="status >= '5' && status!= '7'">
        <div class="img-box status-4"></div>
        <div class="m-t-8 txt-box">已完成</div>
      </div>
      <div class="flex-1" v-else>
        <div class="img-box status-5"></div>
        <div class="m-t-8 txt-box">已完成</div>
      </div>

    </div>
    <p></p>
    <div class="soul-detail-box">
      <div class="item-box">
        <a class="mint-cell">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <div class="s-header-box">
                <div class="hhxh-flex">
                  <div class="m-r-10"><img src="../assets/soul-detail-1.png"></div>
                  <div class="flex-1 title-1">问题详情</div>
                </div>
              </div>
              <div class="s-body-box">
                <div class="hhxh-flex">
                  <div class="gray m-r-10 flex-0">手表类型</div>
                  <div class="flex-1">{{model}}</div>
                </div>
                <div class="hhxh-flex m-t-8">
                  <div class="gray m-r-10 flex-0">提交时间</div>
                  <div class="flex-1">{{bizdate}}</div>
                </div>
                <div class="hhxh-flex m-t-8 hhxh-vertical-top">
                  <div class="gray m-r-10 flex-0">维修门店</div>
                  <div class="flex-1">{{repairdotName}}</div>
                </div>
                <div class="hhxh-flex m-t-8">
                  <div class="gray m-r-10 flex-0">问题类型</div>
                  <div class="flex-1"><p v-for="mttroubletype in mttroubletypeList" style="float: left;margin-left: 5px;margin-right: 10px;">{{mttroubletype}}</p></div>
                </div>
                <div class="hhxh-flex m-t-8 hhxh-vertical-top">
                  <div class="gray m-r-10 flex-0">问题备注</div>
                  <div class="flex-1">{{description}}</div>
                </div>
                <div v-show='statusShow'>
                <div class="hhxh-flex m-t-8" >
                  <div class="gray m-r-10 flex-0">问题图片</div>
                  <div class="flex-1" @click="showPict" ><img src="../assets/see-pic.png"  class="m-r-10 see-pic"><i class="blue">查看图片</i></div>
                </div>
                </div>
              </div>
            </div>
            
          </div>
        </a>
      </div>
      <div class="item-box" v-show='booleShow'>
        <a class="mint-cell">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <div class="s-header-box">
                <div class="hhxh-flex">
                  <div class="m-r-10"><img src="../assets/soul-detail-2.png"></div>
                  <div class="flex-1 title-1">维修信息</div>
                </div>
              </div>
              <div class="s-body-box">
                <div class="hhxh-flex">
                  <div class="gray m-r-10 flex-0">服务项目</div>
                  <div class="flex-1" v-for="servicedesc in servicedescList">
                    <span class="line-block"><img src="../assets/soul-checked.png" class="m-r-5">{{servicedesc.name}}（<i>￥{{servicedesc.price}}</i>）</span>
                  </div>
                </div>
                <div class="hhxh-flex m-t-8">
                  <div class="gray m-r-10 flex-0">补充说明</div>
                  <div class="flex-1">{{serviceremark}}</div>
                </div>
                <div class="hhxh-flex m-t-8">
                  <div class="gray m-r-10 flex-0">所需配件</div>
                  <div class="flex-1" v-for="entry in entryList">{{entry.materialName}}{{entry.qty}}{{entry.measureunitname}}<i class="blue">(￥{{entry.amount}})</i></div>
                </div>
                <div class="hhxh-flex m-t-8">
                  <div class="gray m-r-10 flex-0">维修总额</div>
                  <div class="flex-1"><span class="price-box">￥<i>{{actreceiveamount}}</i></span></div>
                </div>
                <div class="hhxh-flex m-t-8 hhxh-vertical-top">
                  <div class="gray m-r-10 flex-0">接单人员</div>
                  <div class="flex-1">{{receiverName}}</div>
                </div>
                <!-- <div class="hhxh-flex m-t-8 hhxh-vertical-top">
                  <div class="gray m-r-10 flex-0">维修时间</div>
                  <div class="flex-1">{{repairedate}}</div>
                </div>
                <div class="hhxh-flex m-t-8 hhxh-vertical-top">
                  <div class="gray m-r-10 flex-0">预约取表时间</div>
                  <div class="flex-1">{{pickdate}}</div>
                </div> -->
                <div class="hhxh-flex m-t-8 hhxh-vertical-top">
                  <div class="gray m-r-10 flex-0" >确认状态</div>
                  <div class="flex-1" v-if="isRepair==1">客户确认维修</div>
                  <div class="flex-1" v-if="isRepair==-1">客户不维修</div>
                  <div class="flex-1" v-if="isRepair==0">待确认</div>
                </div>
              </div>
            </div>
            
          </div>
        </a>
      </div>

      <div class="item-box" v-if="this.ispaid === '1'">
        <a class="mint-cell">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <div class="s-header-box">
                <div class="hhxh-flex">
                  <div class="m-r-10"><img src="../assets/recieveable-icon.png"></div>
                  <div class="flex-1 title-1">收款详情</div>
                </div>
              </div>
              <div class="s-body-box">
                <div class="hhxh-flex m-t-8">
                  <div class="gray m-r-10 flex-0">应收金额</div>
                  <div class="flex-1">￥{{data.amount}}</div>
                </div>
                <div class="hhxh-flex m-t-8">
                  <div class="gray m-r-10 flex-0">积分服务</div>
                  <div class="flex-1"><span>{{data.serviceName}}</span></div>
                </div>
                <div class="hhxh-flex m-t-8 hhxh-vertical-top">
                  <div class="gray m-r-10 flex-0">实收金额</div>
                  <div class="flex-1">￥{{data.actamount}}</div>
                </div>
                
              </div>
            </div>
            
          </div>
        </a>
      </div>
    </div>
    <!--container end-->
    <!--查看图片-->
    <div class="ybb-big-box" v-show="showPic" @click="showPic = false">
      <div class="hhxh-flex header-box">
        <div class="flex-0" style="padding: 10px;"><i class="mintui mintui-back white title-4"></i></div>
        <div class="flex-1 text-center white title-3"><span id="index" class="title-3">1</span>/{{bigPics.length}}</div>
        <div class="flex-0"></div>
      </div>
      <div class="ybb-swipe-box" id="ybb-swipe-box" style="height: 100%;background-color: transparent;">
        <mt-swipe :auto="0" :show-indicators="false" :continuous="false" @change="handleChange">
          <mt-swipe-item v-for="item in bigPics">
              <img v-lazy="makePhotoUrl(item)" class="see-pic-box">
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <div class="v-modal" style="z-index: 1000;opacity: .5;" v-show="showPic"></div>
    <!--查看图片结束-->   
  
  </div>
</template>


<script>
import maiService from 'SERVICES/maiService'
import helpers from '../utils/helpers'
export default {
  data: () => ({
    model: '',
    repairId: '',
    bizdate: '',
    mttroubletypeList: [],
    description: '',
    servicedescList: '',
    serviceremark: '',
    actreceiveamount: '',
    repairdotName: '',
    receiverName: '',
    repairedate: '',
    reserveId: '',
    pickdate: '',
    isRepair: '',
    status: '',
    entryList: [],
    photoList: [],
    repairNumber: '',
    booleShow: false,
    statusShow: false,
    ispaid: '',
    data: {
      amount: '',
      actamount: '',
      serviceName: ''
    },
    showPic: false,
    bigPics: []
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadMyDetail()
  },
  methods: {
    showPict: function () {
      this.showPic = true
    },
    loadMyDetail: function () {
      this.repairId = this.$route.params.reserveId
      maiService.issueDetailList(this.repairId).then(res => {
        this.repairId = res.t.reserveId
        this.reserveId = res.t.reserveId
        this.model = res.t.model
        this.bizdate = res.t.bizdate
        if (res.t.mttroubletypeList !== null) {
          for (let i = 0; i <= res.t.mttroubletypeList.length - 1; i++) {
            this.mttroubletypeList.push(res.t.mttroubletypeList[i])
          }
        }
        this.description = res.t.description
        this.status = res.t.status + ''
        this.repairdotName = res.t.repairdotName // 接修组织名
        let list = res.t.photoList
        if (list !== null) {
          this.statusShow = true
          for (let i = 0; i < list.length; i++) {
            this.bigPics.push(list[i])
          }
        }
        if ((this.status >= '2' || this.status === '-2') && this.status !== '7') {
          this.booleShow = true
          maiService.repairDetailList(this.repairId).then(ask => {
            this.repairId = ask.t.repairId // 预约单id
            this.repairNumber = ask.t.repairNumber // 工单编号
            this.servicedescList = ask.t.servicedescList // 服务项目
            this.serviceremark = ask.t.serviceremark // 服务项目补充说明
            this.actreceiveamount = ask.t.amount // 维修总额
            this.repairdotName = ask.t.repairdotName // 接修组织名
            this.receiverName = ask.t.receiverName // 接单人名
            this.repairedate = ask.t.repairedate // 预计维修时间
            this.pickdate = ask.t.pickdate // 预计取表时间
            this.isRepair = ask.t.isRepair // 客户是否维修 0：客户不维修，1：客户确认维修
            this.entryList = ask.t.entryList // 维修需要物料
            this.ispaid = ask.t.ispaid + '' // 是否付款
            if (this.ispaid === '1') {
              maiService.payDetail(this.reserveId).then(action => {
                this.data.amount = action.t.amount + '' // 实收金额
                this.data.actamount = action.t.actamount + '' // 服务金额
                let array = action.t.serviceName // 服务项目
                this.data.serviceName = array.join(',')
              })
            }
          })
        }
      })
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      // console.info(url)
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    },
    handleChange: function (index) {
      document.querySelector('#index').innerHTML = index + 1
    }
  }
}
</script>
