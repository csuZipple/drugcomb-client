<template>
  <FullPage>
    <section class="download-container">
      <div>
        <HeaderTitle>Download DataSets</HeaderTitle>
        <div class="content">
          <p class="title">
            Single Drug
          </p>
          <p>
            <Search place-holder="Search single drug here.."/>
          </p>
          <table>
            <tr><th></th></tr>
          </table>
          <p class="title">All</p>
          <div class="all-dataset">
            <table>
              <tr><th>Index</th><th>Release Date</th><th>Dataset</th></tr>
              <tr><td>1</td><td>2019.04.19</td><td><span @click="handleDownLoad(0, 'response_Bliss.csv')" class="download-link">response_Bliss.csv</span></td></tr>
              <tr><td>2</td><td>2019.04.19</td><td><span @click="handleDownLoad(1, 'drug_Combination.csv')" class="download-link">drug_Combination.csv</span></td></tr>
              <tr><td>3</td><td>2019.04.19</td><td><span @click="handleDownLoad(2, 'cell_Line.csv')" class="download-link">cell_Line.csv</span></td></tr>
              <tr><td>4</td><td>2019.04.19</td><td><span @click="handleDownLoad(3, 'drug_chemical_info.csv')" class="download-link">drug_chemical_info.csv</span></td></tr>
              <tr><td>5</td><td>Latest</td><td><span @click="handleDownLoad(4, 'drug_protein_links.tsv')" class="download-link">drug_protein_links.tsv</span></td></tr>
              <tr><td>6</td><td>Latest</td><td><span @click="handleDownLoad(5, 'protein_protein_links.txt')" class="download-link">protein_protein_links.txt</span></td></tr>
            </table>
            <p>
              <span>Note:</span> when downloading from a mirror please check the SHA-512 and verify the OpenPGP compatible signature from the main Apache site. Links are provided above (next to the release download link). This KEYS file contains the public keys used for signing release. It is recommended that (when possible) a web of trust is used to confirm the identity of these keys.
            </p>
          </div>
          <p class="title">Descriptions</p>
          <div class="description">
            <p class="description-title">Combination.csv</p>
            <ul>
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
            <p class="description-title">Integration.csv</p>
            <ul>
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
    handleDownLoad (index, fileName) {
      downloadFileByIndex(index).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${fileName}`)
        document.body.appendChild(link)
        link.click()
      })
    }
  },
  data () {
    return {
      singleDrug: null
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
        .all-dataset{
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
