<!-- 页面模版 -->
<template>
  <div class="order-detail-box">
    <!--header-->
    <com-header :title="headerData.title" :toLink="headerData.toLink"></com-header>
    <!--header end-->

    <!--container-->
    <div class="detail-containter" v-if="type == 'buy'">
      <div class="img-box"><img v-lazy="item.gwGoods.imgUrl" class="img-box1"></div>
      <div class="detail-desc">
        <div class="hhxh-flex">
          <div class="flex-0 gray m-r-5">商品名称：</div>
          <div class="flex-1 text-overflow">{{item.gwGoods.title}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">商品编号：</div>
          <div class="flex-1 text-overflow">{{item.gwGoods.styleID}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">上架时间：</div>
          <div class="flex-1 text-overflow">{{item.gwGoods.addTime}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">机芯分类：</div>
          <div class="flex-1 text-overflow">{{item.gwGoods.zidingyiMap.other_2}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">表带材质：</div>
          <div class="flex-1 text-overflow">{{item.gwGoods.zidingyiMap.other_3}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">产品系列：</div>
          <div class="flex-1 text-overflow">{{item.gwGoods.zidingyiMap.other_8}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">表镜材质：</div>
          <div class="flex-1 text-overflow">{{item.gwGoods.zidingyiMap.other_9}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">表带颜色：</div>
          <div class="flex-1 text-overflow">{{item.gwGoods.zidingyiMap.other_12}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">防水深度：</div>
          <div class="flex-1 text-overflow">{{item.gwGoods.zidingyiMap.other_13}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">表盘颜色：</div>
          <div class="flex-1 text-overflow">{{item.gwGoods.zidingyiMap.other_15}}</div>
        </div>
      </div>
      <div class="detail-bottom-box text-center">
        <div>
          <div class="title-1">购买日期：<span class="title-1">{{item.saleDate}}</span></div>
          <div class="title-1 m-t-8">购买价格：<span class="price-box white title-1">￥<i class="title-1">{{item.amount}}</i></span></div>
          <div class="title-1 m-t-8">质保期限：<span class="title-1">{{item.expireDate}}</span></div>
        </div>
      </div>
    </div>

    <div class="detail-containter" v-if="type == 'booking'">
      <div class="img-box"><img v-lazy="item.reserveGoods.imgUrl" class="img-box1"></div>
      <div class="detail-desc">
        <div class="hhxh-flex">
          <div class="flex-0 gray m-r-5">商品名称：</div>
          <div class="flex-1 text-overflow">{{item.reserveGoods.title}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">商品编号：</div>
          <div class="flex-1 text-overflow">{{item.reserveGoods.styleID}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">上架时间：</div>
          <div class="flex-1 text-overflow">{{item.reserveGoods.addTime}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">机芯分类：</div>
          <div class="flex-1 text-overflow">{{item.reserveGoods.zidingyiMap.other_2}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">表带材质：</div>
          <div class="flex-1 text-overflow">{{item.reserveGoods.zidingyiMap.other_3}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">产品系列：</div>
          <div class="flex-1 text-overflow">{{item.reserveGoods.zidingyiMap.other_8}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">表镜材质：</div>
          <div class="flex-1 text-overflow">{{item.reserveGoods.zidingyiMap.other_9}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">表带颜色：</div>
          <div class="flex-1 text-overflow">{{item.reserveGoods.zidingyiMap.other_12}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">防水深度：</div>
          <div class="flex-1 text-overflow">{{item.reserveGoods.zidingyiMap.other_13}}</div>
        </div>
        <div class="hhxh-flex m-t-8">
          <div class="flex-0 gray m-r-5">表盘颜色：</div>
          <div class="flex-1 text-overflow">{{item.reserveGoods.zidingyiMap.other_15}}</div>
        </div>
      </div>
      <div class="detail-bottom-box text-center">
        <div>
          <div class="title-1">下单时间：<span class="title-1">{{item.reserveDate}}</span></div>
          <div class="title-1 m-t-8">预约时间：<span class="title-1">{{item.arrivalDate}}</span></div>
          <div class="title-1 m-t-8">预约门店：<span class="title-1">{{item.shopName}}</span></div>
        </div>
      </div>
    </div>
    <!--container end-->
  </div>
</template>
<script>
import comHeader from 'components/comHeader'
import mineOrderService from 'SERVICES/mineOrderService'
export default {
  components: {
    comHeader
  },
  data: () => ({
    headerData: {
      title: '订单详情',
      toLink: '/MineOrder'
    },
    type: '',
    item: {},
    imgUrl: ''
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadOrder()
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/MineOrder') {
      to.meta.keepAlive = true
    }
    next()
  },
  methods: {
    loadOrder: function () {
      this.type = this.$route.params.type
      if (this.$route.params.type === 'buy') {
        mineOrderService.loadBuyOrderDetail(this.$route.params.orderId).then(res => {
          this.item = res.t
          this.imgUrl = this.item.reserveGoods.imgUrl
        })
      } else if (this.$route.params.type === 'booking') {
        mineOrderService.loadBookingOrderDetail(this.$route.params.orderId).then(res => {
          this.item = res.t
        })
      }
    }
  }
}
</script>
