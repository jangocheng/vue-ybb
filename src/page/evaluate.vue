<template>
<div>
<!--header-->
		<header class="mint-header is-fixed">
			<div class="mint-header-button is-left">
				<a class="router-link-active" @click="goback">
					<button class="mint-button mint-button--default mint-button--normal">
						<span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
					</button>
				</a>
			</div>
			<h1 class="mint-header-title title-3">评价</h1>
			<div class="mint-header-button is-right"></div>
		</header>
		<div class="header-empty"></div>
		<!--header end-->
		
		<!--container-->
		
		<div class="ybb-yuyue">
			<div class="gray title-0" style="position: relative;top: 8px;padding-left: 10px;">服务评价</div>
			<div class="yy-item-box">
				<a class="mint-cell mint-field">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<span class="mint-cell-text">服务态度</span>
						</div>
						<div class="mint-cell-value">
							<div class="text-right" style="width: 100%;">
								<span class="ybb-evaluate-star active" :class='{ active: isActive }' @click="getAttitude"></span>
								<span class="ybb-evaluate-star" :class='{ active: isActive2 }' @click="getAttitude2"></span>
								<span class="ybb-evaluate-star" :class='{ active: isActive3 }' @click="getAttitude3"></span>
								<span class="ybb-evaluate-star" :class='{ active: isActive4 }' @click="getAttitude4"></span>
								<span class="ybb-evaluate-star" :class='{ active: isActive5 }' @click="getAttitude5"></span>
							</div>
						</div>
					</div>
				</a>
				<a class="mint-cell mint-field">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<span class="mint-cell-text">维修效率</span>
						</div>
						<div class="mint-cell-value">
							<div class="text-right" style="width: 100%;">
								<span class="ybb-evaluate-star active" :class='{ active: efficiency }' @click="firStar"></span>
								<span class="ybb-evaluate-star" :class='{ active: efficiency2 }' @click="secStar"></span>
								<span class="ybb-evaluate-star" :class='{ active: efficiency3 }' @click="thiStar"></span>
								<span class="ybb-evaluate-star" :class='{ active: efficiency4 }' @click="forStar"></span>
								<span class="ybb-evaluate-star" :class='{ active: efficiency5 }' @click="fivStar"></span>
							</div>
						</div>
					</div>
				</a>
				<a class="mint-cell mint-field">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<span class="mint-cell-text">维修质量</span>
						</div>
						<div class="mint-cell-value">
							<div class="text-right" style="width: 100%;">
								<span class="ybb-evaluate-star active" :class='{ active: quality }' @click="getQuality"></span>
								<span class="ybb-evaluate-star" :class='{ active: quality2 }' @click="getQuality2"></span>
								<span class="ybb-evaluate-star" :class='{ active: quality3 }' @click="getQuality3"></span>
								<span class="ybb-evaluate-star" :class='{ active: quality4 }' @click="getQuality4"></span>
								<span class="ybb-evaluate-star" :class='{ active: quality5 }' @click="getQuality5"></span>
							</div>
						</div>
					</div>
				</a>
				<a class="mint-cell mint-field">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<span class="mint-cell-text">维修环境</span>
						</div>
						<div class="mint-cell-value">
							<div class="text-right" style="width: 100%;">
								<span class="ybb-evaluate-star active" :class='{ active: envir }' @click="getEnvir"></span>
								<span class="ybb-evaluate-star" :class='{ active: envir2 }' @click="getEnvir2"></span>
								<span class="ybb-evaluate-star" :class='{ active: envir3 }' @click="getEnvir3"></span>
								<span class="ybb-evaluate-star" :class='{ active: envir4 }' @click="getEnvir4"></span>
								<span class="ybb-evaluate-star" :class='{ active: envir5 }' @click="getEnvir5"></span>
							</div>
						</div>
					</div>
				</a>
			</div>
			<div class="yy-item-box">
				<a class="mint-cell">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div class="s-yy-item-box">
								<div class="s-yy-decri">
									<div class="m-t-8">
										<textarea placeholder="备注说明" rows="4" v-model="remarks"></textarea>
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</a>
			</div>
			
		</div>

		<div class="yuyue-submit" @click="submit">
			<div class="hhxh-flex">
				<div class="flex-1">
					<button class="mint-button mint-button--default mint-button--large ybb-btn"><label class="mint-button-text title-1">提交评价</label></button>
				</div>
			</div>
		</div>
		<!--container end-->

		<!--footer-->
		
		<!--fonter end-->

</div>
</template>

