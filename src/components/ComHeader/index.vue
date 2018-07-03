<template>
  <div>
    <!--header-->
    <!-- <header class="mint-header is-fixed">
      <div class="mint-header-button is-left" @click="goHistory">
        <router-link :to="toLink">
          <button class="mint-button mint-button--default mint-button--normal">
            <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
          </button>
        </router-link>
      </div>
      <h1 class="mint-header-title title-3">{{title}}</h1>
      <div class="mint-header-button is-right"></div>
    </header>
    <div class="header-empty"></div> -->
    <!--header end-->
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      toLink: {
        type: String
      }
    },
    methods: {
      // 返回上一页
      goHistory: function () {
        // const fullPath = this.$router.currentRoute.fullPath
        // console.info('fullPath====>' + fullPath)
        // let { redirect } = this.$route.query
        // if (redirect) {
        //   this.$router.push(decodeURIComponent(redirect))
        // } else {
        this.toLink !== '' ? this.$router.push(this.toLink) : this.$router.go(-1)
        // }
      }
    }
  }
</script>
