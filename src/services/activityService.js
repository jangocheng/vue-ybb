import xhr from './xhr/http'

/**
 * 会员活动 API
 */
class ActivityService {
  /**
   * 活动优惠券列表
   */
  loadActivities (pageNo, pageSize) {
    return xhr.fetch('/coupon/order/list.json', {
      type: 'GET',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
  /**
   * 弹出折扣二维码
   */
  loadQRCode (id) {
    return xhr.fetch('/coupon/order/detail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }
  /**
   * 弹出折扣二维码
   */
  checkGet () {
    return xhr.fetch('/coupon/order/checkGet.json', {
      type: 'GET',
      needAuth: true
    })
  }
}

// 实例化后导出，全局单例
export default new ActivityService()
