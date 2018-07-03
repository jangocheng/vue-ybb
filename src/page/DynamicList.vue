<template>
  <div>
    <!--header-->
    <header class="mint-header is-fixed">
      <div class="mint-header-button is-left">
        <a class="router-link-active" @click="goBack">
          <button class="mint-button mint-button--default mint-button--normal">
            <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
          </button>
        </a>
      </div>
      <h1 class="mint-header-title title-3">品牌动态</h1>
      <div class="mint-header-button is-right"></div>
    </header>
    <div class="header-empty"></div>
    <!--header end-->
    
    <!--container-->
    <mt-loadmore :bottom-method="loadDynamicServiceList" :bottom-all-loaded="dynamicLoaded" ref="loadmore">
    <div class="dynamic-list-box" v-for="item in dynamicListItem" @click="seeDetail(item.activityintro)">
      <div class="item-box" v-if="isInfo === false">
        <img v-lazy="makePhotoUrl(item.titlepic)" class="img-box">
      </div>
    </div>
    <!--container end-->

    <!--footer-->

    
    <!--fonter end-->
    </mt-loadmore>
    <dynamicServiceDetail  @ok="hiddenDetail" :item="detailItem" v-if="isInfo === true"></dynamicServiceDetail>
  </div>
</template>
<script>
import {Indicator} from 'mint-ui'
import dynamicService from 'SERVICES/dynamicService'
import helpers from '../utils/helpers'
import dynamicServiceDetail from 'components/DynamicServiceDetail'
export default {
  components: {
    dynamicServiceDetail
  },
  data: () => ({
    dynamicListItem: [],
    detailItem: '',
    isInfo: false,
    dynamicLoaded: false,
    pageNo: 1,
    pageSize: 10
  }),
  created () {
  },
  methods: {
    loadDynamicServiceList: function () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      dynamicService.loadDynamicServiceList(this.pageNo, this.pageSize).then(res => {
        let list = res.t
        if (list.length === 0) {
          // 若数据已全部获取完毕，将绑定到组件bottom-all-loaded属性的变量赋值为true，这样bottom-method就不会再次执行了
          this.qualityallLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.dynamicListItem.push(list[i])
            Indicator.close()
          }
          if (list.length === this.pageSize) { // 长度达到每页的最大长度，说明后面可能还有数据
            this.pageNo += 1
          } else { // 没有更多的数据了
            this.dynamicLoaded = true
          }
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
    html_decode: function (str) {
      return helpers.html_decode(str)
    },
    seeDetail: function (url) {
      this.isInfo = true
      this.detailItem = url
    },
    hiddenDetail: function () {
      this.isInfo = false
    },
    goBack: function () {
      window.history.back()
    }
  }
}
</script>

<style>
  img[lazy=loading] {
    width: 40px;
    height: 50px;
    margin: auto;
  }
</style>
