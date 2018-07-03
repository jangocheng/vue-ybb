<template>
    <div>
        <!--h-nav-->
     <div class="ybb-list">
      <div class="jf-mine-tab-header hhxh-flex" id="jf-mine-tab-header">
        <div class="jf-mine-item flex-1 " :class="{ active: isActive() === 'all'}" @click="initSearchs();goProductCenter()"><span class="title-0">全部</span></div>
        <div class="jf-mine-item flex-1 " :class="{ active: isActive() === 'man'}" @click="data.ProductTypeID = '9';goProductCenter()"><span class="title-0">男表</span></div>
        <div class="jf-mine-item flex-1 " :class="{ active: isActive() === 'woMan'}" @click="data.ProductTypeID = '7';goProductCenter()"><span class="title-0">女表</span></div>
        <div class="jf-mine-item flex-1 " :class="{ active: isActive() === 'couples'}" @click="data.ProductTypeID = '8';goProductCenter()"><span class="title-0">情侣表</span></div>
        <div class="jf-mine-item flex-1 " :class="{ active: isActive() === 'search'}" @click="showSearch"><span class="title-0">筛选</span></div>
      </div>
      <div v-infinite-scroll="loadProductCenterslist" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <productCenter :items="productCenterItems"></productCenter>
          <no-data :items="productCenterItems" ></no-data>
      </div>

     </div>
        <!--search options-->
      <div class="page-popup" v-show="isShow" >
      <div class="mint-popup mint-popup-bottom" style="z-index: 1019;">
        <div class="shaixuan-box">
          <div class="sx-title title-1">筛选条件</div>
          <div class="sx-close-box" @click="showSearch"></div>
          <div class="sx-scroll-box">
              <div class="sx-item">
              <div class="sx-item-title gray title-0">类型</div>
              <div class="sx-item-container">
                <button class="mint-button mint-button--default mint-button--small " :class="{ 'ybb-btn': data.ProductTypeID === '-1' }"
                       @click="data.ProductTypeID = '-1'">全部</button>
                <button class="mint-button mint-button--default mint-button--small"
                :class="{ 'ybb-btn': data.ProductTypeID === ProductTypeID.id}"
                       @click="data.ProductTypeID = ProductTypeID.id" v-for="ProductTypeID in dataSelect.ProductTypeIDs">
                       {{ProductTypeID.title}}
                       </button>
              </div>
            </div>
              <div class="sx-item">
              <div class="sx-item-title gray title-0">机芯分类</div>
              <div class="sx-item-container">
                <button class="mint-button mint-button--default mint-button--small" :class="{ 'ybb-btn': data.other2 === '0' }"
                       @click="data.other2 = '0'">全部</button>
                <button class="mint-button mint-button--default mint-button--small" :class="{ 'ybb-btn': data.other2 === other2}" v-for="other2 in dataSelect.other2s" @click="data.other2 = other2">
                       {{other2}}
                       </button>
              </div>
            </div>

              <div class="sx-item">
              <div class="sx-item-title gray title-0">表带材质</div>
              <div class="sx-item-container">
                <button class="mint-button mint-button--default mint-button--small"  :class="{ 'ybb-btn': data.other3 === '0' }"
                       @click="data.other3 = '0'">全部</button>
                <button class="mint-button mint-button--default mint-button--small"  v-for="other3 in dataSelect.other3s" :class="{ 'ybb-btn': data.other3 === other3}"
                       @click="data.other3 = other3">
                       {{other3}}
                     </button>
              </div>
            </div>

              <div class="sx-item">
              <div class="sx-item-title gray title-0">产品系列</div>
              <div class="sx-item-container">
                <button class="mint-button mint-button--default mint-button--small"  :class="{ 'ybb-btn': data.other8 === '0' }"
                       @click="data.other8 = '0'">全部</button>
                <button class="mint-button mint-button--default mint-button--small"  v-for="other8 in dataSelect.other8s" :class="{ 'ybb-btn': data.other8 === other8}"
                       @click="data.other8 = other8">
                       {{other8}}
                     </button>
              </div>
            </div>

            <div class="sx-item">
              <div class="sx-item-title gray title-0">表镜材料</div>
              <div class="sx-item-container">
                <button class="mint-button mint-button--default mint-button--small"  :class="{ 'ybb-btn': data.other9 === '0' }"
                       @click="data.other9 = '0'">全部</button>
                <button class="mint-button mint-button--default mint-button--small"  v-for="other9 in dataSelect.other9s" :class="{ 'ybb-btn': data.other9 === other9}"
                       @click="data.other9 = other9">
                       {{other9}}
                     </button>
              </div>
            </div>

            <div class="sx-item">
              <div class="sx-item-title gray title-0">表带颜色</div>
             <div class="sx-item-container">
                <button class="mint-button mint-button--default mint-button--small"  :class="{ 'ybb-btn': data.other12 === '0' }"
                       @click="data.other12 = '0'">全部</button>
                <button class="mint-button mint-button--default mint-button--small"  v-for="other12 in dataSelect.other12s" :class="{ 'ybb-btn': data.other12 === other12}"
                       @click="data.other12 = other12">
                       {{other12}}
                     </button>
              </div>
            </div>

              <div class="sx-item">
              <div class="sx-item-title gray title-0">防水深度</div>
            <div class="sx-item-container">
                <button class="mint-button mint-button--default mint-button--small"  :class="{ 'ybb-btn': data.other13 === '0' }"
                       @click="data.other13 = '0'">全部</button>
                <button class="mint-button mint-button--default mint-button--small"  v-for="other13 in dataSelect.other13s" :class="{ 'ybb-btn': data.other13 === other13}"
                       @click="data.other13 = other13">
                       {{other13}}
                     </button>
              </div>
            </div>

              <div class="sx-item">
              <div class="sx-item-title gray title-0">表盘颜色</div>
              <div class="sx-item-container">
                <button class="mint-button mint-button--default mint-button--small"  :class="{ 'ybb-btn': data.other15 === '0' }"
                       @click="data.other15 = '0'">全部</button>
                <button class="mint-button mint-button--default mint-button--small"  v-for="other15 in dataSelect.other15s" :class="{ 'ybb-btn': data.other15 === other15}"
                       @click="data.other15 = other15">
                       {{other15}}
                     </button>
              </div>
            </div>

          </div>
          <div class="sx-btns hhxh-flex">
            <button class="flex-1 mint-button mint-button--default reset" @click="initSearchs">重置</button>
            <button class="flex-1 mint-button ybb-btn" @click="goProductCenters">确定</button>
          </div>
        </div>
      </div>
      <div class="v-modal" style="z-index: 1018;"></div>
    </div>
    </div>
