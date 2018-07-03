<template>
  <div>
    <div>
      <div class="soul-list-box1" v-for="item in items" @click="goRepairingPa(item.reserveId)">
        <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <span class="mint-cell-text gray">{{item.bizdate}}</span>
              </div>
              <div class="mint-cell-value ">
                  <span class="sl-status yy" v-if="item.status==-1">失效</span>
                  <span class="sl-status yy" v-if="item.status==-2">弃修</span>
                  <span class="sl-status yy" v-if="item.status==1">已接单</span>
                  <span class="sl-status yy" v-else-if="item.status==2">待确认</span>
                  <span class="sl-status yy" v-else-if="item.status==3">维修中</span>
                  <span class="sl-status yy" v-else-if="item.status==4">领料中</span>
                  <span class="sl-status yy" v-else-if="item.status==5">已修完</span>
                  <span class="sl-status yy" v-else-if="item.status==6">已收款</span>
                  <span class="sl-status yy" v-else-if="item.status==0">预约</span>
              </div>
            </div>
          </a>
          <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title sl-item-box">
                <div class="hhxh-flex ">
                  <div class="flex-0 sl-item-title gray">手表名称：</div>
                  <div class="flex-1 sl-item-name text-overflow1">{{item.title}}</div>
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
    <!--container end-->
  </div>
</template>

<script>
import maiService from 'SERVICES/maiService'
export default {
  data: () => ({
    pageNo: '1',
    pageSize: '20',
    GoodsingallLoaded: false,
    pgMaterials: [],
    items: [],
    itemEnTry: [],
    lengNum: '',
    date: '',
    dates: []
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.locadRepair()
    this.cookie()
  },
  methods: {
    cookie: function () {
      document.cookie = 'name=值;[expires=失效时间;path=路径访问;domain=域名访问;secure=安全的https限制通信]'
      document.cookie = 'user=' + encodeURIComponent('杜杜')
      var date = new Date()
      date.setDate(date.getDate() + 7)
      document.cookie = 'user=' + encodeURIComponent('杜杜') + ';expires=' + date.toGMTString()
    },
    locadRepair: function () {
      maiService.locadRepair(this.pageNo, this.pageSize).then(res => {
        this.items = res.t
        this.lengNum = this.items.length
        for (let i = 0; i <= this.lengNum - 1; i++) {
          for (let j = i; j < this.lengNum; j++) {
            if (this.items[i].bizdate < this.items[j].bizdate) {
              this.dates = this.items[j]
              this.items[j] = this.items[i]
              this.items[i] = this.dates
            }
          }
        }
        if (this.lengNum === 0) {
          // 若数据已全部获取完毕，将绑定到组件bottom-all-loaded属性的变量赋值为true，这样bottom-method就不会再次执行了
          this.GoodsingallLoaded = true
        } else if (this.lengNum > 0 && this.lengNum <= this.pageSize) {
          for (let i = 0; i <= this.lengNum - 1; i++) {
            this.pgMaterials.push(this.items[i])
          }
          if (this.lengNum === this.pageSize) { // 长度达到每页的最大长度，说明后面可能还有数据
            this.pageNo += 1
          } else { // 没有更多的数据了
            this.GoodsingallLoaded = true
          }
        }
        console.info('pageNo===>' + this.pageNo)
      })
    },
    goRepairingPa: function (reserveId) {
      // 我的维修详情
      reserveId !== '' ? this.$router.push({name: 'MaiDetail', params: {reserveId: reserveId}}) : alert('产品id为空')
    }
  }
}
</script>

