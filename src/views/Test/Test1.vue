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

    <SimpleTable :header="header" :body="body" @itemClicked="handleItemClick" @sort="handleSort"/>
    <Page @pageClick="handleChangePage" :total="total" :current="current" :page-size="pageSize" @pageSizeChange="handlePageSizeChange"></Page>

  </div>
</template>

<script>
import {getOriginName, getDrugCombPagination} from '../../api/api'
import Page from '../../components/Paging/Paging'
import SimpleTable from '../../components/Table/SimpleTable'

export default {
  name: 'Test1',
  components: {SimpleTable, Page},
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
    handlePageSizeChange (current, size) {
      this.current = current
      this.pageSize = size
    },
    handleSort (newBody) {
      this.body = newBody
    },
    handleItemClick (item) {
      console.log(item)
    }
  },
  data () {
    return {
      current: 1,
      total: 100,
      pageSize: 10,
      body: [{
        'id': 1,
        'blockId': 1,
        'row': 1,
        'col': 1,
        'drugRowName': 'Thioguanine',
        'drugColName': 'Chlorambucil',
        'concRow': 0,
        'concCol': 0,
        'concRowUnit': 'uM',
        'concColUnit': 'uM',
        'response': 100
      },
      {
        'id': 2,
        'blockId': 1,
        'row': 1,
        'col': 2,
        'drugRowName': 'Thioguanine',
        'drugColName': 'Chlorambucil',
        'concRow': 0,
        'concCol': 1,
        'concRowUnit': 'uM',
        'concColUnit': 'uM',
        'response': 101.37
      },
      {
        'id': 3,
        'blockId': 1,
        'row': 1,
        'col': 3,
        'drugRowName': 'Thioguanine',
        'drugColName': 'Chlorambucil',
        'concRow': 0,
        'concCol': 10,
        'concRowUnit': 'uM',
        'concColUnit': 'uM',
        'response': 94.95
      },
      {
        'id': 4,
        'blockId': 1,
        'row': 1,
        'col': 4,
        'drugRowName': 'Thioguanine',
        'drugColName': 'Chlorambucil',
        'concRow': 0,
        'concCol': 100,
        'concRowUnit': 'uM',
        'concColUnit': 'uM',
        'response': 27.143
      }],
      header: ['id', 'blockId', 'row', 'col', 'drugRowName', 'drugColName', 'concRow', 'concCol', 'concRowUnit', 'concColUnit', 'response']
    }
  }
}
</script>

<style scoped>

</style>
