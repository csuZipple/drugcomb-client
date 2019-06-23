<template>
  <FullPage>
    <section class="download-container">
      <div>
        <HeaderTitle>Download DataSets</HeaderTitle>
        <div class="content">
          <p class="title">
            Single Drug Combination
          </p>
          <p>
            <Search v-model="keyword" place-holder="Input drug combination " search-text="Download" @search="handleSearch"/>
          </p>
          <p class="title">
            SynergyScore - Two classification
          </p>
          <table>
            <tr><th>Index</th><th>Release Date</th><th>Dataset</th></tr>

          </table>
          <p class="title">All - Raw data</p>
          <div class="all-dataset">
            <table>
              <tr><th>Index</th><th>Release Date</th><th>Dataset</th></tr>
              <tr v-for="(item,index) in allData" :key="index"><td>{{item.index}}</td><td>{{item.date}}</td><td><span @click="handleDownLoad(index, item.title)" class="download-link">{{item.title}}</span></td></tr>
            </table>
            <p style="color: #ff0000;">
              Note: These data are for scientific research only and are not for commercial use.
            </p>
          </div>
          <p class="title">Descriptions</p>
          <div class="description">
            <p class="description-title">Combination.csv</p>
            <ul class="tips">
              <li>id: key</li>
              <li>fid: foreign key</li>
              <li>source: the origin data</li>
              <li>drug1name: drug name</li>
              <li>drug2name: drug name</li>
              <li>conc1: drug concentration</li>
              <li>conc2: drug concentration</li>
              <li>growth: Combined drug sensitivity score for this cancer cell line, between 0-1</li>
              <li>cellline: The name of the cancer cell line</li>
            </ul>
          </div>
          <p class="title">License</p>
          <p>MIT</p>
        </div>
      </div>
    </section>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
import Search from '../../components/Header/Search'
import {downloadFileByIndex} from '../../api/api'
export default {
  name: 'download',
  components: {Search, HeaderTitle, FullPage},
  methods: {
    handleSearch (keyword) {
      this.keyword = keyword
      this.$message('This feature has not been implemented yet.')
    },
    handleDownLoad (index, fileName) {
      downloadFileByIndex(index).then(res => {
        console.log(res.data instanceof Blob)
        const testBlob = res.data.slice(0)
        const reader = new FileReader()
        reader.readAsText(testBlob, 'utf-8')
        reader.onload = function (evt) {
          // 到底是后台返回的数据乱码了 还是前端接收数据流的时候创建的blob乱码了--
          console.log(evt)
          const url = window.URL.createObjectURL(new Blob(['\uFEFF' + evt.target.result], {type: 'text/plain;charset=utf-8'}))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `${fileName}`)
          document.body.appendChild(link)
          link.click()
        }
        /*        const url = window.URL.createObjectURL(res.data)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${fileName}`)
        document.body.appendChild(link)
        link.click() */
      })
    }
  },
  data () {
    return {
      singleDrug: null,
      keyword: '',
      allData: [
        {
          index: 1,
          date: '2019.04.19',
          title: 'response_bliss.csv'
        },
        {
          index: 2,
          date: '2019.04.19',
          title: 'drug_combination.csv'
        },
        {
          index: 3,
          date: '2019.04.19',
          title: 'cell_Line.csv'
        },
        {
          index: 4,
          date: '2019.04.19',
          title: 'drug_chemical_info.csv'
        },
        {
          index: 5,
          date: 'Latest',
          title: 'drug_protein_links.tsv'
        },
        {
          index: 6,
          date: 'Latest',
          title: 'protein_protein_links.txt'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  .download-container{
    margin-top: 5px;
    padding: 15px 30px;
    min-height: calc(100vh - 75px);
    text-align: left;
    background: #ffffff;
    &>div{
      width: 1000px;
      margin: 0 auto;
      height: 100%;
      .content{
        padding-left: 30px;

        p.title{
          font-weight: 500;
          font-size: 18px;
          padding: 10px 0;
        }
        p{
          font-weight: 300;
          font-size: 16px;
          color: #212121;
        }
        table{
          width: 50%;
          border-spacing: 0;
          border-collapse: collapse;
          margin: 10px 0 20px;
          th{
            font-weight: 400;
            border-top: 1px solid #ddd;
          }
          th,td{
            padding: 8px 16px;
            text-align: left;
          }
        }
      }

      .description{
        .description-title{
          font-weight: 400;
          padding: 0 0 10px;
        }
        ul{
          padding:10px;
          background: #f5f5f5;
          border: 1px solid #e8e8e8;
          li{
            padding: 2px;
          }
        }
      }
      .download-link{
        color: @theme-color;
        &:hover{
          text-decoration: underline;
          cursor: default;
        }
      }
    }
  }
</style>
