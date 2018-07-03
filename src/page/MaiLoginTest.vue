<template>

  <div >
      <input placeholder="手机号码" type="text"  v-model="phonenum">
      <input placeholder="验证码" type="text" v-model="mcode">
      <div >
          <div class="{'active' : count !==0}" @click="doGetCode">
             {{count ===0 ? '获取验证码':count + 's'}}
          </div>
      </div>
      <div>
            <button  @click="doLogin">
              <label >登录</label>
            </button>
      </div>
  </div>
</template>

<script>
import {Toast, MessageBox} from 'mint-ui'
import validators from '../utils/validators'
import loginService from 'SERVICES/loginService'

export default {
  data: () => ({
    phonenum: '',
    mcode: '',
    count: 0
  }),
  beforeRouteEnter (to, from, next) {
    console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
    console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
    next() // 大哥：过去吧！
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
  },
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    // this.ifAutoLogin()
  },
  methods: {
    doGetCode: function () {
      this.code = ''
      if (this.count === 0) {
        if (this.mobile.trim() === '') {
          Toast('请输入手机号')
        } else if (!validators.mobile(this.mobile)) {
          this.mobile = ''
          Toast('手机号不正确')
        } else {
          this.countDown(60)
          loginService.sendSms(this.mobile).then(res => {
            Toast(res.msg)
          })
        }
      }
    },
    doLogin: function () {
      // Toast('mobile:' + this.mobile + 'code:' + this.code)
      console.log(localStorage)
      const openId = localStorage.getItem('openId')
      if (this.phonenum.trim() === '') {
        Toast('请输入手机号')
      } else if (!validators.mobile(this.phonenum)) {
        this.phonenum = ''
        Toast('手机号不正确')
      } else if (this.mcode.trim === '') {
        Toast('请输入验证码')
      } else {
        loginService.memberLogin(this.phonenum, this.mcode, openId).then(res => {
          // console.info(res)
          // window._global = res.t
          localStorage.setItem('userDate', JSON.stringify(res.t.member))
          localStorage.setItem('accessToken', res.t.token)
          localStorage.setItem('openId', res.t.member.openId)
          localStorage.setItem('accessTokenTime', new Date().getTime())
          localStorage.setItem('isOut', false)
          // this.$router.push('/Mine')
          let { redirect } = this.$route.query
          redirect = redirect ? decodeURIComponent(redirect) : '/'
          this.$router.replace({ path: redirect, force: true })
          if (res.t.isFirstLogin === true) {
            MessageBox({
              title: '提示',
              message: '完善资料可以获得积分，是否完善资料?',
              showCancelButton: true
            }).then(res => {
              if (res !== 'cancel') {
                this.$router.push('MineInfo')
              }
            })
          }
        })
      }
    },
    countDown: function (val) {
      setTimeout(() => {
        val -= 1
        this.count = val
        // console.info(val)
        if (val > 0) {
          this.countDown(val)
        }
      }, 1000)
    },
    /**
     * 判断是否需要自动登录
     * 微信端进入且退出登录了
     *
     */
    ifAutoLogin: function () {
      console.info('判断是否微信环境')
      var ua = navigator.userAgent.toLowerCase()
      // 判断是否微信环境
      if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
        this.checkLogin()
      }
    },
    checkLogin: function () {
      /**
       * 获取url后面的参数
       */
      function getViewParam () {
        var args = {}
        var query = location.search.substring(1)
        var pairs = query.split('&')
        for (var i = 0; i < pairs.length; i += 1) {
          var pos = pairs[i].indexOf('=')
          if (pos === -1) {
            continue
          }
          var argname = pairs[i].substring(0, pos)
          var value = pairs[i].substring(pos + 1)
          args[argname] = unescape(value)
        }
        return args
      }
      const url = window.location.href
      const code = getViewParam().code
      // 判读是否有code,有就重后台获取access_Token,没有就重新获取code
      // code = '011LLs0M08hF462PNFZL0vHE0M0LLs0B'
      if (code) {
        loginService.getAccessToken(code).then(res => {
          if (res.t) {
            if (res.t.isLogin === true) {
              // iso端有版本会将后台传的布尔值改为字符串
              Toast('自动登录成功')
              this.$root.userDate = res.t
              localStorage.setItem('userDate', JSON.stringify(res.t.member))
              localStorage.setItem('openId', res.t.member.openId)
              localStorage.setItem('accessToken', res.t.token)
              localStorage.setItem('accessTokenTime', new Date().getTime())
              localStorage.setItem('isOut', false)
              let { redirect } = this.$route.query
              redirect = redirect ? decodeURIComponent(redirect) : '/'
              this.$router.replace({ path: redirect, force: true })
            } else if (res.t.isLogin === false) {
              // 自动登录失败 说明没有绑定过openId
              console.info('自动登录失败 说明没有绑定过openId')
              localStorage.setItem('openId', res.t.openId)
            }
          }
        })
      } else {
        var redirectUri = encodeURIComponent(url)
        var uri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f6299cbe47ce4a2&redirect_uri=' + redirectUri + '&response_type=code&Scope=snsapi_userinfo&state=abc#wechat_redirect'
        window.top.location.href = uri
      }
    }
  }
}
</script>
