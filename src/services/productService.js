import xhr from './xhr/http'

/**
 * 产品资源 API
 */
class ProductService {
  /**
   * 产品列表资源
   * @return {Array}
   */
  loadProductItems ({sex, age, part, symptom, isoldage, pageNo, pageSize}) {
    return xhr.fetch('/page/checklist.json', {
      type: 'POST',
      data: {
        sex: sex,
        age: age,
        part: part,
        symptom: symptom,
        isoldage: isoldage,
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

  /**
   * 加载产品信息
   * @return {[type]} [description]
   */
  loadProductInfo (id) {
    return xhr.fetch('/page/checkdetail.json', {
      type: 'GET',
      data: {
        id: id
      }
    })
  }

  /**
   * 加载产品评论信息
   * @param  {[type]} id [产品id]
   * @return {[type]}    [description]
   */
  loadCommentsItems (id) {
    return xhr.fetch('/page/commentlist.json', {
      type: 'GET',
      data: {
        id: id
      }
    })
  }

  /**
   * 添加产品到购物车
   * @param {String} id 产品id
   */
  addCar (id) {
    return xhr.fetch('/order/addcar.json', {
      type: 'POST',
      data: {
        checkPackageId: id
      },
      needAuth: true
    })
  }
}

// 实例化后导出，全局单例
export default new ProductService()
