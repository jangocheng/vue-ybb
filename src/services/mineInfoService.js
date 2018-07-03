import xhr from './xhr/http'

/**
 * 账户信息 API
 */
class MineInfoService {
  /**
   * 账户信息加载
   */
  loadMineInfo () {
    return xhr.fetch('/member/getMemberInfo.json', {
      type: 'GET',
      needAuth: true
    })
  }
  /**
   * 地区列表数据
   * @return {[type]} [description]
   */
  loadAreaList () {
    return xhr.fetch('/areaData/getAreaData.json', {
      type: 'GET',
      needAuth: true
    })
  }

  /**
   * 保存或修改账户信息
   * @param
   */
  updateAccount ({userName, sex, mobile, birthday, provinceId, cityId, address}) {
    return xhr.fetch('/member/updateMemberInfo.json', {
      type: 'POST',
      needAuth: true,
      data: {
        userName: userName,
        sex: sex,
        mobile: mobile,
        birthday: birthday,
        provinceId: provinceId,
        cityId: cityId,
        address: address
      }
    })
  }
  /**
   *vip优惠列表
   *@param
   */
  loadcontent (memberLevel) {
    return xhr.fetch('/member/getcontent.json', {
      type: 'GET',
      needAuth: true,
      data: {
        memberLevel: memberLevel
      }
    })
  }
  /**
   *二维码加载
   *
   */
  recommendFriend () {
    return xhr.fetch('/RecommendFriend/createQRCode', {
      type: 'GET',
      needAuth: true
    })
  }
}

// 实例化后导出，全局单例
export default new MineInfoService()
