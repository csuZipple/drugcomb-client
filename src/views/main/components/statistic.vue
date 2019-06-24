<template>
    <div class="statistic">
      <div class="bigger">
        <EaseNumber class="number" :number="localNumber"/>{{unit}}
      </div>
      <div class="info">
        {{info}}
      </div>
    </div>
</template>

<script>
import EaseNumber from './EaseNumber'
export default {
  name: 'Statistic',
  props: {
    number: Number,
    unit: {
      type: String,
      default: ''
    },
    info: String
  },
  components: {EaseNumber},
  data () {
    return {
      localNumber: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.localNumber = this.number
    })
  }
}
</script>

<style lang="less" scoped>
  @import "../../../assets/style/main";
  .statistic{
    padding: 5px 8px;
    width: 250px;
    display: inline-flex;
    justify-content: center;
    font-weight: 200;
    .bigger{
      font-size: 34px;
      .number{
        font-weight: 400;
        color: @blue
      }
    }
    .info{
      max-width: 150px;
      align-self: flex-end;
      margin-left: 5px;
      font-size: 18px;
      font-weight: bolder;
      white-space: nowrap;
    }
  }
</style>
