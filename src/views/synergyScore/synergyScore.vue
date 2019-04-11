<template>
  <FullPage>
    <section>
      <HeaderTitle>
        DataBase
      </HeaderTitle>
      <div class="content">
        Change Data Source here. &nbsp; <Options :options="tables" unit="" @optionsChange="handleOptionsChange"/>
      </div>
    </section>

    <section>
      <HeaderTitle>
        Drug Combination Blocks
      </HeaderTitle>
      <div class="content" v-if="tableData.length">
        <div style="padding: 10px; color: green;font-family: Georgia,serif; font-style: italic;">
          // Todo: Add search component here
        </div>
        <SimpleTable :header="Object.keys(tableData[0])" :body="tableData" :linkIndexList="[0,1,2,3]" @itemClicked="handleItemClicked"/>
        <Page show-elevator show-total  @pageClick="handleChangePage" :total="total" :current="pageNum" :page-size="pageSize" @changePage="handleChangePage" @pageSizeChange="handlePageSizeChange"/>
      </div>
    </section>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
import Options from '../../components/Paging/Options'
import {getTableNames, getDrugKVPagination} from '../../api/api'
import SimpleTable from '../../components/Table/SimpleTable'
import Page from '../../components/Paging/Paging'
export default {
  name: 'synergyScore',
  components: {Page, SimpleTable, Options, HeaderTitle, FullPage},
  methods: {
    handleOptionsChange (table) {
      this.tableIndex = this.tables.indexOf(table) + 1
    },
    handleItemClicked (col, key, obj) {
      if (typeof col === 'number') {
        this.$router.push(`/response/${this.tableIndex}/${col}`)
      } else {
        if (key === 'drugCombination') {
          this.$router.push(`/response/${this.tableIndex}/${obj.pairIndex}`)
        } else {
          // Drug
        }
      }
    },
    updateTableData () {
      getDrugKVPagination(this.tableIndex, this.pageNum, this.pageSize).then(data => {
        this.tableData = data.page
        this.total = data.total
      })
    },
    handleChangePage (index) {
      this.pageNum = index > this.total ? this.total : Number(index)
    },
    handlePageSizeChange (current, size) {
      this.pageNum = current
      this.pageSize = size
    }
  },
  mounted () {
    getTableNames().then(data => {
      this.tables = data
      this.tableIndex = 1
    })
  },
  data () {
    return {
      tables: [],
      tableIndex: -1,
      tableData: [],
      total: -1,
      pageNum: 1,
      pageSize: 10
    }
  },
  watch: {
    tableIndex () {
      this.updateTableData()
    },
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
    .content{
      padding-left: 10px;
    }
  }
</style>
