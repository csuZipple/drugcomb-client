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
          <div v-else>
            No Results...
          </div>
        </div>
        <HeaderTitle>
          Clinical-Response
        </HeaderTitle>
        <div class="clinical-response">
          Clinical response
        </div>
        <HeaderTitle>
          Side-Effects
        </HeaderTitle>
        <div class="side-effects">
          Side-Effects
        </div>
      </div>
    </section>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
import {getDrugInfoByDrugName, getDrugProteinLinksInformation, getDrugProteinLinksPages} from '../../api/api'
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
          this.updateTableData()
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
