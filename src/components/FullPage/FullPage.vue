<template>
  <div class="page">
    <DgHeader class="header"/>
    <main class="main">
      <slot></slot>
    </main>
    <DgFooter class="footer"/>
  </div>
</template>

<script>
import DgHeader from '../Header/DgHeader'
import DgFooter from '../Footer/DgFooter'
export default {
  name: 'FullPage',
  components: {DgFooter, DgHeader}
}
</script>

<style lang="less" scoped>
  .page{
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    .header{
      flex: 0 0 auto;
    }
    .main{
      flex: 1 0 auto;
    }
    .footer{
      flex: 0 0 auto;
    }
  }
</style>
