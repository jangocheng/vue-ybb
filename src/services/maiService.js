import xhr from './xhr/http'

/**
 *  维修首页
 */
class MaiService {
/**
 * 维修首页我的维修列表
 * return{Array}
 */
  loadMyRepairing () {
    return xhr.fetch('/repair/repair/list.json', {
      type: 'GET',
      needAuth: true
    })
  }
/**
 * 评价保存接口
 * return{Array}
 */
  saveEvalue (reserveorderid, serviceattitude, repairofficiency, repairquality, repaireniv, remarks) {
    return xhr.fetch('/repair/repair/saveEvalue.json', {
      type: 'POST',
      needAuth: true,
      data: {
        reserveorderid: reserveorderid,
        serviceattitude: serviceattitude,
        repairofficiency: repairofficiency,
        repairquality: repairquality,
        repaireniv: repaireniv,
        remarks: remarks
      }
    })
  }
 /**
 * 维修首页我的待审核维修列表
 * return{Array}
 */
 /* loadMyRepairConfirm () {
    return xhr.fetch('/repair/repairConfirm/list.json', {
      type: 'GET',
      needAuth: true
    })
  } */
/**
 * 我的维修详情
 */
  loadMyDetail (reserveId) {
    return xhr.fetch('/repair/repair/detail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        reserveId: reserveId
      }
    })
  }
  /**
   * 维修详情-维修信息(列表进入)
   */
  repairDetailList (reserveId) {
    return xhr.fetch('/repair/repair/detail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        reserveId: reserveId
      }
    })
  }
  /**
   * 维修详情-问题详情(列表进入)
   */
  issueDetailList (reserveId) {
    return xhr.fetch('/repair/issue/detail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        reserveId: reserveId
      }
    })
  }
  /**
   * 维修详情-维修信息(搜索进入)
   */
  searachDetailSearch (repairNumber) {
    return xhr.fetch('/repair/repair/searach.json', {
      type: 'GET',
      needAuth: true,
      data: {
        repairNumber: repairNumber
      }
    })
  }
  /**
   * 二维码查询订单
   */
  issueDetailSearch (qrcode) {
    return xhr.fetch('/products/order/qrcodeSearch.json', {
      type: 'GET',
      needAuth: true,
      data: {
        qrcode: qrcode
      }
    })
  }
/**
 * 我的维修（所有）
 */
  locadRepair (pageNo, PageSize) {
    return xhr.fetch('/repair/repair/list.json', {
      type: 'GET',
      needAuth: true,
      data: {
        pageNo: pageNo,
        PageSize: PageSize
      }
    })
  }
/**
 * 维修确认
 */
  entryRepairConfirm (reserveId, isRepair) {
    return xhr.fetch('/repair/repairConfirm/confirm.json', {
      type: 'GET',
      needAuth: true,
      data: {
        reserveId: reserveId,
        isRepair: isRepair
      }
    })
  }
/**
 * 预约确认显示
 */
  loadRepairConfirm (reserveId) {
    return xhr.fetch('/repair/repairConfirm/detail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        reserveId: reserveId
      }
    })
  }
/**
 * 维修网点查询,列表
 */
  loadShop ({address, city, name, pageNo, pageSize}) {
    return xhr.fetch('/shop/repairdotList.json', {
      type: 'POST',
      data: {
        address: address,
        city: city,
        name: name,
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
  loadAllOrganization ({address, city, name, pageNo, pageSize}) {
    return xhr.fetch('/shop/organziationList.json', {
      type: 'POST',
      data: {
        address: address,
        city: city,
        name: name,
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
  /**
   * 故障类型列表
   */
  loadMttroubletype () {
    return xhr.fetch('/repair/mttroubletype/list.json', {
      type: 'GET',
      needAuth: true
    })
  }
  /**
   * 维修预约
   */
  repairAppointment (saleId, type, arrivedate, repairDotId, mttroubletype, description, photo) {
    return xhr.fetch('/repair/repair/save.json', {
      type: 'POST',
      needAuth: true,
      data: {
        saleId: saleId,
        arrivedate: arrivedate,
        type: type,
        repairDotId: repairDotId,
        description: description,
        mttroubletype: mttroubletype,
        photo: photo
      }
    })
  }
  /**
   * 维修预约图片上传
  */
  repairImageUpload (file) {
    return xhr.fetch('/repair/repair/uploadPicBase64', {
      type: 'POST',
      needAuth: true,
//      emulateJSON: true,
//      contentType: 'application/x-www-form-urlencoded',
      data: {
        base64Data: file
      }
    })
  }

  getUser () {
    return xhr.fetch('https://api.weixin.qq.com/cgi-bin/user/info', {
      type: 'GET',
      data: {
        openid: 'o4gnnMXl+/adtziGs2k7UYzCFrjX0X25SLUj+RGqW3gBOeLiXqugCMAS4zldssyI',
        lang: 'zh_CN',
        access_token: 'bMbWk4_lgqbr6GcQCLQoTiQ3JMy_52a-VvrM9HVNyaCm39zhNRo7wmnmKWDUk-nwjdM5VA6Dlq0mRUQ-rUtBwcmFzAn4dcJ61Zs4iH8WMk7CyBn-NtX_99Oe9q7MhzitEHEgAIAUXU'
      }
    })
  }
  /**
   * 收款详情
  */
  payDetail (reserveId) {
    return xhr.fetch('/repair/paydetail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        reserveId: reserveId
      }
    })
  }

  SignFor (reserveId) {
    return xhr.fetch('/repair/repair/signFor.json', {
      type: 'GET',
      needAuth: true,
      data: {
        reserveId: reserveId
      }
    })
  }
}

// 实例化后导出，全局单例
export default new MaiService()
