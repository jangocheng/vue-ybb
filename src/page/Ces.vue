<template>

</template>
<script>
import wx from 'weixin-js-sdk'
import indexService from 'SERVICES/indexService'
export default {
  data: () => ({
    photo: ''
  }),
  created () {
    this.loadJsConfig()
  },
  methods: {
    loadJsConfig: function () {
      indexService.loadJsConfig(location.href.split('#')[0]).then(res => {
        // console.group(res)
        wx.config({
          debug: false,
          appId: res.t.appId,
          timestamp: res.t.timestamp,
          nonceStr: res.t.nonceStr,
          signature: res.t.signature,
          jsApiList: ['getLocation',
            'checkJsApi']
        })
      })
    }
  }
}
</script>
