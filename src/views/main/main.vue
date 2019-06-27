<template>
  <FullPage>
    <section class="search-container">
      <div class="search-wrapper">
        <h2 class="title">Explore DrugCombDB</h2>
        <p class="search-tips">
          Quickly find synergistic drugs from integrative sources.
        </p>
        <div class="search">
          <div class="search-component">
            <input @input="handleInput" type="search" @keyup.enter="handleSearch" v-model="keyword" spellcheck="false"/>
            <button @click="handleSearch"></button>
            <ul class="search-tips" v-show="tips.length!==0">
              <li @click="handleSearchTipsClicked(item)" v-for="(item, index) in tips" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="recommend">
            <span class="tag">Examples:</span>
            <ul>
              <li v-for="(item, index) in recommendList" :key = index @click="handleRecommendItemClicked(item)">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="data-statistics">
      <div>
        <Statistic :number="2887" unit="" info="Single Drugs"/>
        <Statistic :number="436627" unit="" info="Combinations"/>
        <Statistic :number="6891566" unit="" info="Data points"/>
        <Statistic :number="124" unit="" info="Cell Lines"/>
      </div>
    </section>
    <section class="article-container">
      <h2>What is DrugCombDB?</h2>
      <article>
        <p>
          DrugCombDB is a comprehensive database dedicated to integrating drug combinations from various data sources, include 1) high-throughput screening assays of drug combinations, 2) external databases, and 3)manual curations from PubMed literature. In total, DrugCombDB includes 4,226,900 experimental data points with quantitative dose response and concentrations of drug combinations covering 2879 unique drugs and 124 human cancer cell lines, and 138,076 FDA approved or literature-supported drug combinations.
        </p>
        <p>
          To the best of our knowledge, DrugCombDB is the first comprehensive database with the largest number of drug combinations to date. We believe it would greatly facilitate and accelerate the discovery of novel synergistic drugs for the therapy of complex diseases, especially for the cancers developed drug resistance. In particular, we computed the scores determining the synergy or antagonism of two drugs. To facilitate the downstream usage of our data resource, we prepared multiple datasets that are ready for building prediction models of classification and regression analysis.
        </p>
        <p>
          A website with user-friendly data visualization is provided to help users access the wealth of data. Users can input a drug of interest to retrieve associated drug combinations, together with the supporting evidence sources and drug targets. The dose responses and drugs concentrations with respect to cancer cell lines are displayed in interactive scatter plots.
        </p>
      </article>
    </section>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import Statistic from './components/statistic'
import {getRecommendDrugIntegrationList, searchDrugPages} from '../../api/api'
import {throttle} from '../../utils/util'

export default {
  name: 'home',
  components: {Statistic, FullPage},
  created () {
    getRecommendDrugIntegrationList().then(data => {
      // this.recommendList = data
      this.recommendList = ['Lomustine - Megestrol acetate', 'Dexrazoxane - Melphalan', 'Lomustine', 'Thioguanine']
    })
  },
  methods: {
    handleSearch () {
      this.$router.push(`/synergyScore?q=${encodeURIComponent(this.keyword)}`)
    },
    handleInput (e) {
      let keyword = e.target.value.trim()
      if (keyword !== this.keyword) {
        this.keyword = keyword
      }
      throttle(this.onInputSearch, null, [keyword])
    },
    onInputSearch (keyword) {
      if (keyword === '') {
        this.tips = [] // close tips
        return
      }
      searchDrugPages(keyword, 1, 100).then(data => {
        if (data.total) {
          this.tips = data.page.map(item => item.drugCombination)
        } else {
          this.$message('Can not find a drug containing this word.')
        }
      })
    },
    handleSearchTipsClicked (c) {
      this.handleRecommendItemClicked(c)
    },
    handleRecommendItemClicked (name) {
      this.keyword = name
      this.$nextTick(() => {
        this.handleSearch()
      })
    }
  },
  data () {
    return {
      keyword: '',
      recommendList: [],
      tips: [] // search tips
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
          position: relative;
          .search-tips {
            position: absolute;
            left: 0;
            top: 35px;
            width: 100%;
            max-height: 220px;
            overflow-y: auto;
            border: 1px solid @border-color;
            background: #FFFFFF;
            list-style: none;
            color: black;
            li {
              text-align: left;
              padding: 5px 10px;
              transition: all 0.3s;
              cursor: pointer;
              &:hover {
                background: @input-focus-color;
                color: white;
              }
            }
          }
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
          }
        }
        .recommend{
          padding-left: 20px;
          height: 100px;
          display: flex;
          .tag{
            display: inline-block;
            height: 100%;
            line-height: 100px;
          }
          ul{
            margin-left: 20px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            li{
              margin: 0 5px;
              padding: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s;
              border: 1px solid @blue;
              border-radius: 15px;
              white-space: nowrap;
              background: #eeeeee;
              font-weight: 400;
              color: @blue;
              &:hover{
                background-color: @blue;
                border-color: #FFFFFF;
                color: #FFFFFF;
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
