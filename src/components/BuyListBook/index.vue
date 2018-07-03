<template>
  <div>
    <div class="ybb-list order-list-box" v-for="item in items" @click="onClickBook(item.gwGoods.title, item.id)">
      <a class="mint-cell">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text gray">{{item.saleDate}}</span>
          </div>
        </div>
      </a>
      <a class="mint-cell">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-value"><img v-lazy="item.gwGoods.imgUrl" class="img-box1"></div>
          <div class="mint-cell-title">
            <div class="text-overflow1">{{item.gwGoods.title}}{{item.gwGoods.styleID}}</div>
            <div class="m-t-5"><span class="price-box">￥<i>{{item.amount}}</i></span></div>
          </div>
        </div>
      </a>
      <span class="mint-cell-mask"></span> 
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
      WatchName: '',
      WatchId: '',
      WatchNumber: '',
      Brand: '',
      buyDate: '',
      qrcode: '',
      addressname: '',
      addressId: '',
      dateValue: '',
      texts: '',
      roubletype: []
    }
  },
  created () {
    this.Load()
  },
  methods: {
    Load: function () {
      this.WatchName = this.$route.params.WatchName
      this.WatchId = this.$route.params.WatchId
      this.WatchNumber = this.$route.params.WatchNumber
      this.Brand = this.$route.params.Brand
      this.buyDate = this.$route.params.buyDate
      this.qrcode = this.$route.params.qrcode
      this.addressname = this.$route.params.addressname
      this.addressId = this.$route.params.addressId
      this.dateValue = this.$route.params.dateValue
      this.texts = this.$route.params.texts
      this.roubletype = this.$route.params.roubletype
    },
    onClickBook: function (WatchName, WatchId) {
      WatchName !== '' ? this.$router.push({name: 'MaiBook', params: {path: this.$route.path, brand: this.Brand, watchName: this.WatchName, watchNumber: this.watchNumber, buyDate: this.buyDate, qrcode: this.qrcode, WatchId: WatchId, addressname: this.addressname, addressId: this.addressId, dateValue: this.dateValue, texts: this.texts, roubletype: this.roubletype}}) : alert('产品id为空')
    }
  }
}
</script>
