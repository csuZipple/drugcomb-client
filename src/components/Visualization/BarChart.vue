<template>
  <div class="bar-chart"></div>
</template>

<script>
import * as d3 from 'd3'
import {charts} from '../../mixins/charts'
export default {
  name: 'BarChart',
  mixins: [charts],
  props: {
    margin: {
      type: Number,
      default: 10
    },
    data: {
      type: Array,
      default () {
        return [10, 20, 30, 50, 10, 20, 80, 10, 22]
      }
    }
  },
  mounted () {
    const barHeight = ((this.height - 20) / this.data.length) - this.margin // 20 is axis height
    if (barHeight < 10) throw new Error('height is too small')
    const canvas = this.initChart(d3, '.bar-chart')
    const widthScale = d3.scaleLinear().domain([0, Math.max.apply(null, this.data)]).range([0, this.width - 80])
    const colorScale = d3.scaleLinear().domain([0, Math.max.apply(null, this.data)]).range(['red', 'blue'])

    const axis = d3.axisBottom(widthScale).ticks(20, 's')

    canvas.append('g').selectAll('rect').data(this.data)
      .enter()
      .append('rect')
      .attr('width', d => widthScale(d))
      .attr('height', barHeight)
      .attr('y', (d, i) => i * (barHeight + this.margin))
      .attr('fill', d => colorScale(d))

    canvas.append('g').attr('transform', `translate(0,${this.data.length * (barHeight + this.margin)})`).call(axis)

    canvas.append('g').selectAll('text').data(this.data)
      .enter()
      .append('text')
      .attr('fill', 'black')
      .style('font-size', '16px')
      .attr('x', d => widthScale(d) + 10)
      .attr('y', (d, i) => i * (barHeight + this.margin) + barHeight / 2)
      .text(d => d)
  }
}
</script>

<style scoped>

</style>
