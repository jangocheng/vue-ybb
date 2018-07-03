<template>
<div class="jf-add-list" >
          <div class="soul-list-box1">
            <a class="mint-cell" v-for="item in items">
              <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                  <div class="mint-cell-text">
                    <div>{{item.remark}}</div>
                    <div class="gray m-t-5">{{item.bizDate}}</div>
                  </div>
                </div>
                <div class="mint-cell-value black">{{item.score}}</div>
              </div>
            </a>
          </div>
        </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
