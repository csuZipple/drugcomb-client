<template>
  <FullPage>
    <section class="search-container">
      <div class="search-wrapper">
        <h2 class="title">Explore Drug Combinations</h2>
        <p class="search-tips">
          Quickly find chemical information from authoritative sources.
        </p>
        <div class="search">
          <div class="search-component">
            <input type="search" @keyup.enter="handleSearch" v-model="keyword" spellcheck="false"/>
            <button @click="handleSearch"></button>
          </div>
          <div class="recommend">
            <span class="tag">Try</span>
            <ul>
              <li>Chlorambucil - pralatrexate</li>
              <li>Melphalan - Fluorouracil </li>
              <li>Melphalan - Fluorouracil </li>
              <li>Melphalan - Fluorouracil </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="data-statistics">
      <div>
        <Statistic :number="561" unit="" info="Single Drugs"/>
        <Statistic :number="105752" unit="" info="Combinations"/>
        <Statistic :number="1127969" unit="" info="Experiments"/>
        <Statistic :number="104" unit="" info="Cell Lines"/>
      </div>
    </section>
    <section class="article-container">
      <h2>What is DrugCombDB?</h2>
      <article>
        <p>
          Drug combinations have demonstrated high efficacy and low adverse side effects compared to single drug administrations in cancer therapies, and thus draw intensive attentions from researchers and pharmaceutical enterprises.
        </p>
        <p>
          Thanks to the fast development of high-throughput screening (HTS) methods, the amount of available drug combination dadaists has tremendously increased.
        </p>
        <p>
          However, existing database <a href="http://www.cls.zju.edu.cn/dcdb/" target="_blank">DCDB</a>, which has not been updated since 2014, covers only 1,363 drug combination annotations extracted from FDA orange books and records of clinical trials using the text-mining technique, which are lack of indications of the drug combinations and quantitative dose-responses.
        </p>
        <p>
          Therefore, there is an urgent need for a comprehensive database that is crucial to both experimental and computational screening of drug combinations.
        </p>
        <p>
          <a class="more" href="/about">Learn More About DrugCombDB</a>
        </p>
      </article>
    </section>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import Statistic from './components/statistic'
export default {
  name: 'home',
  components: {Statistic, FullPage},
  methods: {
    handleSearch () {
      this.$router.push(`/synergyScore?q=${encodeURIComponent(this.keyword)}`)
    }
  },
  data () {
    return {
      keyword: ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  section{
    padding: 40px 0;
  }
  .search-container{
    height: 385px;
    background: @blue;
    color: #ffffff;
    .search-wrapper{
      width: 80%;
      height: 100%;
      margin: auto;

      .title{
        font-size: 46px;
        margin: 8px 0;
        font-weight: 200;
      }
      .search-tips{
        font-size: 24px;
        font-weight: 300;
        margin: 20px 0;
      }
      .search{
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;

        div{
          width: 70%;
          height: 60px;
        }
        .search-component{
          display: flex;
          justify-content: center;
          align-items: center;

          input{
            height: 100%;
            width: calc(100% - 60px);
            background: #ffffff;
            border: 1px solid #e8e8e8;
            caret-color: #2a2a2a;
            color: @lighter-blue;
            padding: 0 10px;
            font-size: 22px;
          }
          button{
            height: 100%;
            width: 60px;
            background:  #ffffff url("../../assets/icon/search.png") center no-repeat;
            background-size: 50%;
            border: none;

            &:focus{
              outline: none;
            }
            &:active{
              background: @lighter-blue;
            }
          }
        }
        .recommend{
          padding-left: 20px;
          display: flex;
          .tag{
            display: inline-block;
            height: 100%;
            line-height: 60px;
          }
          ul{
            margin-left: 20px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            li{
              height: 100%;
              margin: 0 5px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: default;
              transition: all 0.3s;
              &:hover{
                color: @lighter-blue;
                text-decoration: underline;
              }
            }
          }
        }

      }
    }
  }
  .data-statistics{
    height: 120px;
    background: #f1f1f1;
    &>div{
      width: 1000px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }

  .article-container{
    background: #ffffff;
    padding: 0;
    h2{
      font-size: 34px;
      padding: 20px 0;
      color: #5b616b;
      font-weight: 200;
    }
    article{
      width: 800px;
      margin: 0 auto;
      padding-bottom: 20px;
      color: #212121;
      line-height: 1.5;
      font-size: 20px;
      word-break: break-word;
      text-align: left;
      p{
        margin: 1em 0;
        font-weight: 300;
        &:first-child{
          margin-top: 0;
        }
        a{
          color: @lighter-blue;
          transition: all 0.3s;
          font-weight: 400;
          &:hover{
            color: @blue;
            text-decoration: underline;
          }
        }
        .more{
          text-decoration: underline;
        }
      }
    }
  }
</style>
