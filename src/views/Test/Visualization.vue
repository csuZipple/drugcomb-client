<template>
  <div>
    <div>
      origin data: {{data}}
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Visualization',
  mounted () {
    const width = 500
    const height = 500
    const barHeight = 50
    const barAndMarginHeight = 60
    const widthScale = d3.scaleLinear().domain([0, Math.max.apply(null, this.data)]).range([0, width - 80])
    const colorScale = d3.scaleLinear().domain([0, Math.max.apply(null, this.data)]).range(['red', 'blue'])

    const axis = d3.axisBottom(widthScale).ticks(20, 's')
    const canvas = d3.select('#container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    canvas.append('g').selectAll('rect').data(this.data)
      .enter()
      .append('rect')
      .attr('width', d => widthScale(d))
      .attr('height', barHeight)
      .attr('y', (d, i) => i * barAndMarginHeight)
      .attr('fill', d => colorScale(d))

    canvas.append('g').attr('transform', `translate(0,${this.data.length * barAndMarginHeight})`).call(axis)

    canvas.append('g').selectAll('text').data(this.data)
      .enter()
      .append('text')
      .attr('fill', 'black')
      .style('font-size', '16px')
      .attr('x', d => widthScale(d) + 10)
      .attr('y', (d, i) => i * barAndMarginHeight + barHeight / 2)
      .text(d => d)
  },
  methods: {

  },
  data () {
    return {
      data: [30, 80, 160, 50, 70, 80]
    }
  }
}
</script>

<style scoped>
  #container{
    padding-top: 60px;
  }
</style>
