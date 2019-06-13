<template>
  <FullPage>
    <section class="drug-info-container">
      <div>
        <HeaderTitle>
          Drug-Detail-Information
        </HeaderTitle>
        <div class="drug-info">
          <template v-if="drugProteinLinks && drugProteinLinks.links.length">
            <DrugProteinNetworks :width="450" :height="410" :drugProteinLinks="drugProteinLinks"/>
            <div v-if="drug_protein_table.length" style="padding: 8px 0;">
              <SimpleTable :header="Object.keys(drug_protein_table[0])" :body="drug_protein_table"/>
              <Page show-elevator show-total  @pageClick="handleChangePage" :total="total" :current="pageNum" :page-size="pageSize" @changePage="handleChangePage" @pageSizeChange="handlePageSizeChange"/>
            </div>
          </template>
          <div v-if="!error && !drugProteinLinks">
            Loading...
          </div>
          <div v-if="!error && drugProteinLinks && !drugProteinLinks.links.length">
            No Results.
          </div>
        </div>
        <HeaderTitle>
          Indication
        </HeaderTitle>
        <div class="clinical-response">
          {{drugInfoExtra ? drugInfoExtra.indication : 'The data is about to be added...'}}
        </div>
        <HeaderTitle>
          PharmacoDynamics
        </HeaderTitle>
        <div class="side-effects">
          {{drugInfoExtra ? drugInfoExtra.pharmacoDynamics : 'The data is about to be added...'}}
        </div>
      </div>
    </section>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
import {getDrugInfoByDrugName, getDrugInfoExtraByDrugId, getDrugProteinLinksInformation, getDrugProteinLinksPages} from '../../api/api'
import DrugProteinNetworks from '../../components/Visualization/DrugProteinNetworks'
import SimpleTable from '../../components/Table/SimpleTable'
import Page from '../../components/Paging/Paging'
export default {
  name: 'drugDetail',
  components: {Page, SimpleTable, DrugProteinNetworks, HeaderTitle, FullPage},
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const drugName = this.$route.query.drugName
      this.drugName = drugName
      if (drugName === '') {
        this.$message({
          type: 'error',
          text: 'Path Error'
        })
      } else {
        getDrugInfoByDrugName(drugName).then(data => {
          this.drugInfo = data
          return data
        }).then(data => {
          getDrugProteinLinksInformation(data.cIds).then(data => {
            this.drugProteinLinks = data
          })
          getDrugInfoExtraByDrugId(data.cIds).then(data => {
            this.drugInfoExtra = data
          })
          this.updateTableData()
        }).catch(err => {
          this.error = true
          this.$message({
            type: 'error',
            text: 'Loading data error! 【ERROR】: ' + JSON.stringify(err)
          })
        })
      }
    },
    updateTableData () {
      if (this.drugInfo.cIds) {
        getDrugProteinLinksPages(this.drugInfo.cIds, this.pageNum, this.pageSize).then(data => {
          this.drug_protein_table = data.page
          this.total = data.total
        })
      } else {
        this.$message({
          text: 'drug ID is null',
          type: 'error'
        })
      }
    },
    handleChangePage (index) {
      this.pageNum = index > Math.ceil(this.total / this.pageSize) ? Math.ceil(this.total / this.pageSize) : Number(index)
    },
    handlePageSizeChange (current, size) {
      this.pageNum = current
      this.pageSize = size
    }
  },
  data () {
    return {
      drugInfo: null,
      drugName: '',
      drugProteinLinks: null,
      error: false,
      drugInfoExtra: null,
      drug_protein_table: [],
      pageNum: 1,
      pageSize: 10,
      total: -1
    }
  },
  watch: {
    pageNum () {
      this.updateTableData()
    },
    pageSize () {
      this.updateTableData()
    }
  }
}
</script>

<style lang="less" scoped>
  .drug-info-container{
    margin-top: 5px;
    padding: 15px 30px;
    min-height: calc(100vh - 75px);
    text-align: left;
    background: #ffffff;
    &>div{
      width: 1000px;
      margin: 0 auto;
      height: 100%;
      &>div{
        padding-left: 30px;
      }
    }
  }
</style>
