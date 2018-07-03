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
      <h1 class="mint-header-title title-3">维修常识</h1>
      <div class="mint-header-button is-right"></div>
    </header>
    <div class="header-empty"></div>
    <!--header end-->
    
    <!--container-->
    <div class="m-t-16 repair-knowledge-box">
      <a class="mint-cell" @click="arrowUp('1')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '1','arrow-down': open !='1','header-box': true}" style="width: 100%">电池更换</div>
            <div class="body-box gray" v-show="open === '1'">
              “依波表”装配的是原装瑞士和日本电池，电池电量充足时，秒针每秒跳动一次。大部分机芯都具有电池寿命的显示功能，当电池电量不足时，秒针2或4秒跳一次。当秒针以2或4秒钟时隔才跳一次，或无秒针手表的分钟完全停顿时，应更换电池，以免电解液泄露而损坏机芯。
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('2')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '2','arrow-down': open !='2','header-box': true}" style="width: 100%">防水功能</div>
            <div class="body-box gray" v-show="open === '2'">
              后盖上刻有“WATER RESISTANT”英文字样的手表为防水表，具有防水功能；无此标记的手表仅能防尘，应避免与水接触。
              <br/>手表的防水功能是靠表镜、后盖和柄头等处的防水胶圈来保证的，防水胶圈的老化会影响手表的防水功能。一般情况下，30米防水表可用于日常梳洗及雨淋，50米防水表可用于游泳，潜水表可用于潜水。但为更好地保护您的手表，延长其使用寿命，即使是防水表，我们也建议您尽量避免使其与水接触。手表一般是不能完全防止气体（如汗气、水蒸气）和灰尘的侵入，更不能佩带手表在热水中淋浴、洗桑拿浴或在温差变化很大的环境中使用。因为防水胶圈受温度影响会热胀冷缩出现空隙并加速老化，从而引起进水和表内出现水雾，严重的会损坏机件。<br/>遇有进水现象（表镜内有水气）应立即送维修点清洗，以免机芯锈蚀。
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('3')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '3','arrow-down': open !='3','header-box': true}" style="width: 100%">走时精度</div>
            <div class="body-box gray" v-show="open === '3'">
              温度会影响手表的走时精度，手表在8℃～38℃之间能稳定准确走时；磁场会影响手表的走时精度，手表应远离带有产生磁场的电器，如电视机、手机等；剧烈震动会影响手表的走时精度，因此，剧烈的体育运动时最好从手腕上摘下手表；电池电压会影响石英手表的走时精度，因此，电池电压应保持在1.50V～1.55V之间。温度偏离常温时会导致时间走快或走慢，当手表返回常温时，走时将恢复正常。石英手表走时精度±1 秒/24 小时，机械手表±45秒/24 小时为允许误差。如您对我们的产品有任何疑问，请到依波客户服务中心进行专业检测和维护。
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('4')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '4','arrow-down': open !='4','header-box': true}" style="width: 100%">镀层保护</div>
            <div class="body-box gray" v-show="open === '4'">
              依波表”外观件电镀采用化学电镀或真空离子电镀工艺，具有较好的耐磨性。但某些腐蚀性气体和固态或液态化学物质会使电镀层腐蚀甚至脱落。因此，手表应尽量避免接触日常生活和工作环境中常见的酸、碱等腐蚀性物质，如各种洗洁剂、化妆品等，人体的汗液也会因各人的体质不同，对金属本身或电镀层产生不同程度的腐蚀，请您经常保持手表的清洁，避免运动时佩戴手表。
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('5')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '5','arrow-down': open !='5','header-box': true}" style="width: 100%">高硬度材料</div>
            <div class="body-box gray" v-show="open === '5'">
              “依波表”某些款式采用了蓝宝石玻璃，表壳、表带采用了以碳化钨为主的硬质合金和高科技精密陶瓷等材料。特点是硬度高、耐磨性强，长期佩带后外观仍可保持光洁如新，但在日常生活中如砂纸、指甲锉、混凝土墙面等都含有比上述材料硬度更高的物质，如不慎接触刮擦，会发生划伤壳、带、镜的现象，另外这种材质的抗弯强度和冲击韧性不如不锈钢。因此，此类手表应尽量避免撞击或使手表坠落在坚硬地面上，以免表壳、表带、表镜碎裂。
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('6')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '6','arrow-down': open !='6','header-box': true}" style="width: 100%">真皮表带</div>
            <div class="body-box gray" v-show="open === '6'">
              除特殊说明外，“依波表”皮表带一般选用质量优异的牛皮制作。佩带时请勿与各种酸、碱液及油类物质接触，忌长时间雨浸、水浸、用水刷洗、火烤和暴晒，否则会造成褪色、皮面裂纹、断裂和脱落。如遇湿气，需尽快用柔软干布或纸巾吸干，并自然晾干。盐渍和污垢可以用柔软的湿布和中性的肥皂擦除。偶尔，可用软布蘸少量酒精擦拭表带的底面。表带应尽量避免扣的过紧，表带和手腕间留有一指的间隙，这样可使空气流通，使湿气能及时蒸发。
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('7')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '7','arrow-down': open !='7','header-box': true}" style="width: 100%">表扣</div>
            <div class="body-box gray" v-show="open === '7'">
              手表扣为易损件，正常使用时表扣的开合次数为2000次以上。依据表扣锁紧方式，可分为摩擦锁紧扣和弹簧锁紧表扣。因摩擦或滑动部位磨损，表扣开合一定次数后可能会变松。为确保安全佩戴，扣松时，应及时维修。修复因磨损而松的摩擦锁紧表扣时，可轻轻敲击扣的活动扣臂，改变活动扣臂的弧度，使用时，增加扣的锁紧摩擦力。弹簧锁紧扣的弹簧遇水后可能会生锈，影响扣的使用寿命，使用时，应尽量避免弹簧锁紧表扣进水，或者在扣盖背面的孔内稍微滴一点低粘度润滑油，以防弹簧生锈
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('8')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '8','arrow-down': open !='8','header-box': true}" style="width: 100%">注意化学药品</div>
            <div class="body-box gray" v-show="open === '8'">
              请不要让手表受到各种溶剂（包括酒精和汽油）、水银、化妆品喷雾剂、洗剂、粘合剂或者油漆类的侵蚀。否则，手表外观件就会变色，腐化或受到损伤，尤其防水部件会受到损伤而导致防水不良。
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('9')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '9','arrow-down': open !='9','header-box': true}" style="width: 100%">汗水防护</div>
            <div class="body-box gray" v-show="open === '9'">
              汗水与污垢长期粘护在表壳和表带的缝隙里会造成表的氧化、腐蚀或生锈，尤其防水部件会受到损伤而导致防水不良，手表底盖上的塑料保护薄膜在使用之前应除下，避免汗水的侵入，建议每星期对手表的外观进行一次清洁。
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('10')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '10','arrow-down': open !='10','header-box': true}" style="width: 100%">优良品质</div>
            <div class="body-box gray" v-show="open === '10'">
              依波旗下品牌全部产品均基于ISO9000 质量管理体系、采用先进设备和工艺制作而成，通过了国家钟表质量监督检验中心的各项检测，符合一等品标准（机械手表QB/T 1249-2013, 指针式石英手表GB/T6044-2016）
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('11')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '11','arrow-down': open !='11','header-box': true}" style="width: 100%">定期保养</div>
            <div class="body-box gray" v-show="open === '11'">
              建议用户，最好是每隔一至二年， 把你的手表送到依波表公司指定的售后服务网点，进行防水功能、外观件功能、以及机芯清洗等方面的保养，以延长手表的使用寿命。
            </div>
          </div>
        </div>
      </a>

    </div>
    <!--container end-->

    <!--footer-->

    <!--fonter end-->
  </div>
</template>
<script>
  export default {
    data: () => ({
      open: ''
    }),
    methods: {
      goback: function () {
        this.$router.go(-1)
      },
      arrowUp: function (nowOpen) {
        if (this.open === nowOpen) {
          this.open = ''
        } else {
          this.open = nowOpen
        }
      }
    }
  }
</script>
