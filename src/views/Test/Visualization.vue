<template>
  <div>
    <div id="container">
      <LineChart/>
    </div>
  </div>
</template>

<script>
import LineChart from '../../components/Visualization/LineChart'
export default {
  name: 'Visualization',
  components: {LineChart}
}
</script>

<style scoped>
  #container{
    padding-top: 60px;
  }
</style>
