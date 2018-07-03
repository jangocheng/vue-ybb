<template>
    <div v-html="activityContent"></div>
</template>
<script>
// 首页资源
import productCenterService from 'SERVICES/productCenterService'
import helpers from '../utils/helpers'

export default {
  data: () => ({
    activityContent: ''
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadSwipeInfos()
  },
  methods: {
    loadSwipeInfos: function () {
      productCenterService.loadSwipeDetail(this.$route.params.id).then(res => {
        this.activityContent = this.html_decode(res.t.memActivityDetail.activityContent)

        this.memActivityDetail = res.t
      })
    },
    html_decode: function (str) {
      return helpers.html_decode(str)
    }
  }
}
</script>