<script>
import maiService from 'SERVICES/maiService'
import {Toast} from 'mint-ui'
export default {
  data: () => ({
    reserveId: '',
    remarks: '',
    isActive: false,
    isActive2: false,
    isActive3: false,
    isActive4: false,
    isActive5: false,
    attitudeNumber: '1',
    efficiency: false,
    efficiency2: false,
    efficiency3: false,
    efficiency4: false,
    efficiency5: false,
    productivityNumber: '1',
    quality: false,
    quality2: false,
    quality3: false,
    quality4: false,
    quality5: false,
    qualityNumber: '1',
    envir: false,
    envir2: false,
    envir3: false,
    envir4: false,
    envir5: false,
    envirNumber: '1'
  }),
  created () {
    this.getQuery()
  },
  methods: {
    getQuery: function () {
      this.reserveId = this.$route.query.reserveId
    },
    submit: function () {
      maiService.saveEvalue(this.reserveId, this.attitudeNumber, this.productivityNumber, this.qualityNumber, this.envirNumber, this.remarks).then(res => {
        Toast('评价成功')
        this.$router.push({
          name: 'MaintainSrv'
        })
      })
    },
    oneStar: function () {
      this.isActive = true
      this.isActive2 = false
      this.isActive3 = false
      this.isActive4 = false
      this.isActive5 = false
    },
    twoStar: function () {
      this.isActive = true
      this.isActive2 = true
      this.isActive3 = false
      this.isActive4 = false
      this.isActive5 = false
    },
    threeStar: function () {
      this.isActive = true
      this.isActive2 = true
      this.isActive3 = true
      this.isActive4 = false
      this.isActive5 = false
    },
    fourStar: function () {
      this.isActive = true
      this.isActive2 = true
      this.isActive3 = true
      this.isActive4 = true
      this.isActive5 = false
    },
    fiveStar: function () {
      this.isActive = true
      this.isActive2 = true
      this.isActive3 = true
      this.isActive4 = true
      this.isActive5 = true
    },
    getAttitude: function () {
      this.oneStar()
      this.attitudeNumber = '1'
    },
    getAttitude2: function () {
      this.twoStar()
      this.attitudeNumber = '2'
    },
    getAttitude3: function () {
      this.threeStar()
      this.attitudeNumber = '3'
    },
    getAttitude4: function () {
      this.fourStar()
      this.attitudeNumber = '4'
    },
    getAttitude5: function () {
      this.fiveStar()
      this.attitudeNumber = '5'
    },
    firStar: function () {
      this.efficiency = true
      this.efficiency2 = false
      this.efficiency3 = false
      this.efficiency4 = false
      this.efficiency5 = false
      this.productivityNumber = '1'
    },
    secStar: function () {
      this.efficiency = true
      this.efficiency2 = true
      this.efficiency3 = false
      this.efficiency4 = false
      this.efficiency5 = false
      this.productivityNumber = '2'
    },
    thiStar: function () {
      this.efficiency = true
      this.efficiency2 = true
      this.efficiency3 = true
      this.efficiency4 = false
      this.efficiency5 = false
      this.productivityNumber = '3'
    },
    forStar: function () {
      this.efficiency = true
      this.efficiency2 = true
      this.efficiency3 = true
      this.efficiency4 = true
      this.efficiency5 = false
      this.productivityNumber = '4'
    },
    fivStar: function () {
      this.efficiency = true
      this.efficiency2 = true
      this.efficiency3 = true
      this.efficiency4 = true
      this.efficiency5 = true
      this.productivityNumber = '5'
    },
    getQuality: function () {
      this.quality = true
      this.quality2 = false
      this.quality3 = false
      this.quality4 = false
      this.quality5 = false
      this.qualityNumber = '1'
    },
    getQuality2: function () {
      this.quality = true
      this.quality2 = true
      this.quality3 = false
      this.quality4 = false
      this.quality5 = false
      this.qualityNumber = '2'
    },
    getQuality3: function () {
      this.quality = true
      this.quality2 = true
      this.quality3 = true
      this.quality4 = false
      this.quality5 = false
      this.qualityNumber = '3'
    },
    getQuality4: function () {
      this.quality = true
      this.quality2 = true
      this.quality3 = true
      this.quality4 = true
      this.quality5 = false
      this.qualityNumber = '4'
    },
    getQuality5: function () {
      this.quality = true
      this.quality2 = true
      this.quality3 = true
      this.quality4 = true
      this.quality5 = true
      this.qualityNumber = '5'
    },
    getEnvir: function () {
      this.envir = true
      this.envir2 = false
      this.envir3 = false
      this.envir4 = false
      this.envir5 = false
      this.envirNumber = '1'
    },
    getEnvir2: function () {
      this.envir = true
      this.envir2 = true
      this.envir3 = false
      this.envir4 = false
      this.envir5 = false
      this.envirNumber = '2'
    },
    getEnvir3: function () {
      this.envir = true
      this.envir2 = true
      this.envir3 = true
      this.envir4 = false
      this.envir5 = false
      this.envirNumber = '3'
    },
    getEnvir4: function () {
      this.envir = true
      this.envir2 = true
      this.envir3 = true
      this.envir4 = true
      this.envir5 = false
      this.envirNumber = '4'
    },
    getEnvir5: function () {
      this.envir = true
      this.envir2 = true
      this.envir3 = true
      this.envir4 = true
      this.envir5 = true
      this.envirNumber = '5'
    },
    goback: function () {
      this.$router.push('/MaintainSrv')
    }
  }
}
</script>
