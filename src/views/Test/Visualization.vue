<template>
  <div>
    <div id="container">
      <BarChart/>
    </div>
  </div>
</template>

<script>
import BarChart from '../../components/Visualization/BarChart'
export default {
  name: 'Visualization',
  components: {BarChart}
}
</script>

<style scoped>
  #container{
    padding-top: 60px;
  }
</style>
