<template>
  <header>
    <h2>
      <slot></slot>
    </h2>
  </header>
</template>

<script>
export default {
  name: 'HeaderTitle'
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  header{
    margin: 10px;
    position: relative;
    padding-left: 10px;
    &:after{
      content: '';
      position: absolute;
      width: 5px;
      height: 70%;
      left: -10px;
      top: 50%;
      background: @theme-color;
      transform: translate(0, -50%);
    }
    h2{
      font-weight: 300;
      font-size: 24px;
    }
  }
</style>
