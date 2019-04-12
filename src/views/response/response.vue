<template>
  <FullPage>
    <section>
      <HeaderTitle>
        Drug Info
      </HeaderTitle>
      <div class="drug-info">
          <table v-if="drugInfoList.length">
            <tr><th>DrugName</th><td>{{drugInfoList[0]['drugName']}}</td><td>{{drugInfoList[1]['drugName']}}</td></tr>
            <tr><th>ChemicalStructure</th><td><img :src="drugInfoList[0]['originImgUrl']" alt=""/></td><td><img :src="drugInfoList[1]['originImgUrl']" alt=""/></td></tr>
            <tr><th>NCI</th><td><a :href="'https://pubchem.ncbi.nlm.nih.gov/compound/'+drugInfoList[0]['cIds']">{{drugInfoList[0]['cIds']}}</a></td><td><a :href="'https://pubchem.ncbi.nlm.nih.gov/compound/'+drugInfoList[1]['cIds']">{{drugInfoList[1]['cIds']}}</a></td></tr>
            <tr><th>OfficialName</th><td>{{drugInfoList[0]['drugNameOfficial']}}</td><td>{{drugInfoList[1]['drugNameOfficial']}}</td></tr>
            <tr><th>MolecularWeight</th><td>{{drugInfoList[0]['molecularWeight']}}</td><td>{{drugInfoList[1]['molecularWeight']}}</td></tr>
            <tr><th>SmilesString</th><td>{{drugInfoList[0]['smilesString']}}</td><td>{{drugInfoList[1]['smilesString']}}</td></tr>
          </table>

        <div>
          <p>CellLine</p>
          <ul v-if="cellLine">
            <li v-for="(value ,key) in cellLine" :key="key">{{key}} : {{value ? value : "Null"}}</li>
          </ul>
        </div>
      </div>
      <HeaderTitle>
        Drug Combination Response
      </HeaderTitle>
      <div class="content" v-if="tableData.length">
        <div class="tab">
          <button @click="showTable = true">Table</button>
          <button @click="showTable = false">Matrix</button>
        </div>
        <div class="tips" v-if="!showTable">
            // Todo: The Explanation of Matrix
        </div>
        <SimpleTable v-if="showTable" :body="tableData" :header="Object.keys(tableData[0])"/>
        <MultiRect v-else :data="tableData"/>
      </div>
    </section>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
import {getDrugKVByBlockId, getDrugInfoByDrugName, getDrugCombinationCellLine} from '../../api/api'
import SimpleTable from '../../components/Table/SimpleTable'
import MultiRect from '../../components/Visualization/Multi-Rect'
export default {
  name: 'response',
  components: {MultiRect, SimpleTable, HeaderTitle, FullPage},
  props: ['blockId', 'tableIndex'],
  data () {
    return {
      drugInfoList: [],
      tableData: [],
      cellLine: null,
      showTable: true
    }
  },
  mounted () {
    getDrugCombinationCellLine(this.tableIndex, this.blockId).then(data => {
      this.cellLine = data
    })
    getDrugKVByBlockId(this.tableIndex, this.blockId).then(data => {
      this.tableData = data
      return data
    }).then(data => {
      Promise.all([getDrugInfoByDrugName(data[0].drugRowName), getDrugInfoByDrugName(data[0].drugColName)]).then(data => {
        this.drugInfoList = data
      })
    })
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  section{
    margin: 0 240px;
    padding: 15px 30px;
    text-align: left;
    background: #ffffff;

    &:first-child{
      margin-top: 5px;
    }
    &:last-child{
      margin-bottom: 10px;
    }

    .drug-info{
      display: flex;
      justify-content: flex-start;
      table{
        th{
          text-align: right;
        }
        th,td{
          padding: 10px;
          img{
            height: 150px;
            object-fit: contain;
          }
        }
      }

      ul{
        margin-left: 50px;
      }
    }

    .content{
      padding-left: 10px;

      .tab{
        padding: 10px 5px;
        button{
          height: 30px;
          .btn()
        }
      }
      .tips{
        padding: 10px;
        color: green;
        font-family: Georgia,serif;
        font-style: italic;
      }
    }
  }
</style>
