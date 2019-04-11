<template>
  <FullPage>

    <section class="introduction">
      <h1>Welcome to <span class="db">DrugCombDB</span></h1>
      <p>
        Drug combinations have demonstrated high efficacy and low adverse side effects compared to single drug administrations in cancer therapies, and thus draw intensive attentions from researchers and pharmaceutical enterprises. Thanks to the fast development of high-throughput screening (HTS) methods, the amount of available drug combination datasets has tremendously increased. However, existing database DCDB [1], which has not been updated since 2014, covers only 1,363 drug combination annotations extracted from FDA orange books and records of clinical trials using the text-mining technique, which are lack of indications of the drug combinations and quantitative dose-responses. Therefore, there is an urgent need for a comprehensive database that is crucial to both experimental and computational screening of drug combinations.
      </p>
      <button>View More</button>
    </section>
    <section>
      Data Source or other information
    </section>
    <section>
      Extra information
    </section>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
export default {
  name: 'home',
  components: {FullPage}
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  section{
    padding: 50px 240px 80px;
  }
  .introduction{
    background: @input-focus-color;
    h1{
      font-size: 30px;
      margin: 0 0 30px;
      .db{
        color: #ffffff;
        &:hover{
          cursor: default;
          text-decoration: underline;
        }
      }
    }
    p{
      text-align: start;
      text-indent: 2em;
      line-height: 1.5em;
    }

    button{
      .btn();
      height: 40px;
      transition: all 0.3s;
      margin-top: 20px;

      &:hover{
        background: #ffffff;
        color: @theme-color;
      }
    }
  }
</style>
