<template>
  <header>
    <h2>
      <a class="hylink" href="#!">#</a>
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
    &:after{
      content: '';
      position: absolute;
      width: 5px;
      height: 80%;
      left: -10px;
      top: 50%;
      background: @theme-color;
      transform: translate(0, -50%);
    }
    .hylink:hover{
      text-decoration: underline;
    }
  }
</style>
