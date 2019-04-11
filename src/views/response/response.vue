<template>
  <FullPage>
    <section>
      <HeaderTitle>
        Drug Info
      </HeaderTitle>
      <div class="content drug-info-wrapper" v-if="drugInfoList.length">
        <div class="drug-info" v-for="(item, index) in drugInfoList" :key="index">
          <img :src="item['originImgUrl']"/>
          <div class="item">
            <div class="tag">CIDs</div>
            <div class="text">
              <a :href="'https://pubchem.ncbi.nlm.nih.gov/compound/'+ item['cIds']" target="_blank">{{item['cIds']}}</a>
            </div>
          </div>
          <div class="item">
            <div class="tag">DrugName</div>
            <div class="text">
              {{item['drugName']}}
            </div>
          </div>
          <div class="item">
            <div class="tag">DrugNameOfficial</div>
            <div class="text">
              {{item['drugNameOfficial']}}
            </div>
          </div>
          <div class="item">
            <div class="tag">MolecularWeight</div>
            <div class="text">
              {{item['molecularWeight']}}
            </div>
          </div>
          <div class="item">
            <div class="tag">SmilesString</div>
            <div class="text">
              {{item['smilesString']}}
            </div>
          </div>
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
import {getDrugKVByBlockId, getDrugInfoByDrugName} from '../../api/api'
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
      showTable: true
    }
  },
  mounted () {
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

    .drug-info-wrapper{
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      .drug-info{
        width: 50%;
        .item{
          display: flex;
          justify-content: space-between;

          &>div{
            padding: 5px;
          }
          .tag{
            background: #666;
          }
        }
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
