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

      <div class="flex-1 active" v-if="status >= '2'">
        <div class="img-box status-3"></div>
        <div class="m-t-8 txt-box">待确认</div>
      </div>
      <div class="flex-1" v-else>
        <div class="img-box status-3"></div>
        <div class="m-t-8 txt-box">待确认</div>
      </div>

      <div class="flex-1 active" v-if="status >= '3' || status >= '4'">
        <div class="img-box status-4"></div>
        <div class="m-t-8 txt-box">维修中</div>
      </div>
      <div class="flex-1" v-else>
        <div class="img-box status-4"></div>
        <div class="m-t-8 txt-box">维修中</div>
      </div>

      <div class="flex-1 active" v-if="status >= '5'">
        <div class="img-box status-4"></div>
        <div class="m-t-8 txt-box">已完成</div>
      </div>
      <div class="flex-1" v-else>
        <div class="img-box status-5"></div>
        <div class="m-t-8 txt-box">已完成</div>
      </div>

    </div>
    <p v-if=""></p>
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
                  <div class="flex-1" @click="open()" ><img src="../assets/see-pic.png"  class="m-r-10 see-pic"><i class="blue">查看图片</i></div>
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
                <div class="hhxh-flex m-t-8 hhxh-vertical-top">
                  <div class="gray m-r-10 flex-0">维修时间</div>
                  <div class="flex-1">{{repairedate}}</div>
                </div>
                <div class="hhxh-flex m-t-8 hhxh-vertical-top">
                  <div class="gray m-r-10 flex-0">预约取表时间</div>
                  <div class="flex-1">{{pickdate}}</div>
                </div>
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
    </div>
    <!--container end-->
       
  
  </div>
</template>


<script>
import maiService from 'SERVICES/maiService'
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
    pickdate: '',
    isRepair: '',
    status: '',
    entryList: [],
    photoList: [],
    repairNumber: '',
    booleShow: false,
    statusShow: false
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadMyDetail()
  },
  methods: {
    loadMyDetail: function () {
      this.repairId = this.$route.params.repairId
      this.repairNumber = this.$route.params.repairId
      maiService.issueDetailSearch(this.repairId).then(res => {
        this.repairId = res.t.reserveId
        this.model = res.t.model
        this.bizdate = res.t.bizdate
        this.repairdotName = res.t.repairdotName // 接修组织名
        this.mttroubletypeList = res.t.mttroubletypeList
        this.description = res.t.description
        this.status = res.t.status + ''
        this.photoList = res.t.photoList
        if (this.photoList[0] !== null) {
          this.statusShow = true
        }
        if (this.status >= 2) {
          this.booleShow = true
          maiService.searachDetailSearch(this.repairNumber).then(ask => {
            this.repairId = ask.t.repairId // 预约单id
            this.repairNumber = ask.t.repairNumber // 工单编号
            this.servicedescList = ask.t.servicedescList // 服务项目
            this.serviceremark = ask.t.serviceremark // 服务项目补充说明
            this.actreceiveamount = ask.t.actreceiveamount // 维修总额
            this.repairdotName = ask.t.repairdotName // 接修组织名
            this.receiverName = ask.t.receiverName // 接单人名
            this.repairedate = ask.t.repairedate // 预计维修时间
            this.pickdate = ask.t.pickdate // 预计取表时间
            this.isRepair = ask.t.isRepair // 客户是否维修 0：客户不维修，1：客户确认维修
            this.entryList = ask.t.entryList // 维修需要物料
          })
        }
      })
    }
  },
  open () {
    alert(this.photoList[0])
  }
}
</script>
