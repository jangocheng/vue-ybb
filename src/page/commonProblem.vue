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
      <h1 class="mint-header-title title-3">常见问题</h1>
      <div class="mint-header-button is-right"></div>
    </header>
    <div class="header-empty"></div>
    <!--header end-->
    
    <!--container-->
    <div class="problem-header-box blue">石英表常见问题</div>
    <div class="repair-knowledge-box">
      <a class="mint-cell" @click="arrowUp('1')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '1','arrow-down': open !='1','header-box': true}" style="width: 100%">调校及注意事项</div>
            <div class="body-box gray" v-show="open === '1'">
              1、调正日期的手表，请用每天24小时的概念将表校正到正确的时间，避免日期在白天12点前后变更；建议：先在一档位置转动柄头到前一天的日期（日历边框中显示的日期），然后将柄头拉出至二档位置，旋转柄头使表针顺时针转动，直至需要的日期出现，然后继续转动柄头来调整至所需的时间；<br/>2、快速校正日期、星期时，不可在21时（晚上9时）至凌晨5时期间进行，以免破坏正在运行中的齿轮。如手表出现中午变化日期，请沿顺时针方向再拨12小时；<br/>3、如“星期”功能有中、外文双语显示，可根据需要选择在星期框中显示；<br/>4、为了延长依波手表使用寿命，很多依波双历手表都采用慢跳的方式，也就是在午夜前后时间段逐步跳转，一般在凌晨2点前跳转完成都是正常的，部分依波手表至凌晨4点完成。所以你在凌晨一点看到依波手表周历还没变也就不会感到奇怪了。<br/>5、一般依波手表在时间调整上都允许顺、逆时针，对手表的走时精度不会有影响。<br/>6、附带日历的依波表，需要以24小时的概念对时，最简单的方法是：将时间顺时针拨到12点时，观察手表是否变化日历来确定是白天还是晚上的时间 ；

            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('2')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '2','arrow-down': open !='2','header-box': true}" style="width: 100%">石英手表及周边保养常识</div>
            <div class="body-box gray" v-show="open === '2'">
              1、一等品石英表允许的误差范围为±30秒/月。石英表的走时由电池能源驱动，一般电池寿命与手表的功耗及电池的容量有关，手表功耗越小、电池容量越大，则电池的寿命越长，依波表都是使用原装进口电池，当电池将近消耗完毕时，秒针便会每隔2-4秒才跳动一次，如有此情况出现,您应立即更换电池。逾期可能对机件造成损坏，若发现时间走慢,有可能因电力不足造成，可到授权维修中心检测电量两针石英表在调校时要拨快一分钟，以补偿磁轮间的间隙；<br/>2、石英表根据采用的机芯和使用情况不同，电池寿命为不低于一年。高档三针石英表都有电池将耗尽提示功能,秒针跳动异常，即每2-4秒一跳,则提醒您需及时更换电池，若不及时更换电池，可能会造成电池漏液并损坏手表内部零件。有的顾客拥有数块手表，平时不戴时为了省电拔出表冠使手表停走，表面看表停走了，其实电池仍在继续放电，如不及时更换，会造成电池的过度放电，使电池漏液，同样会腐蚀机芯，造成的维修费用远远超过更换电池费用；<br/>3、石英表走停的原因：首先看表冠是否拉出,秒针是否碰到表镜，在表镜上会出现一个圈痕，三针是否接触，当针与针重叠时，看可否走过，最后请专业人士检查一下，电池是否耗尽；<br/>4、如您购买的石英表是皮带手表,敬请注意：<br/>① 避免与水份和湿气接触，以防变色和变形。<br/>② 避免长期曝晒于阳光下，以防裂纹和褪色。<br/>③ 由于皮质易于渗透，避免与油脂性物质或化妆品接触；<br/>5、石英表的保养：为了保证您的手表正常运作与精确无误，我们建议应定期保养您的手表。<br/>① 建议每次摘下表时都要用柔软的布将外观件进行清洁。<br/>② 建议每1-2年送到依波维修站进行手表防水功能、电量、外观功能的检测保养。这样不仅使手表始终处于良好的运行状态，又能有效地延长其使用寿命。
              <br/>但以上保养服务只适用于一般佩戴情况下的手表,并不包括在不正常佩戴或受到不断撞击等情况手表；
            </div>
          </div>
        </div>
      </a>
    </div>

    <div class="problem-header-box blue">机械表常见问题</div>
    <div class="repair-knowledge-box">
      <a class="mint-cell" @click="arrowUp('3')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '3','arrow-down': open !='3','header-box': true}" style="width: 100%">机械表常见问题1</div>
            <div class="body-box gray" v-show="open === '3'">
              1、手表在调校完时间玩毕后，必须把柄头推回到上弦位置，以使机械芯正常工作；<br/>2、调正日期的手表，请用每天24小时的概念将表校正到正确的时间，避免日期在白天12点前后变更；建议：先在一档位置转动柄头到前一天的日期（日历边框中显示的日期），然后将柄头拉出至二档位置，旋转柄头使表针顺时针转动，直至需要的日期出现，然后继续转动柄头来调整至所需的时间；<br/>3、快速校正日期、星期时，不可在21时（晚上9时）至凌晨5时期间进行，以免破坏正在运行中的齿轮。如手表出现中午变化日期，请沿顺时针方向再拨12小时；<br/>4、如“星期”功能有中、外文双语显示，可根据需要选择在星期框中显示；<br/>5、自动机械表建议每天佩戴手表10小时以上，如果手臂不活动，手臂亦得不到上条；<br/>6、过分用力或快速摇动手臂、对自上弦并没有帮助；
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('4')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '4','arrow-down': open !='4','header-box': true}" style="width: 100%">机械表常见问题2</div>
            <div class="body-box gray" v-show="open === '4'">
              1、为了延长依波手表使用寿命，很多依波双历手表都采用慢跳的方式，也就是在午夜前后时间段逐步跳转，一般在凌晨2点前跳转完成都是正常的，部分依波手表至凌晨4点完成。所以你在凌晨一点看到依波手表周历还没变也就不会感到奇怪了；<br/>2、在非必要的前提下不要经常调整日期和时间，以保持依波手表的精准和延长使用寿命；<br/>3、汗水对表壳有腐蚀性，应经常用软布抹去汗水或垫上塑料表托，以防止其被汗水侵蚀；<br/>4、不要随意打开表后盖，以免尘埃进入机芯影响手表的正常工作；<br/>5、不要将手表放在有樟脑丸的衣柜内，以免表油变质；<br/>6、不要将手表放在功放、音响、电视机上，以免磁化；<br/>7、长期存放不戴的手表，应每月定期上发条一次，自动机械机芯的手表则应轻轻来回摆动几分钟或戴在手腕上一段时间使其自动上紧发条。使零件不致长期处于静止状态，以保证表机的运转性能；
            </div>
          </div>
        </div>
      </a>
    </div>

    <div class="problem-header-box blue">其他常见问题</div>
    <div class="repair-knowledge-box">
      <a class="mint-cell" @click="arrowUp('5')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '5','arrow-down': open !='5','header-box': true}" style="width: 100%">联系我们</div>
            <div class="body-box gray" v-show="open === '5'">
              依波精品（深圳）有限公司 <br/><br/>深圳市南山区南海大道新能源大厦A座7层<br/><br/>Email：service@ebohr.cn<br/><br/>依波全国统一客服热线：400-700-9988（免长途费）<br/><br/>欢迎关注依波微信公众号"依波精品",与我们在线互动交流。
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('6')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '6','arrow-down': open !='6','header-box': true}" style="width: 100%">如何找到当地依波手表技术服务中心？</div>
            <div class="body-box gray" v-show="open === '6'">
              请拨打400 700 9988转2健（免长途费）咨询当地技术服务中心，我们将竭诚为您服务。
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('7')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '7','arrow-down': open !='7','header-box': true}" style="width: 100%">如何寄表到依波总部客服中心维修手表？</div>
            <div class="body-box gray" v-show="open === '7'">
              收件人姓名：客服中心<br/><br/>地址：深圳市南山区南海大道新能源大厦B座7楼<br/><br/>邮编：518000<br/><br/>电话：400 700 9988<br/><br/>备注：请附上便签条备注您的姓名、地址、联系方式、手表故障等，以便我们收到表后及时联系您。
            </div>
          </div>
        </div>
      </a>
      <a class="mint-cell" @click="arrowUp('8')">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div v-bind:class="{'arrow-up': open === '8','arrow-down': open !='8','header-box': true}" style="width: 100%">如何汇款至依波深圳总部客服中心购买手表配件或支付维修费用？</div>
            <div class="body-box gray" v-show="open === '8'">
              账户名称：依波精品（深圳）有限公司<br/><br/>银行卡号：812584065710001<br/><br/>支行：深圳招商银行南油支行
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
