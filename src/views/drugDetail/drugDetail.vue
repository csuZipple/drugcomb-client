<template>
  <FullPage>
    <section class="drug-info-container">
      <div>
        <HeaderTitle>
          Drug-Detail-Information
        </HeaderTitle>
        <div class="drug-info">
          <template v-if="drugProteinLinks && drugProteinLinks.links.length">
            <DrugProteinNetworks :drugProteinLinks="drugProteinLinks"/>
            <HeaderTitle>
              Proteins's ID
            </HeaderTitle>
            <ul style="padding: 10px 0;">
              <li v-if="index !== 0" v-for="(item, index) in drugProteinLinks.nodes" :key="index">{{item.id}}</li>
            </ul>
            <p style="color: #2b85e4; font-style: italic; font-family: Georgia, serif">
              Will fill the protein data soon...
            </p>
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
      &>div{
        padding-left: 30px;
      }
    }
  }
</style>
