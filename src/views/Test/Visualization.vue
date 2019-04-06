<template>
  <div>
    <div id="container">
      <input type="number" @blur="request" v-model="blockId" title="">
      <template v-if="drugKV">
        <MultiRect :data="drugKV"/>
      </template>
    </div>
  </div>
</template>

<script>
import MultiRect from '../../components/Visualization/Multi-Rect'
import {getDrugKVByBlockId} from '../../api/api'
export default {
  name: 'Visualization',
  components: {MultiRect},
  data () {
    return {
      drugKV: null,
      blockId: -1
    }
  },
  methods: {
    async request () {
      let data = await getDrugKVByBlockId(1, this.blockId)
      this.drugKV = null
      this.$nextTick(() => {
        this.drugKV = data
      })
    }
  }
}
</script>

<style scoped>
  #container{
    padding-top: 60px;
  }
  input{
    border: 1px solid;
  }
</style>