</template>
<script>
import productCenter from 'components/ProductCenter'
import productCenterService from 'SERVICES/productCenterService'
import noData from 'components/noData'
export default {
  components: {
    productCenter,
    noData
  },
  data: () => ({
    isShow: false,
    data: {
      ProductTypeID: '-1',
      other2: '0',
      other3: '0',
      other8: '0',
      other9: '0',
      other12: '0',
      other13: '0',
      other15: '0',
      pageNo: 1,
      pageSize: 10
    },
    dataSelect: {
      ProductTypeIDs: [],
      other2s: [],
      other3s: [],
      other8s: [],
      other9s: [],
      other12s: [],
      other13s: [],
      other15s: []
    },
    loading: false,
    disableCar: true, // 防止多次提交
    GoodsingallLoaded: false,
    productCenterItems: []
  }),
  activated: function () {
    this.loading = false
  },
  deactivated: function () {
    this.loading = true
  },
  methods: {
    loadProductCenterslist: function () {
      productCenterService.loadProductCenterslist(
        this.data.ProductTypeID,
        this.data.other2,
        this.data.other3,
        this.data.other8,
        this.data.other9,
        this.data.other12,
        this.data.other13,
        this.data.other15,
        this.data.pageNo,
        this.data.pageSize
      ).then(res => {
        let list = res.t
        if (list.length === 1) {
          // 若数据已全部获取完毕，将绑定到组件bottom-all-loaded属性的变量赋值为true，这样bottom-method就不会再次执行了
          this.productCenterItems = []
        } else if (list.length > 0 && list.length <= this.data.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.productCenterItems.push(list[i])
          }
          if (list.length === this.data.pageSize) { // 长度达到每页的最大长度，说明后面可能还有数据
            this.data.pageNo += 1
          } else { // 没有更多的数据了
            this.data.pageNo += 1
          }
        }
        console.info('pageNo===>' + this.data.pageNo)
      })
    },
    showSearch: function () {
      this.isShow = !this.isShow
      this.ESinitSearch()
      this.initSearchs()
    },
    doSearch: function () {
      // alert(JSON.stringify(this.data))
      // localStorage.setItem('productCenterdata', JSON.stringify(this.data))
      this.pageNo = 1
      this.loadProductCenterslist()
      this.showSidebar(false)
    },
    ESinitSearch: function () {
      productCenterService.loadProductCentersSelect().then(res => {
        this.dataSelect.ProductTypeIDs = res.t.type
        this.dataSelect.other2s = res.t.model[0].contentList
        this.dataSelect.other3s = res.t.model[1].contentList
        this.dataSelect.other8s = res.t.model[2].contentList
        this.dataSelect.other9s = res.t.model[3].contentList
        this.dataSelect.other12s = res.t.model[4].contentList
        this.dataSelect.other13s = res.t.model[5].contentList
        this.dataSelect.other15s = res.t.model[6].contentList
      })
    },
    initSearchs: function () {
      this.data.ProductTypeID = '-1'
      this.data.other2 = '0'
      this.data.other3 = '0'
      this.data.other8 = '0'
      this.data.other9 = '0'
      this.data.other12 = '0'
      this.data.other13 = '0'
      this.data.other15 = '0'
    },
    initSearch: function () {
      this.data.other2 = '0'
      this.data.other3 = '0'
      this.data.other8 = '0'
      this.data.other9 = '0'
      this.data.other12 = '0'
      this.data.other13 = '0'
      this.data.other15 = '0'
    },
    isActive: function () {
      if (this.data.ProductTypeID === '-1' && this.data.other2 === '0' && this.data.other3 === '0' && this.data.other8 === '0' && this.data.other9 === '0' && this.data.other12 === '0' && this.data.other13 === '0' && this.data.other15 === '0') {
        return 'all'
      } else if (this.data.ProductTypeID === '9' && this.data.other2 === '0' && this.data.other3 === '0' && this.data.other8 === '0' && this.data.other9 === '0' && this.data.other12 === '0' && this.data.other13 === '0' && this.data.other15 === '0') {
        return 'man'
      } else if (this.data.ProductTypeID === '7' && this.data.other2 === '0' && this.data.other3 === '0' && this.data.other8 === '0' && this.data.other9 === '0' && this.data.other12 === '0' && this.data.other13 === '0' && this.data.other15 === '0') {
        return 'woMan'
      } else if (this.data.ProductTypeID === '8' && this.data.other2 === '0' && this.data.other3 === '0' && this.data.other8 === '0' && this.data.other9 === '0' && this.data.other12 === '0' && this.data.other13 === '0' && this.data.other15 === '0') {
        return 'couples'
      } else {
        return 'search'
      }
    },
    goProductCenters: function () {
      this.productCenterItems = []
      this.data.pageNo = 1
      this.loadProductCenterslist()
      console.info('过滤===>' + this.productCenterItems)
      this.isShow = false
    },
    goProductCenter: function () {
      this.initSearch()
      this.productCenterItems = []
      this.data.pageNo = 1
      this.loadProductCenterslist()
      console.info('过滤===>' + this.data.other13 + '234234234234234')
      console.info('过滤===>' + this.productCenterItems)
    }
  }
}

</script>
