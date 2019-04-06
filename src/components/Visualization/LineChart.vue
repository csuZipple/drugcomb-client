<template>
    <div class="line-chart"></div>
</template>

<script>
import {charts} from '../../mixins/charts'
import * as d3 from 'd3'
export default {
  name: 'LineChart',
  mixins: [charts],
  data () {
    return {
      lines: [100, 150, 300, 450, 100, 320]
    }
  },
  mounted () {
    const canvas = this.initChart(d3, '.line-chart')
    const colorScale = d3.scaleLinear().domain([0, Math.max.apply(null, this.lines)]).range(['red', 'blue'])
    const heightScale = d3.scaleLinear().domain([0, Math.max.apply(null, this.lines)]).range([0, 370])
    const widthScale = d3.scaleLinear().domain([0, 370]).range([0, 370])

    canvas.append('g').selectAll('circle').data(this.lines)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => 10 + 60 * i)
      .attr('cy', d => heightScale(d))
      .attr('r', 3)
      .attr('fill', d => colorScale(d))
      // add hover event
    const axisBottom = d3.axisBottom(widthScale).ticks(20, 's')
    const axisLeft = d3.axisLeft(heightScale).ticks(20, 's')
    canvas.append('g').attr('transform', `translate(10,450)`).call(axisBottom)
  }
}
</script>

<style scoped>

</style>
