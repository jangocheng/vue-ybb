import xhr from './xhr/http'

/**
 * 质保服务 API
 */
class QualityService {
  /**
   * 质保服务列表
   */
  loadQualityServiceList (pageNo, pageSize) {
    return xhr.fetch('/warranty/order/list.json', {
      type: 'GET',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

  /**
   * 质保服务详情
   */
/*  loadQualityServiceDetail (id) {
    return xhr.fetch('/warranty/order/detail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  } */
}

// 实例化后导出，全局单例
export default new QualityService()
