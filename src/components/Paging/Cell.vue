<template>
  <div :class="['table-cell', {'table-cell-active': active}, {'table-cell-disabled': disabled}]" :title="localTitle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.localTitle = this.title !== '' ? this.title : this.$slots.default[0].text
  },
  data () {
    return {
      localTitle: ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  .table-cell{
    user-select: none;
    min-width: 32px;
    height: 32px;
    list-style: none;
    text-align: center;
    cursor: pointer;
    color: #666;
    font-family: Arial,serif;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    transition: all .2s ease-in-out;
    margin: 0 2px;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    &:hover{
      border-color: @theme-color;
      color: @theme-color;
    }
    &-active{
      border-color: @theme-color;
      color: @theme-color;
    }
    &-disabled{
      cursor: not-allowed;
      color: #666 !important;
    }
    &-disabled:hover{
      border-color: @border-color;
    }
  }
</style>
