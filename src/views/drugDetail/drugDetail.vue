<template>
  <FullPage>
    <section class="drug-info-container">
      <div>
        <HeaderTitle>
          Drug-Detail-Information
        </HeaderTitle>
        <div class="drug-info">
          <template v-if="drugProteinLinks">
            <DrugProteinNetworks :drugProteinLinks="drugProteinLinks"/>
          </template>
        </div>
      </div>
    </section>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
import {getDrugInfoByDrugName, getDrugProteinLinksInformation} from '../../api/api'
import DrugProteinNetworks from '../../components/Visualization/DrugProteinNetworks'
export default {
  name: 'drugDetail',
  components: {DrugProteinNetworks, HeaderTitle, FullPage},
  mounted () {
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
          console.log('获取药物蛋白质蛋白质信息..', data)
          // Todo: 需要对数据进行去重
          this.drugProteinLinks = data
        })
      })
    }
  },
  data () {
    return {
      drugInfo: null,
      drugName: '',
      drugProteinLinks: null
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
    }
  }
</style>
