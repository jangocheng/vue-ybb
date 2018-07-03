import xhr from './xhr/http'

/**
 * 销售网点查询 API
 */
class SalesOutletsService {
  /**
   * 销售网点列表
   */
  loadOutletsList ({city, address, name, pageNo, pageSize}) {
    return xhr.fetch('/shop/spgetlist.json', {
      type: 'POST',
      needAuth: true,
      data: {
        city: city,
        address: address,
        name: name,
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

  /**
   * 地区列表数据
   * @return {[type]} [description]
   */
  loadAreaList () {
    return xhr.fetch('/areaData/getProAndCtityData.json', {
      type: 'GET',
      needAuth: true
    })
  }
}

// 实例化后导出，全局单例
export default new SalesOutletsService()
