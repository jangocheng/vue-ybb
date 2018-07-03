<template>
<div>
  <div class="dynamic-list-box" @click="Isee">
      <div class="item-box">
        <img v-lazy="makePhotoUrl(item)" class="img-box">
      </div>
    </div>
</div>
</template>

<script>
import helpers from '../../utils/helpers'
export default {
  props: {
    item: Object
  },
  data: () => ({
    isInfo: false
  }),
  methods: {
    Isee: function () {
      this.$emit('ok') // 主动触发ok方法
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    html_decode: function (str) {
      return helpers.html_decode(str)
    }
  }
}
</script>
