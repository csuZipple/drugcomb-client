<template>
  <div>
    <li v-for="n in cellname" v-bind:key="n">
     <!-- <input type="checkbox" name={{n}} id={{n}} v-model="checkedNames">
      <label for="{{n}}">{{n}}</label> -->
      <input type="checkbox" v-model="checkedNames">{{n}}
    </li>
    <div>
      <input type="checkbox" name="Jack" id="jack" value="Jack" v-model="checkedNames">
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="checkedNames">
      <label for="john">John</label>
      <input type="checkbox" id="m" value="Mke" v-model="checkedNames">
      <label for="m">Mike</label>
      <br>
      <span>Checked names: {{ checkedNames }}</span>
    </div>
  </div>
</template>
<script>// new Vue({el: '#example-3', data: {checkedNames: []}})

export default {
  name: 'selectCellName',
  props: {
    cellname: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleSearch () {
      console.log('调用了handleSearch的方法')
      this.$emit('getSelectCellName', this.checkedNames)
    }
  },
  mounted () {
    this.handleSearch()
  },
  data () {
    return {
      checkedNames: [],
      selected: ''
    }
  }
}
</script>

<style scoped>

</style>
