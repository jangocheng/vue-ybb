import xhr from './xhr/http'

/**
 * 品牌动态 API
 */
class DynamicService {
  /**
   * 品牌动态列表
   */
  loadDynamicServiceList (pageNo, pageSize) {
    return xhr.fetch('/member/brandList.json', {
      type: 'GET',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
}

// 实例化后导出，全局单例
export default new DynamicService()
