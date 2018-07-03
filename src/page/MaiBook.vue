<template>
  <div>
   <div class="ybb-yuyue">
      <div class="yy-item-box"  @click="goWatch">
        <a class="mint-cell mint-field">
          <span class="mint-cell-mask"></span>
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">我的手表</span>
            </div>
            <div class="mint-cell-value">
              <div class="mint-cell-value is-link">
                <input placeholder="请选择手表类型" value="addressname" v-model="WatchNumber" type="text" class="mint-field-core text-right" >
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
                
              </div>
            </div>
            <i class="mint-cell-allow-right"></i>
          </div>
        </a>
      </div>
      

      <div class="yy-item-box">
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">预约时间</span>
            </div>
            <div class="mint-cell-value">
              <div class="mint-cell-value is-link" @click="open('datePicker')">
                <input placeholder="请选择时间" type="text" class="mint-field-core text-right" readonly="readonly" v-model="data.arrivalDate">
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
              </div>
            </div>
            <i class="mint-cell-allow-right"></i>
               <mt-datetime-picker
                           ref="datePicker"
                           type="date"
                           :startDate="startDate"
                           :endDate="endDate"
                           v-model="dateValue"
                           @confirm="handleChange">
                           </mt-datetime-picker>
          </div>
        </a> 
        <a class="mint-cell mint-field" >
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">预约网点</span>
            </div>
            <div class="mint-cell-value" >
              <div class="mint-cell-value is-link" @click="goSalesOutlets(productCenterId)">
                <input placeholder="请选择门店" type="text" class="mint-field-core text-right" v-model="addressname">
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
              </div>
            </div>
            <i class="mint-cell-allow-right"></i>
          </div>
        </a>  
      </div>
      <div class="yy-item-box">
        <a class="mint-cell">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <div class="s-yy-item-box">
                <div class="title-1 black">问题类型</div>
                <div class="checkbox-box m-t-8 gray">
                  <label class="mint-checklist-label line-block m-t-5" v-for="rouble in roubletype">
                    <span class="mint-checkbox">
                      <input v-model="rouble.checked" type="checkbox" class="mint-checkbox-input">
                      <span class="mint-checkbox-core"></span>
                    </span>
                    <span class="mint-checkbox-label">{{rouble.name}}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </a>
        <a class="mint-cell">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <div class="s-yy-item-box">
                <div class="title-1 black">问题备注</div>
                <div class="s-yy-decri">
                  <div class="m-t-8">
                    <textarea v-model="texts" placeholder="问题描述" rows="4"></textarea>
                  </div>
                  <div class="pics-box m-t-8" style="position：relative">
                  
                    <div v-show='status' >
                     <input v-show='false' multiple="multiple" enctype="multipart" type="file" id="upload" accept="image" @change="upload">  
                      <img src="../assets/add-pic.png" @click="goImage(photo)">
                    <span class="gray m-l-10">添加问题图片</span>
                    </div>
                    <div v-for="item in photoMax">
                       <img v-lazy='makePhotoUrl(item)' style="float: left;width: 100px;height: 100px" @click="showPict(item)">
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
        <div style="padding:20px;"> 

    </div>
    <div class="yuyue-submit">
      <button id="infoSave" class="mint-button mint-button--default mint-button--large ybb-btn" @click="infoSave"><label class="mint-button-text title-1">提交</label></button>
    </div>
      </div>
    </div>

   <!--查看图片-->
    <div class="ybb-big-box" v-show="showPic" @click="showPic = false">
      <div class="hhxh-flex header-box">
        <div class="flex-0" style="padding: 10px;"><i class="mintui mintui-back white title-4"></i></div>
        <div class="flex-1 text-center white title-3"></div>
        <div class="flex-0" @click.stop="deletePic"><img src="../assets/pic-delete.png"></div>
      </div>
      <div class="ybb-swipe-box" id="ybb-swipe-box" style="height: 100%;background-color: transparent;">
         <img v-lazy="makePhotoUrl(bigPic)" class="see-pic-box">
      </div>
    </div>
    <div class="v-modal" style="z-index: 1000;opacity: .5;" v-show="showPic"></div>
    <!--查看图片结束-->
  
  </div>
