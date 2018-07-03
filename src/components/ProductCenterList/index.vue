<template>
  <!--list-box-->
  <div class="list-list-box">
    <productCenter :item="item" v-for="item in items"></productCenter>
  </div>
  <!--container end-->
</template>
<script>
import productCenter from 'components/ProductCenter'

export default {
  components: {
    productCenter
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
