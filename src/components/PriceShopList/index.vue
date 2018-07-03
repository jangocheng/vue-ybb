<template>
    <!--list -->
    <div class="list-box" v-infinite-scroll="loadGoodslist" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <card-list :items="discountItems" ></card-list>
        <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </div>
</template>
<script>
import PriceShop from 'components/PriceShop'
import priceShopService from 'SERVICES/priceShopService'

export default{
  components: {
    PriceShop
  },
  data: () => ({
    discountItems: [],
    loading: false,
    wrapperHeight: 0,
    pageNo: 1
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    // this.loadGoodslist(1, 10)
  },
  methods: {
    loadGoodslist: function () {
      priceShopService.loadGoodslist(this.pageNo, 6).then(res => {
        var list = res.t.list
        console.info('list===>' + res.t.count)
        if (Math.ceil(res.t.count / 6) >= this.pageNo) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.discountItems.push(list[i])
          }
          this.pageNo += 1
        }
        console.info('this.pageNo' + this.pageNo)
      })
    },
    loadMore: function () {
      this.loading = true // 需要分页控制
      // let last = this.discountItems[this.discountItems.length - 1]
      // var list = this.loadGoodslist(this.pageNo, 10)
      // console.info('list:' + JSON.stringify(list))
      // for (let i = 0; i <= list.size(); i++) {
      //   console.info(list[i])
      //   this.discountItems.push(list[i])
      // }
      this.loading = false
    }
  }
}
</script>
<style scoped>
  .page-infinite-loading {
      text-align: center;
      height: .8rem;
      line-height: .8rem;
  }
  .page-infinite-loading span {
    display: inline-block;
    vertical-align: middle;
  }
</style>
