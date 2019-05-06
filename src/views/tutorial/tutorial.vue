<template>
  <FullPage>
    <section class="tutorial-container">
      <div>
        <HeaderTitle>
          Tutorial
        </HeaderTitle>
        <div>
          <pre></pre>
        </div>
      </div>
    </section>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
export default {
  name: 'tutorial',
  components: {HeaderTitle, FullPage}
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  .tutorial-container {
    margin-top: 5px;
    padding: 15px 30px;
    min-height: calc(100vh - 75px);
    text-align: left;
    background: #ffffff;

  & > div {
      width: 1000px;
      margin: 0 auto;
      height: 100%;
    }
  }
</style>
