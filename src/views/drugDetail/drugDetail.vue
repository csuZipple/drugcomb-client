<template>
  <FullPage>
    <HeaderTitle>
      Drug Info
    </HeaderTitle>
    <div class="drug-info">
      //Todo: get drug info detail...
    </div>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
import {getDrugInfoByDrugName} from '../../api/api'
export default {
  name: 'drugDetail',
  components: {HeaderTitle, FullPage},
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
      })
    }
  },
  data () {
    return {
      drugInfo: null,
      drugName: ''
    }
  }
}
</script>

<style scoped>

</style>
