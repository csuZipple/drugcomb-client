<template>
  <div>
    <img src="../../assets/logo.png">
    <p>I am test 1</p>
    <p>
      <button @click="fetchData">fetchData1</button>
    </p>
    <p>
      <button @click="fetchData2">fetchPage</button>
    </p>
    <router-link to="/test2">GO Test 2</router-link>

    <Page @pageClick="handleChangePage" :total="total" :current="current" :page-size="pageSize" @pageSizeChange="handlePageSizeChange"></Page>
  </div>
</template>

<script>
import {getOriginName, getDrugCombPagination} from '../../api/api'
import Page from '../../components/Paging/Paging'

export default {
  name: 'Test1',
  components: {Page},
  methods: {
    fetchData () {
      getOriginName(5).then(data => {
        console.log('data', data)
      })
    },
    fetchData2 () {
      getDrugCombPagination(1, 1, 10).then(data => {
        console.log('data', data)
      })
    },
    handleChangePage (index) {
      this.current = index
    },
    handlePageSizeChange (size) {
      this.current = Math.ceil(Math.ceil(this.total / size) * this.current / Math.ceil(this.total / this.pageSize))
      this.pageSize = size
    }
  },
  data () {
    return {
      current: 1,
      total: 100,
      pageSize: 10
    }
  }
}
</script>

<style scoped>

</style>
