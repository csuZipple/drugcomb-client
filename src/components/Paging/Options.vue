<template>
  <div class="page-opt">
    <div class="selected" @click="showOpt = !showOpt">
      <span>{{options[current] + ' '+unit}}</span>
      <img class="icon" src="../../assets/icon/arrow_down.png"/>
    </div>
    <transition enter-active-class="animated bounceIn" leave-active-class="animated fadeOut">
      <ul class="opt" v-if="showOpt">
        <li :class="['opt-item', {'opt-item-active': current === index}]" v-for="(item, index) in options" @click="handleClick(index)" :key="index">{{item  + ' ' + unit}}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Options',
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    unit: {
      type: String,
      default: 'items/page'
    }
  },
  methods: {
    handleOtherClicked (e) {
      if (!this.$el.contains(e.target)) {
        this.showOpt = false
      }
    },
    handleClick (index) {
      if (index !== this.current) {
        this.current = index
        this.showOpt = false
        this.$emit('optionsChange', this.options[index])
      }
    }
  },
  data () {
    return {
      current: 0,
      showOpt: false
    }
  },
  mounted () {
    document.addEventListener('click', this.handleOtherClicked)
  },
  destroyed () {
    document.removeEventListener('click', this.handleOtherClicked)
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  .page-opt{
    display: inline-block;
    height: 32px;
    position: relative;

    .selected{
      padding: 0 5px;
      height: 100%;
      border: 1px solid #dcdee2;
      cursor: pointer;
      border-radius: 4px;
      user-select: none;

      display: flex;
      justify-content: space-around;
      align-items: center;
      img{
        width: 12px;
        height: 100%;
        margin-left: 5px;
        object-fit: contain;
      }

      &:hover{
        border-color: @theme-color;
        color: @theme-color;
      }
    }
    .opt{
      min-width: 100%;
      list-style: none;

      max-height: 200px;
      overflow: auto;
      margin: 5px 0;
      padding: 5px 0;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
      position: absolute;
      z-index: 900;

      .opt-item{
        margin: 0;
        line-height: normal;
        padding: 7px 16px;
        clear: both;
        color: #515a6e;
        font-size: 12px;
        white-space: nowrap;
        list-style: none;
        cursor: pointer;
        transition: background .2s ease-in-out;
        user-select: none;
        &:hover{
          background: #f3f3f3;
        }
        &-active{
          color: @theme-color;
          background: @body-color;
        }
      }
    }
  }
</style>
