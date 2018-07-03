import ENV from '../SERVICES/xhr/config'
// import loginService from '../SERVICES/loginService'

export default {
  makePhotoUrl: function (endpoint) {
    return `${ENV.photoPreviewUrl.replace(/\/$/, '')}${endpoint}`
  },
  // html编码
  html_encode: function (str) {
    var s = ''
    if (str.length === 0) return ''
    s = str.replace(/&/g, '&amp;')
    s = s.replace(/</g, '&lt;')
    s = s.replace(/>/g, '&gt;')
    s = s.replace(/ /g, '&nbsp;')
    s = s.replace(/'/g, '&#39;')
    s = s.replace(/"/g, '&quot;')
    s = s.replace(/\n/g, '<br>')
    return s
  },
  html_decode: function (str) {
    var s = ''
    if (str.length === 0) return ''
    s = str.replace(/&amp;/g, '&')
    s = s.replace(/&lt;/g, '<')
    s = s.replace(/&gt;/g, '>')
    s = s.replace(/&nbsp;/g, ' ')
    s = s.replace(/&#39;/g, '\'')
    s = s.replace(/&quot;/g, '"')
    s = s.replace(/<br>/g, '\n')
    return s
  },
  /**
   * 废弃 别用
   * 用这个 window.moment(date).format('YYYY-MM-DD HH:mm')
   * @param  {[type]} date [description]
   * @param  {[type]} fmt  [yyyy-MM-dd HH:mm:ss]
   * @return {[type]}      [description]
   */
  dateFormat: function (val, fmt) {
    const date = new Date(val)
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  },
  isLogin: function () {
    const accessToken = localStorage.getItem('accessToken')
  //  const accessTokenTime = localStorage.getItem('accessTokenTime')
  //  const openId = localStorage.getItem('openId')
  //  const isBinding = sessionStorage.getItem('isBinding')
  //  const isOut = localStorage.getItem('isOut')
  //  if (isOut === 'true') {
      // 点击过退出登录的情况
  //    return false
  //  } else {
  //    if (!openId) {
    if (accessToken) {
  //        if (Math.floor((new Date().getTime() - accessTokenTime) / 3600000) < 9) {
      return true
  //        }
          // else { // 这个可能没用
          //   if (typeof isLogin === 'boolean') { // 处理未绑定微信帐号的微信登录情况
          //     return isLogin
          //   }
          // }
  //    } else { // 获取到openid
  //      if (isBinding === 'false') { // 处理未绑定微信帐号的微信登录情况
  //        return false
  //     } else {
  //        return true
  //      }
  //    }
    }
    return false
  },
  initHead: function (route) {
    let redirectPath = ''
    // const fullPath = this.$router.currentRoute.fullPath
    // console.info('fullPath====>' + fullPath)
    let { redirect } = route.query
    if (redirect) {
      // console.info(decodeURIComponent(redirect))
      redirectPath = decodeURIComponent(redirect)
    }
    return redirectPath
  }
}
