import xhr from './xhr/http'

/**
 * 首页资源 API
 */
class IndexService {
  /**
   * 轮播资源
   * @return {Array}
   */
  loadSwipeItems () {
    return xhr.fetch('/page/turnlist.json')
  }

  /**
   * 首页大图
   */
  getBigPicture () {
    return xhr.fetch('/poster/get.json')
  }

  /**
   * 轮播图片跳转详情数据
   * @param  {String} id
   * @return {String}
   */
  loadSwipeInfo (id) {
    return xhr.fetch('/page/turnContent.json', {
      type: 'POST',
      data: {
        id: id
      }
    })
  }
  /**
   * 优惠套餐资源
   * @return {Array}
   */
  loadDiscountItems (pageNo, pageSize) {
    return xhr.fetch('/page/mainlist.json', {
      type: 'POST',
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

  loadJsConfig (url) {
    return xhr.fetch('/wechatlogin/getJsConfig.json', {
      type: 'POST',
      data: {
        url: url
      }
    })
  }
}

// 实例化后导出，全局单例
export default new IndexService()
