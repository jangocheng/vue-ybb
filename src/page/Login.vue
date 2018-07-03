<template>
  <div class="login-bg">
    <div class="login-box">
      <div class="img-box"><img src="../assets/logo.png"></div>
      <div class="form-box">
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-value">
              <div class="mint-cell-value">
                <input placeholder="手机号码" type="text" class="mint-field-core title-0" v-model="mobile">
              </div>
            </div>
          </div>
        </a>
        <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-value">
              <div class="mint-cell-value">
                <input placeholder="验证码" type="text" class="mint-field-core title-0" v-model="code">
              </div>
            </div>
            <div class="mint-cell-title">
              <div class="yzm-box text-center title-0":class="{'active' : count !==0}" @click="doGetCode">{{count ===0 ? '获取验证码':count + 's'}}</div>
            </div>
          </div>
        </a>
        <div class="submit-box">
          <button class="mint-button mint-button--default mint-button--large ybb-btn" @click="doLogin"><label class="mint-button-text title-1">登录</label></button>
        </div>
        <div class="m-t-12 gray">登录并完善会员资料，可获得100积分！</div>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast, MessageBox} from 'mint-ui'
import validators from '../utils/validators'
import loginService from 'SERVICES/loginService'
import helpers from '../utils/helpers'
import ENV from '../SERVICES/xhr/config'
import ActivityService from 'SERVICES/ActivityService'
export default {
  data: () => ({
    mobile: '',
    code: '',
    count: 0,
    Encrylden: '',
    way: ''
  }),
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.Encrylden = this.$route.query.EncryIden
  },
  mounted () {
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
      const openId = localStorage.getItem('openId')
      if (this.mobile.trim() === '') {
        Toast('请输入手机号')
      } else if (!validators.mobile(this.mobile)) {
        this.mobile = ''
        Toast('手机号不正确')
      } else if (this.code.trim === '') {
        Toast('请输入验证码')
      } else {
        if (this.Encrylden === undefined || this.Encrylden === 'undefined') {
          this.Encrylden = null
        }
        this.way = null
        loginService.memberLogin(this.mobile, this.code, openId, this.Encrylden, this.way).then(res => {
          // console.info(res)
          // window._global = res.t
          this.$root.userDate = res.t
          localStorage.setItem('userDate', JSON.stringify(res.t.member))
          localStorage.setItem('accessToken', res.t.token)
          localStorage.setItem('openId', res.t.member.openId)
          localStorage.setItem('accessTokenTime', new Date().getTime())
          localStorage.setItem('isOut', false)
          let photouri = this.makePhotoUrl(res.t.member.photo)
          localStorage.setItem('photo', photouri)
          // this.$router.push('/Mine')
          let { redirect } = this.$route.query
          redirect = redirect ? decodeURIComponent(redirect) : '/'
          this.$router.replace({ path: redirect, force: true })
          ActivityService.checkGet().then(ev => {
            if (ev.t !== null && ev.t.isExist === true) {
              Toast({
                message: '双11礼品已下发，请到【我的-会员活动】中查看',
                position: 'bottom',
                duration: 5000
              })
            }
          })
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
      const code = getViewParam().code
      // 判读是否有code,有就重后台获取access_Token,没有就重新获取code
      // code = '011LLs0M08hF462PNFZL0vHE0M0LLs0B'
      if (code) {
        this.way = code
        let state = getViewParam().state
        this.Encrylden = state
        // loginService.getAccessToken(code).then(res => {
        //   if (res.t) {
        //     if (res.t.isLogin === true) {
        //       // iso端有版本会将后台传的布尔值改为字符串
        //       Toast('自动登录成功')
        //       this.$root.userDate = res.t
        //       localStorage.setItem('userDate', JSON.stringify(res.t.member))
        //       localStorage.setItem('openId', res.t.member.openId)
        //       localStorage.setItem('accessToken', res.t.token)
        //       localStorage.setItem('accessTokenTime', new Date().getTime())
        //       localStorage.setItem('isOut', false)
        //       let { redirect } = this.$route.query
        //       redirect = redirect ? decodeURIComponent(redirect) : '/'
        //       this.$router.replace({ path: redirect, force: true })
        //     } else if (res.t.isLogin === false) {
        //       // 自动登录失败 说明没有绑定过openId
        //       console.info('自动登录失败 说明没有绑定过openId')
        //       localStorage.setItem('openId', res.t.openId)
        //     }
        //   }
        // })
      } else {
        var redirectUri = encodeURIComponent(`${ENV.photoPreviewUrl}/ybb/ybbapp#/Login`)
        var uri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${ENV.appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=${this.Encrylden}#wechat_redirect`
        // var uri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f6299cbe47ce4a2&redirect_uri=' + redirectUri + '&response_type=code&Scope=snsapi_userinfo&state=abc#wechat_redirect'
        window.top.location.href = uri
      }
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      // console.info(url)
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    }
  }
}
</script>
