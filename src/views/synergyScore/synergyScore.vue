<template>
  <FullPage>
    <section class="synergy-score-container">
      <div>
        <HeaderTitle>
          Drug Combinations
        </HeaderTitle>
        <div class="content">
          <div style="padding: 10px;">
            <Search before-text="Input drug name(s):" @input="handleInput" :tips="tips" :value="keyword" @search="handleSearch"/>
            <!--            <div class="search-tips">-->
            <!--              <ul class="line">-->
            <!--                <li>single drug <span v-if="keyword.split(' - ').length <= 1 && keyword !== ''">: &nbsp;<code >{{ keyword}}</code></span></li>-->
            <!--                <li>drug combination<span v-if="keyword.split(' - ').length > 1">: &nbsp;<code >{{ keyword}}</code></span></li>-->
            <!--              </ul>-->
            <!--            </div>-->
          </div>
          <template v-if="tableData.length">
            <SimpleTable :header="Object.keys(tableData[0])" :body="tableData" :linkIndexList="[2,3,5]" @itemClicked="handleItemClicked"/>
            <Page show-elevator show-total  @pageClick="handleChangePage" :total="total" :current="pageNum" :page-size="pageSize" @changePage="handleChangePage" @pageSizeChange="handlePageSizeChange"/>
            <div class="table-tips">
              <HeaderTitle>
                Tips
              </HeaderTitle>
              <ul class="line">
                <li>Clicking Single <code>Drug</code> item will jump to drug information detail page.</li>
                <li>Clicking <code>CellName</code> can get more information about cell line and disease.</li>
                <li>Clicking <code>SynergyScore</code> will get response matrix with popup dialog. <code>SynergyScore</code> represents the synergistic or antagonistic effect between the pair of drug combinations. Formally, the drug combinations with score greater than 0 are classified as synergistic ones, otherwise antagonistic ones.</li>
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
        <CellLine/>
    </Dialog>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
import Options from '../../components/Paging/Options'
import {getDrugIntegrationPages, searchDrugPages, searchDrugCombinationByCombinationName} from '../../api/api'
import SimpleTable from '../../components/Table/SimpleTable'
import Page from '../../components/Paging/Paging'
import Search from '../../components/Header/Search'
import Dialog from '../../components/Dialog/Dialog'
import Response from '../response/response'
import CellLine from './components/cellLine'
import {throttle} from '../../utils/util'
export default {
  name: 'synergyScore',
  components: {CellLine, Response, Dialog, Search, Page, SimpleTable, Options, HeaderTitle, FullPage},
  methods: {
    handleSearch (keyword) {
      if (keyword !== this.keyword) {
        this.keyword = keyword
        this.pageNum = 1
        this.tips = [] // close tips
        this.updateTableData()
      }
    },
    handleInput (keyword) {
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
        // 判断是搜索组合药物还是搜索单个药物
        if (this.keyword.split(' - ').length > 1) {
          searchDrugCombinationByCombinationName(this.keyword, this.pageNum, this.pageSize).then(data => {
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
      showCellLineDialog: false,
      tips: [] // search tips
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
