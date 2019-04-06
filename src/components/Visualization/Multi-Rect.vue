<template>
  <div class="multi-rect"></div>
</template>

<script>
import {charts} from '../../mixins/charts'
import * as d3 from 'd3'
export default {
  name: 'Multi-Rect',
  mixins: [charts],
  mounted () {
    // 数据应当从后台获取
    let data = this.data
    data = this.sort(data)
    const canvas = this.initChart(d3, '.multi-rect')
    const colorScale = d3.scaleLinear().domain([0, Math.max.apply(null, data.map(item => item.response))]).range(['red', '#002000'])
    const width = this.width - 70
    const height = this.height - 50
    const concRow = data[0].concRow
    const concCol = data[0].concCol
    const colNumber = data.reduce((t, c) => {
      return c.concRow === concRow ? t + 1 : t
    }, 0)
    const rowNumber = data.reduce((t, c) => {
      return c.concCol === concCol ? t + 1 : t
    }, 0)

    // 添加坐标系
    const xLineData = d3.range(colNumber)
    const yLineData = d3.range(rowNumber)
    const xAxis = canvas.append('g').selectAll('line').data(xLineData)
      .enter()
    xAxis.append('line')
      .attr('x1', (d, i) => i % colNumber * width / colNumber + 29 + width / colNumber / 2)
      .attr('y1', 20)
      .attr('x2', (d, i) => i % colNumber * width / colNumber + 29 + width / colNumber / 2)
      .attr('y2', 29)
      .attr('stroke', 'black')

    xAxis.append('text')
      .attr('fill', 'black')
      .style('font-size', '16px')
      .attr('x', (d, i) => i % colNumber * width / colNumber + 29 + width / colNumber / 2)
      .attr('dx', '-10')
      .attr('y', 19)
      .text((d, i) => data[i].concCol.toFixed(1))

    const yAxis = canvas.append('g').selectAll('line').data(yLineData)
      .enter()

    yAxis.append('line')
      .attr('x1', 20)
      .attr('y1', (d, i) => i % rowNumber * height / rowNumber + 29 + height / rowNumber / 2)
      .attr('x2', 30)
      .attr('y2', (d, i) => i % rowNumber * height / rowNumber + 29 + height / rowNumber / 2)
      .attr('stroke', 'black')
      .attr('transform', 'translate(9,0)')

    yAxis.append('text')
      .attr('fill', 'black')
      .style('font-size', '16px')
      .attr('x', 0)
      .attr('dy', '5')
      .attr('y', (d, i) => i % rowNumber * height / rowNumber + 29 + height / rowNumber / 2)
      .text((d, i) => data[i * rowNumber].concRow.toFixed(1))

    // 添加矩形网格
    const g = canvas.append('g').selectAll('rect').data(data)
      .enter()
      .append('g')
      .attr('transform', 'translate(39, 29)')
    g.append('rect')
      .attr('width', width / colNumber)
      .attr('height', height / rowNumber)
      .attr('x', (d, i) => i % colNumber * width / colNumber)
      .attr('y', (d, i) => Number.parseInt(i / rowNumber + '') * height / rowNumber)
      .attr('fill', d => colorScale(d.response))

    g.append('text')
      .attr('fill', 'white')
      .style('font-size', '16px')
      .attr('x', (d, i) => i % colNumber * width / colNumber + width / (colNumber * 4))
      .attr('y', (d, i) => Number.parseInt(i / rowNumber + '') * height / rowNumber + height / (rowNumber * 2))
      .text(d => d.response)

    g.on('mouseover', function (d) {
      d3.select(this).select('rect').attr('fill', 'orange')
    })

    g.on('mouseout', function (d) {
      d3.select(this).select('rect').attr('fill', colorScale(d.response))
    })

    // 添加药物对名称
    canvas.append('g').append('text')
      .attr('font-size', '16px')
      .attr('fill', 'black')
      .attr('transform', `translate(${width + 60},${height / 2}) rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(data[0].drugRowName + ' (' + data[0].concColUnit + ')')

    canvas.append('g').append('text')
      .attr('font-size', '16px')
      .attr('fill', 'black')
      .attr('transform', `translate(${width / 3},${height + 50})`)
      .text(data[0].drugColName + ' (' + data[0].concColUnit + ')')
  },
  methods: {
    /**
     * 将data中的数据按照row col浓度排序
     * @param data
     */
    sort (data) {
      return data.sort((pre, next) => {
        const ret = pre.concRow - next.concRow
        if (ret === 0) {
          return pre.concCol - next.concCol
        }
        return ret
      })
    }
  }
}
</script>

<style scoped>

</style>
