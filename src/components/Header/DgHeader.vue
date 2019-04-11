<template>
    <header>
      <div class="tab-container">
        <img class="logo" src="../../assets/logo.png" alt="" @click="$router.push({path: `/main`})">
        <div :class="{'tab-active': current === index}" v-for="(item, index) in headerTextList" :key="index" @click="handlePageClick(index)">{{item}}</div>
      </div>
      <div class="search-wrapper">
        <input v-model="keyword" type="text" title="search" placeholder="Search Drug">
        <button @click="handleSearch">Search</button>
      </div>
    </header>
</template>

<script>
export default {
  name: 'DgHeader',
  props: {
    current: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handlePageClick (index) {
      const path = this.headerPageLink[index]
      this.$router.push({
        path
      })
    },
    handleSearch () {
      const keyword = this.keyword
      this.$router.push({
        path: '/search/' + encodeURIComponent(keyword)
      })
    }
  },
  data () {
    return {
      headerTextList: ['Introduction', 'Response', 'SynergyScore', 'Download', 'Tutorial', 'Api'],
      headerPageLink: ['/main', '/response', '/synergyScore', '/download', '/tutorial', '/api'],
      keyword: ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  header{
    width: 100%;
    height: 70px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    color: @font-color;
    border-bottom: 1px solid @border-color;
    background: #ffffff;

    &>div{
      margin: 0 50px;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .tab-container{
      .logo{
        height: 100%;
        object-fit: contain;
      }
      &>div{
        height: 100%;
        padding: 0 12px;
        cursor: default;

        display: flex;
        justify-content: center;
        align-items: center;

        transition: all 0.3s;

        &:hover{
          cursor: pointer;
          color: @theme-color;
        }
      }
      .tab-active{
        color: @theme-color;
      }
    }

    .search-wrapper{
      input{
        height: 50%;
        padding: 0 12px;
        border-radius: 5px;
        border: 1px solid @border-color;
        margin-right: 5px;
      }
      button{
        .btn();
        height: 50%;
      }
    }
  }
</style>
