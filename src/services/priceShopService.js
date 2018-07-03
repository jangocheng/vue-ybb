import xhr from './xhr/http'

/**
 *积分商城资源API
 */

class PriceShopService {

  /**
   * 积分商品列表资源
   * @return {Array}
   */
  loadGoodslist (pageNo, pageSize, itemsName, timeStamp) {
    return xhr.fetch('/priceShop/goods/list.json', {
      type: 'POST',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize,
        itemsName: itemsName,
        timeStamp: timeStamp
      }
    })
  }

 /**
   * 积分商品详情
   * @return {Array}
   */
  loadGoodDetail (id) {
    return xhr.fetch('/priceShop/goods/detail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 兑换记录详情
   * @return {Array}
   */
  loadRecordDetail (id) {
    return xhr.fetch('/priceShop/order/detail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 查看积分兑换规则
   * @return {Array}
   */
  lookIntegralRules () {
    return xhr.fetch('/member/getScoreList.json', {
      type: 'GET',
      needAuth: true
    })
  }
  /**
   * 兑换记录列表资源
   * @return {Array}
   */
  loadOrderslist (pageNo, pageSize) {
    return xhr.fetch('/priceShop/order/list.json', {
      type: 'GET',
      needAuth: true,
      async: false,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
    /**
   * 积分记录列表资源
   * @return {Array}
   */
  loadIntegralslist (pageNo, pageSize) {
    return xhr.fetch('/member/getMemScoreDetail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

   /**
   * 保存订单信息
   * @param
   */
  savePgMaterial ({userName, newAddress, mobile, pgMaterialId}) {
    return xhr.fetch('/priceShop/order/save.json', {
      type: 'POST',
      needAuth: true,
      data: {
        consigneeName: userName,
        consigneeAddr: newAddress,
        consigneePhone: mobile,
        pgOrderentryList: [{
          'pgMaterial': {
            'id': pgMaterialId}
        }]
      }
    })
  }
  /**
   *@autor 肖飞
   *积分商城/兑换记录/使用button
   */
  isAlreadyUse (id) {
    return xhr.fetch('/priceShop/alreadyUse/use.json', {
      type: 'GET',
      needAuth: true,
      data: {
        orderId: id
      }
    })
  }

  /**
   * 取消兑换
   * @param
   */
  cancelRecord (id) {
    return xhr.fetch('/priceShop/order/cancel.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }
  /**
   * 订单详情资源
   * @return {Object}
   */
  // loadGood (id) {
  //   return xhr.fetch('/order/detail.json', {
  //     type: 'GET',
  //     needAuth: true,
  //     data: {
  //       id: id
  //     }
  //   })
  // }

  /**
   * 查看积分兑换券列表
   * @return {Array}
   */
  loadVoucher () {
    return xhr.fetch('/pgvoucher/list.json', {
      type: 'GET',
      needAuth: true
    })
  }

  /**
   * 抵换券兑换
   * @return {Array}
   */
  convertPgVoucher (id) {
    return xhr.fetch('/pgvoucher/convertPgVoucher.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 查看我的抵用券列表
   * @return {Array}
   */
  loadMyVoucher () {
    return xhr.fetch('/pgvoucher/MyPgVoucherList.json', {
      type: 'GET',
      needAuth: true
    })
  }
}
// 实例化后导出，全局单例
export default new PriceShopService()
