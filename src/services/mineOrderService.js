import xhr from './xhr/http'

/**
 * 订单资源 API
 */
class MineOrderService {
  /**
   * 购买订单列表资源
   * @return {Array}
   */
  loadBuylist (pageNo, pageSize) {
    return xhr.fetch('/products/order/list.json', {
      type: 'GET',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

  /**
   * 预约订单列表资源
   * @return {Array}
   */
  loadBookinglist (pageNo, pageSize) {
    return xhr.fetch('/products/reserve/list.json', {
      type: 'GET',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

  /**
   * 购买订单详情资源
   * @return {Object}
   */
  loadBuyOrderDetail (id) {
    return xhr.fetch('/products/order/detail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 预约订单详情资源
   * @return {Object}
   */
  loadBookingOrderDetail (id) {
    return xhr.fetch('/products/reserve/detail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 用户添加手表
   * @return {Object}
   */
  addAsorderWatch (brand, watchName, watchNumber, buyDate, qrcode) {
    return xhr.fetch('/products/order/watchsave.json', {
      type: 'POST',
      needAuth: true,
      data: {
        brand: brand,
        name: watchName,
        number: watchNumber,
        buyDate: buyDate,
        qrcode: qrcode
      }
    })
  }

   /**
   * 用户添加手表列表资源
   * @return {Array}
   */
  loadAsorderWatchList () {
    return xhr.fetch('/products/order/watchlist.json', {
      type: 'GET',
      needAuth: true
    })
  }
}

// 实例化后导出，全局单例
export default new MineOrderService()