</template>


<script>
import maiService from 'SERVICES/maiService'
import comHeader from 'components/comHeader'
import productCenterService from 'SERVICES/productCenterService'
import mineInfoService from 'SERVICES/mineInfoService'
import helpers from 'utils/helpers'
import { Toast, MessageBox } from 'mint-ui'
import Exif from 'exif-js'
import $ from 'jquery'
export default {
  components: {
    comHeader
  },
  data: () => ({
    headerData: {
      title: '预约申请',
      toLink: '/'
    },
    data: {
      userName: '',
      mobile: '',
      goodsId: '',
      arrivalDate: sessionStorage.getItem('arrivalDate') || '',
      shopId: ''
    },
    showPic: false,
    isInfo: false,
    message: '',
    addressname: '',
    addressId: '',
    roubletype: JSON.parse(sessionStorage.getItem('roubletype')) || [],
    disableCar: true, // 防止多次提交
    productCentersAdds: {},
    dateValue: new Date(),
    startDate: new Date(),
    endDate: new Date('2099-12-31'),
    WatchNumber: '',
    WatchId: '',
    WatchType: '',
    checkbox: [],
    iType: [],
    photo: '',
    num: 0,
    numToo: 0,
    headerImage: '',
    picValue: '',
    photoMax: JSON.parse(sessionStorage.getItem('photoMax')) || [],
    phontNum: 1,
    photos: '',
    photoss: '',
    status: true,
    bigPic: '',
    texts: sessionStorage.getItem('texts') || '',
    phone: ''
  }),
  created () {
    this.loadMaps()
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/MaintainSrv') {
      sessionStorage.clear()
    }
    next()
  },
  beforeRouteEnter (to, from, next) {
    if (from.path === '/MaintainSrv') {
      next(vm => {
        vm.LoadMttroubletype()
        vm.loadMineInfo()
      })
    } else {
      next()
    }
  },
  // activated () {
  //   let path = this.$route.params.path
  //   if (path === '/MineBookWatch') {
  //     this.WatchNumber = this.$route.params.watchNumber
  //     this.WatchId = this.$route.params.watchId
  //     this.WatchType = this.$route.params.type
  //   } else if (path === '/MaintainSrv') {
  //     this.WatchId = ''
  //     this.WatchNumber = ''
  //     this.arrivalDate = ''
  //     this.handleChange(new Date())
  //     this.shopId = ''
  //     this.addressname = ''
  //   } else {
  //     this.LoadMttroubletype()
  //     this.loadMineInfo()
  //     this.loadMaps()
  //   }
  // },
  methods: {
    showPict: function (photo) {
      this.showPic = true
      this.bigPic = photo
    },
    deletePic: function () {
      MessageBox.confirm('确定删除图片？').then(res => {
        this.phontNum = this.phontNum - 1
        let index = this.photoMax.indexOf(this.bigPic)
        this.photoMax.splice(index, 1)
        sessionStorage.setItem('photoMax', JSON.stringify(this.photoMax))
        if (this.phontNum <= 3) {
          this.status = true
        }
        this.showPic = false
      })
    },
    loadMaps: function () {
      this.productCentersAdds = {}
      if (this.$route.query.addressname !== undefined) {
        this.addressname = this.$route.query.addressname
        this.addressId = this.$route.query.addressId
      } else {
        this.addressname = sessionStorage.getItem('addressname')
        this.addressId = sessionStorage.getItem('addressId')
      }
      // this.data.arrivalDate = this.data.arrivalDate
      this.productCenterId = this.$route.query.productCenterId
      if (this.$route.query.WatchNumber !== undefined) {
        this.WatchId = this.$route.query.WatchId
        this.WatchNumber = this.$route.query.WatchNumber
        this.WatchType = this.$route.query.type
      } else {
        this.WatchId = sessionStorage.getItem('WatchId')
        this.WatchNumber = sessionStorage.getItem('WatchNumber')
        this.WatchType = sessionStorage.getItem('WatchType')
      }
      if (this.WatchNumber === 'undefined' || this.WatchNumber === 'null') {
        this.WatchNumber = ''
      }
      if (this.addressname === 'undefined' || this.addressname === 'null') {
        this.addressname = ''
      }
      this.phone = sessionStorage.getItem('phone')
      console.info('pageNo===>' + this.addressname)
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      // console.info(url)
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    LoadMttroubletype: function () {
      maiService.loadMttroubletype().then(res => {
        this.roubletype = res.t
      })
    },
    goIndex: function () {
      this.$router.push('/')
    },
    goSalesOutlets: function (productCenterId) {
      sessionStorage.setItem('roubletype', JSON.stringify(this.roubletype))
      sessionStorage.setItem('texts', this.texts)
      sessionStorage.setItem('WatchNumber', this.WatchNumber)
      sessionStorage.setItem('WatchId', this.WatchId)
      sessionStorage.setItem('WatchType', this.WatchType)
      sessionStorage.setItem('arrivalDate', this.data.arrivalDate)
      this.$router.push({name: 'MineBookSalesOutlets'})
    },
    open: function (picker) {
      this.dateValue = this.data.arrivalDate
      this.$refs[picker].open()
    },
    loadMineInfo: function () {
      mineInfoService.loadMineInfo().then(res => {
        localStorage.userDate = JSON.stringify(res.t.member)
        this.data.userName = res.t.member.userName || ''
        this.data.mobile = res.t.member.mobile || ''
        this.WatchNumber = this.$route.query.WatchNumber
        this.WatchId = this.$route.query.WatchId
        this.addressname = this.$route.query.addressname
        this.addressId = this.$route.query.addressId
      })
    },
    infoSave: function () {
      this.numToo = 0
      this.num = 0
      for (var i = 0; i < this.roubletype.length; i++) {
        if (this.roubletype[i].checked === true) {
          this.num = 200
        }
        if (this.roubletype[i].name === '其它') {
          if (this.roubletype[i].checked === true) {
            if (this.texts === '' || this.texts === undefined) {
              this.numToo = 200
            } else {
              if (this.texts.length > 200) {
                this.numToo = 500
              }
            }
          }
        }
      }
      if (this.WatchNumber === '' || this.WatchNumber === undefined) {
        Toast('必须添加手表类型')
      } else if (this.data.arrivalDate === '' || this.data.arrivalDate === undefined) {
        Toast('必须选择到店时间')
      } else if (this.addressname === '' || this.addressname === undefined) {
        Toast('必须选择维修商店')
      } else if (this.num !== 200) {
        Toast('至少选择一个问题')
      } else if (this.numToo === 200) {
        Toast('如选择其他，则必须填写问题备注')
      } else if (this.numToo === 500) {
        Toast('问题备注不能超过200个字符')
      } else {
        $('#infoSave').attr('disabled', true)
        this.clickOnOk()
      }
    },
    doyuyueAdd: function () {
      this.data.shopId = this.$route.query.id
      this.data.goodsId = this.productCentersAdds.id
      this.data.userName = this.data.userName
      productCenterService.saveProductCenter(this.data).then(res => {
        this.isInfo = true
        this.message = res.t
      })
    },
    handleChange: function (value) {
      this.data.arrivalDate = window.moment(value).format('YYYY-MM-DD')
    },
    clickOnOk: function () {
      let k = 0
      for (let i = 0; i < this.roubletype.length; i++) {
        if (this.roubletype[i].checked === true) {
          this.iType[k] = this.roubletype[i].id
          k = k + 1
        }
      }
      maiService.repairAppointment(this.WatchId, this.WatchType, this.data.arrivalDate, this.addressId, this.iType, this.texts, this.photoMax).then(
        res => {
          $('#infoSave').attr('disabled', false)
          if (res.code === 200) {
            let asorderNumber = res.t
            let sex = JSON.parse(localStorage.userDate).sex
            let sexName = ''
            if (sex === '0') {
              sexName = '女士'
            } else if (sex === '1') {
              sexName = '先生'
            }
            Toast('维修预约成功!')
            MessageBox({
              title: `“维修预约受理”通知`,
              message: `尊敬的${JSON.parse(localStorage.userDate).userName}${sexName}您好！您的"维修预约"已受理,工单编号:${asorderNumber},手表型号:${this.WatchNumber},请您及时将您的爱表送到预约网点，我们接收后会在3个工作日内将检测结果及相关事项通过微信推送或者电话通知您,届时请至微信公众号内确认维修，维修站电话:${this.phone}如有疑虑请致电全国客服热线400-700-9988，我们将竭诚为您服务!<br/>【依波精品】`,
              showCancelButton: false
            }).then(action => {
              this.$router.push('/MaintainSrv')
            })
          } else {
            Toast('维修预约失败!')
          }
        },
        res => {
          $('#infoSave').attr('disabled', false)
        }
      )
    },
    goWatch: function () {
      sessionStorage.setItem('arrivalDate', this.data.arrivalDate)
      sessionStorage.setItem('roubletype', JSON.stringify(this.roubletype))
      sessionStorage.setItem('texts', this.texts)
      sessionStorage.setItem('addressname', this.addressname)
      sessionStorage.setItem('addressId', this.addressId)
      this.$router.push({name: 'MineBookWatch'})
    },
    goImage: function () {
      this.$el.querySelector('#upload').click()
    },
    upload (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      for (let i = 0; i <= files.length - 1; i++) {
        this.picValue = files[i]
        this.imgPreview(this.picValue)
      }
    },
    imgPreview (file) {
      let self = this
      let Orientation
      // 去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          // 判断图片是否小于100K,是就直接上传，反之压缩图片
          if (this.result.length <= (100 * 1024)) {
            self.headerImage = this.result
            self.postImg()
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              self.headerImage = data
              self.postImg()
            }
          }
        }
      }
    },
    postImg () {
      maiService.repairImageUpload(this.headerImage).then(res => {
        this.photoMax.push(res.t[0])
        sessionStorage.setItem('photoMax', JSON.stringify(this.photoMax))
        if (this.phontNum === 1) {
          this.phontNum = this.phontNum + 1
          this.photo = res.t[0]
        } else if (this.phontNum === 2) {
          this.phontNum = this.phontNum + 1
          this.photos = res.t[0]
        } else {
          this.phontNum = this.phontNum + 1
          this.photoss = res.t[0]
        }
        if (this.phontNum === 4) {
          Toast('最多只能添加三张图片')
          this.status = false
        }
      })
    },
    rotateImg (img, direction, canvas) {
      // 最小与最大旋转方向，图片旋转4次后回到原方
      if (img == null) return
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step === null) {
        step = 0
      }
      if (direction === 'right') {
        step++
       // 旋转到原位置，即超过最大值
        step > 3 && (step = 0)
      } else {
        step--
        step < 0 && (step = 3)
      }
        // 旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    compress (img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
        // 瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      let initSize = img.src.length
      let width = img.width
      let height = img.height
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = width * height / 4000000) > 1) {
        console.log('大于400万像素')
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
  //        铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = width * height / 1000000) > 1) {
        console.log('超过100W像素')
        count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
  //            计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      // 修复ios上传图片的时候 被旋转的问题
      if (Orientation !== '' && Orientation !== 1) {
        switch (Orientation) {
          case 6:// 需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8:// 需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3:// 需要180度旋转
            this.rotateImg(img, 'right', canvas)// 转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      // 进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.3)
      console.log('压缩前：' + initSize)
      console.log('压缩后：' + ndata.length)
      console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    }
  }
}
</script>
