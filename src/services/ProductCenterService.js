import xhr from './xhr/http'

/**
 *产品中心资源API
 */

class ProductCenterService {

   /**
   * 商品列表资源
   * @return {Array}
   */
  loadProductCenterslist (ProductTypeID, other2, other3, other8, other9, other12, other13, other15, pageNo, pageSize) {
    console.log(ProductTypeID + '-----------erew ---------====================' + other3)
    return xhr.fetch('/products/goods/list.json', {
      type: 'POST',
      needAuth: true,
      data: {
        productTypeID: ProductTypeID,
        other_2: other2,
        other_3: other3,
        other_8: other8,
        other_9: other9,
        other_12: other12,
        other_13: other13,
        other_15: other15,
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

   /**
   * 保存预约信息
   * @param
   */
  saveProductCenter ({arrivalDate, goodsId, userName, shopId}) {
    return xhr.fetch('/products/reserve/save.json', {
      type: 'POST',
      needAuth: true,
      data: {
        arrivalDate: arrivalDate,
        goodsId: goodsId,
        name: userName,
        shopId: shopId
      }
    })
  }

   /**
   * 商品详情
   * @return {Array}
   */
  loadProductCentersDetail (id) {
    return xhr.fetch('/products/goods/detail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

     /**
   * 条件筛选
   * @return {Array}
   */
  loadProductCentersSelect (type, model) {
    return xhr.fetch('/products/goods/filter.json', {
      type: 'GET',
      needAuth: true
    })
  }

   /**
   * 首页轮播列表
   * @return {Array}
   */
  loadSwipeInfo () {
    return xhr.fetch('/member/getMemActivityList.json', {
      type: 'GET',
      needAuth: true
    })
  }

    /**
   * 轮播图片跳转详情数据
   * @param  {String} id
   * @return {String}
   */
  loadSwipeDetail (id) {
    return xhr.fetch('/member/getActivityDetail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

}
// 实例化后导出，全局单例
export default new ProductCenterService()
