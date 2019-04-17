<template>
  <FullPage>
    <section class="synergy-score-container">
      <div>
        <HeaderTitle>
          Drug-Combinations
        </HeaderTitle>
        <div class="content">
          <div style="padding: 10px;">
            <Search :value="keyword" @search="handleSearch"/>
            <div class="search-tips">
              <ul>
                <li>single drug</li>
                <li>complex drugs</li>
              </ul>
            </div>
          </div>
          <template v-if="tableData.length">
              <SimpleTable :header="Object.keys(tableData[0])" :body="tableData" :linkIndexList="[2,3,4,5]" @itemClicked="handleItemClicked"/>
              <Page show-elevator show-total  @pageClick="handleChangePage" :total="total" :current="pageNum" :page-size="pageSize" @changePage="handleChangePage" @pageSizeChange="handlePageSizeChange"/>
              <div class="table-tips">
                <HeaderTitle>
                  Tips
                </HeaderTitle>
                <ul>
                  <li>Clicking Single <code>Drug</code> item will jump to drug information detail page.</li>
                  <li>Clicking <code>CellName</code> can get more information about cell line and disease.</li>
                  <li>Clicking <code>SynergyScore</code> will get response matrix with popup dialog.</li>
                </ul>
                <HeaderTitle>
                  Explanation
                </HeaderTitle>
                <ul>
                  <li><code>SynergyScore</code> represents ......</li>
                  <li><code>MostSynergisticAreaScore</code> represents ......</li>
                </ul>
              </div>
          </template>
          <div class="not-found" v-else>
            <img src="" alt="">
            <p>
              No Results.
            </p>
          </div>
        </div>
      </div>
    </section>
    <Dialog v-if="showResponseMatrix" @closeDialog="showResponseMatrix = false">
      <Response :blockId="blockId"/>
    </Dialog>
    <Dialog v-if="showCellLineDialog" @closeDialog="showCellLineDialog = false">
      <!--  Todo:收集细胞系的gene expressions    -->
      <p>显示细胞系相关数据</p>
    </Dialog>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
import Options from '../../components/Paging/Options'
import {getDrugIntegrationPages, searchDrugPages} from '../../api/api'
import SimpleTable from '../../components/Table/SimpleTable'
import Page from '../../components/Paging/Paging'
import Search from '../../components/Header/Search'
import Dialog from '../../components/Dialog/Dialog'
import Response from '../response/response'
export default {
  name: 'synergyScore',
  components: {Response, Dialog, Search, Page, SimpleTable, Options, HeaderTitle, FullPage},
  methods: {
    handleSearch (keyword) {
      if (keyword !== this.keyword) {
        this.keyword = keyword
        this.pageNum = 1
        this.updateTableData()
      }
    },
    handleItemClicked (col, key, obj) {
      switch (key.toLowerCase()) {
        case 'drug1':
        case 'drug2':
          this.$router.push(`/drugDetail?drugName=${encodeURIComponent(col.trim())}`)
          break
        case 'cellname':
          this.showCellLineDialog = true
          break
        case 'synergyscore':
          this.blockId = obj.id
          this.showResponseMatrix = true
          break
        default:
          break
      }
    },
    updateTableData () {
      if (this.keyword === '') {
        getDrugIntegrationPages(this.pageNum, this.pageSize).then(data => {
          if (data.total) {
            this.tableData = data.page
            this.total = data.total
          } else {
            this.$message('Not Found')
          }
        })
      } else {
        searchDrugPages(this.keyword, this.pageNum, this.pageSize).then(data => {
          if (data.total) {
            this.tableData = data.page
            this.total = data.total
          } else {
            this.$message('Not Found')
          }
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
  mounted () {
    this.keyword = this.$route.query.q || this.keyword
    this.updateTableData()
  },
  data () {
    return {
      tables: [],
      tableData: [],
      total: -1,
      pageNum: 1,
      pageSize: 10,
      keyword: '',
      blockId: -1,
      showResponseMatrix: false,
      showCellLineDialog: false
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
  @import "../../assets/style/main";
  .synergy-score-container{
    margin-top: 5px;
    padding: 15px 30px;
    min-height: calc(100vh - 75px);
    text-align: left;
    background: #ffffff;

    &>div{
      width: 1000px;
      margin: 0 auto;
      height: 100%;
    }
    .content{
      padding-left: 10px;

      .search-tips{
        padding: 10px 0;
      }
      .table-tips{
        margin-top: 10px;
      }
      ul{
        color: #333;
        font-size: 14px;
        line-height: 1.5em;
        li{
          font-style: italic;
          position: relative;
          padding-left: 20px;
          margin: 10px 0;
          code{
            padding: 3px;
            font-weight: 400;
            font-style: normal;
            color: #c7254e;
            background-color: #f9f2f4;
            border-radius: 2px;
          }
          &:before{
            content: '';
            background: @theme-color;
            width: 5px;
            height: 2px;
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translate(0,-50%);
          }
        }
      }
    }
    .not-found{
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
</style>
