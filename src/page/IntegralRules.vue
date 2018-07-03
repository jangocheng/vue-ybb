<template>
<div>
<com-header :title="headerData.title" :toLink="headerData.toLink"></com-header>
	<div class="jf-get-box">
			<img src="../assets/jf-shop-get.png" class="jf-get-banner">
      <div style="margin-top: 0;padding:0" v-for="(item, index) in Items">
			<h3 class="title-1">
      <img v-if="index === 0" :src="imageOne">
      <img v-if="index === 1" :src="imageThree">
      <img v-if="index === 2" :src="imageTwo">
      <img v-if="index === 3" :src="imageFour">
      <img v-if="index === 4" :src="imageFive">
      {{item.ruleName}}</h3>
      <table cellspacing="1" class="jf-get-table" v-if="index === 2">
                <thead>
                    <th>会员等级</th>
                    <th>注册会员</th>
                    <th>VIP会员</th>
                    <th>金卡会员</th>
                    <th>钻石会员</th>
                </thead>
                <tbody>
                    <tr>
                        <td rowspan="2">满足条件</td>
                        <td colspan="4">关注公众号并注册</td>
                    </tr>
                    <tr>
                        <td>注册即成为会员</td>
                        <td>4000分以内</td>
                        <td>4001-8000分</td>
                        <td>8001分以上</td>
                    </tr>
                    <tr>
                        <td>尊享双倍保障</td>
                        <td></td>
                        <td><span class="selected"></span></td>
                        <td><span class="selected"></span></td>
                        <td><span class="selected"></span></td>
                    </tr>
                    <tr>
                        <td>会员折扣</td>
                        <td></td>
                        <td></td>
                        <td><span class="selected"></span></td>
                        <td><span class="selected"></span></td>
                    </tr>
                    <tr>
                        <td>专享礼包</td>
                        <td></td>
                        <td></td>
                        <td><span class="selected"></span></td>
                        <td><span class="selected"></span></td>
                    </tr>
                    <tr>
                        <td>会员升级</td>
                        <td></td>
                        <td><span class="selected"></span></td>
                        <td><span class="selected"></span></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
			<p><pre style="margin: 0;height: 1.6;line-height: 1.6;color: #b2b2b2;font-size: 14px;font-family: Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif;">{{item.remark}}</pre></p>
      </div>
		</div>
</div>
</template>

<script>
import comHeader from 'components/comHeader'
import priceShopService from 'SERVICES/priceShopService'
export default {
  components: {
    comHeader
  },
  data: () => ({
    headerData: {
      title: '积分兑换规则',
      toLink: '/PriceShop'
    },
    imageOne: require('../assets/jf-get-sys.png'),
    imageTwo: require('../assets/jf-get-level.png'),
    imageThree: require('../assets/积分清零明细.png'),
    imageFour: require('../assets/积分兑换规则.png'),
    imageFive: require('../assets/会员须知.png'),
    IntegralRules: {},
    Items: []
  }),
  created () {
    this.lookIntegralRule()
  },
  methods: {
    lookIntegralRule: function () {
      priceShopService.lookIntegralRules().then(res => {
        let list = res.t.scoreRuleList
        for (let i = 0; i <= list.length - 1; i++) {
          this.Items.push(list[i])
        }
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
.jf-get-table {
    margin: 10px;
}
.jf-get-table td,
.jf-get-table th {
    border: 1px solid #d9d9d9;
    padding: 3px;
    color: #b2b2b2;
    text-align: center;
}
.jf-get-table td span.selected {
    display: inline-block;
    border: solid 1px #b2b2b2;
    border-top-color: transparent;
    border-right-color: transparent;
    width: 15px;
    height: 5px;
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
}
</style>

