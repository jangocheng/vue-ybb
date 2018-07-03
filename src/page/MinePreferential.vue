<template>
<div>
<com-header :title="headerData.title" :toLink="headerData.toLink"></com-header>
        <div class="jf-mine-box hhxh-flex hhxh-justify-center mine-discount-header">
			<div>
				<div class="img-box"><img v-bind:src="data.photo" :onerror="headImg" ><span class="vip-level "
          :class="{
              'vip-1':data.memberLevel === 'VIP会员',
              'vip-2':data.memberLevel === '银牌会员',
              'vip-3':data.memberLevel === '金牌会员',
              'vip-4':data.memberLevel === '钻石会员',
              'vip-5':data.memberLevel === '皇冠会员'}"></span></div>
				<div class="text-center m-t-8" v-if="data.sex==='1'">亲爱的 <span class="title-1">{{data.userName}}</span> 先生</div>
				<div class="text-center m-t-8" v-if="data.sex==='0'">亲爱的{{data.userName}}女士</div>
				<div class="text-center m-t-5">您现在是我们的{{data.memberLevel}}</div>
			</div>
		</div>

		<div class="ybb-list mine-list mine-discount-box">
			<a class="mint-cell">
				<div class="mint-cell-left"></div>
				<div class="mint-cell-wrapper ybb-title">
					<div class="mint-cell-title">
						<span class="mint-cell-text title-1 ">{{data.memberLevel}}特权</span>
					</div>
				</div>
			</a>
			<a class="mint-cell"   v-for="(item, index) in items">
				<div class="mint-cell-left"></div>
				<div class="mint-cell-wrapper">
					<div class="mint-cell-value vip-level-box">
          <img v-if="index === 0" :src="imageOne" class="img-box7">
          <img v-if="index === 1" :src="imageTwo" class="img-box7">
          <img v-if="index === 2" :src="imageThree" class="img-box7">
          <img v-if="index === 3" :src="imageFour" class="img-box7">
          <img v-if="index === 4" :src="imageFive" class="img-box7">
          <img v-if="index === 5" :src="imageSix" class="img-box7">
          <img v-if="index === 6" :src="imageSeven" class="img-box7">
          </div>
					<div class="mint-cell-title">
						<div class="title-0">{{item.item}}</div>
						<div class="gray m-t-8">{{item.content}}</div>
					</div>
				</div>
			</a>

        </div>
</div>
</template>

<script>
import comHeader from 'components/comHeader'
import mineInfoService from 'SERVICES/mineInfoService'
export default {
  components: {
    comHeader
  },
  data: () => ({
    headImg: 'this.src="' + require('../assets/img.png') + '"',
    items: [],
    imageOne: require('../assets/1.png'),
    imageTwo: require('../assets/2.png'),
    imageThree: require('../assets/3.png'),
    imageFour: require('../assets/4.png'),
    imageFive: require('../assets/5.png'),
    imageSix: require('../assets/6.png'),
    imageSeven: require('../assets/7.png'),
    headerData: {
      title: '我的优惠',
      toLink: '/Mine'
    },
    data: {
      photo: '',
      userName: '',
      sex: '',
      mobile: '',
      areaId: '',
      provinceId: '',
      cityId: '',
      area: {},
      address: '',
      areaText: '',
      remainScore: '',
      memberLevel: ''
    }
  }),
  created () {
    this.loadMineInfo()
  },
  methods: {
    loadMineInfo: function () {
      mineInfoService.loadMineInfo().then(res => {
        this.data.photo = res.t.member.photo || ''
        this.data.userName = res.t.member.userName || ''
        this.data.sex = res.t.member.sex || ''
        this.data.mobile = res.t.member.mobile || ''
        this.data.area = res.t.member.area || ''
        this.data.address = res.t.member.address || ''
        this.dateValue = this.data.birthday
        this.data.remainScore = res.t.member.remainScore
        this.data.memberLevel = res.t.member.memberLevel
        // this.data.areaId = res.t.member.area.id
        // this.data.areaText = res.t.member.area.name
        mineInfoService.loadcontent(this.data.memberLevel).then(res => {
          let list = res.t
          for (let i = 0; i <= list.length - 1; i++) {
            this.items.push(list[i])
          }
        })
      })
    }
  }
}
</script>

<style scoped>
 .mint-popup {
    width: 70%;
    height: 100%;
}
</style>
