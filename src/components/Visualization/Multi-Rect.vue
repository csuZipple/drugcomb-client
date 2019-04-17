<template>
  <div class="rect-container">
    <div class="tab">
      <div @click="showZip = true" :class="{'active': showZip}">Response</div>
      <div @click="showZip = false" :class="{'active': !showZip}">Δ Bliss</div>
    </div>
    <div class="multi-rect"></div>
    <div class="btn-container">
      Save as <button class="primary" @click="saveAsPNG">PNG</button> <button class="success" @click="saveAsJPEG">JPEG</button>
    </div>
  </div>

</template>

<script>
import {charts} from '../../mixins/charts'
import {covertSVG2Image} from '../../utils/download'
import * as d3 from 'd3'
export default {
  name: 'Multi-Rect',
  mixins: [charts],
  props: {
    data: {
      type: Array
    }
  },
  mounted () {
    this.mountSVG()
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
    },
    mountSVG (key = this.key, topColor = '#002000') {
      d3.select('svg').remove()
      let data = this.sort(this.data)
      const canvas = this.initChart(d3, '.multi-rect')
      const colorScale = d3.scaleLinear().domain([0, Math.max.apply(null, data.map(item => item.response))]).range(['red', topColor])
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
        .attr('fill', d => colorScale(d[key]))

      g.append('text')
        .attr('fill', 'white')
        .style('font-size', '16px')
        .attr('x', (d, i) => i % colNumber * width / colNumber + width / (colNumber * 4))
        .attr('y', (d, i) => Number.parseInt(i / rowNumber + '') * height / rowNumber + height / (rowNumber * 2))
        .text(d => d[key])

      g.on('mouseover', function (d) {
        d3.select(this).select('rect').attr('fill', 'orange')
      })

      g.on('mouseout', function (d) {
        d3.select(this).select('rect').attr('fill', colorScale(d[key]))
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
    saveAsPNG () {
      covertSVG2Image(document.querySelector('.multi-rect').querySelector('svg'), this.data[0].drugRowName + '-' + this.data[0].drugColName, this.width, this.height)
    },
    saveAsJPEG () {
      covertSVG2Image(document.querySelector('.multi-rect').querySelector('svg'), this.data[0].drugRowName + '-' + this.data[0].drugColName, this.width, this.height, 'jpeg')
    }
  },
  data () {
    return {
      showZip: true,
      key: 'response'
    }
  },
  watch: {
    showZip (n) {
      const key = n ? 'response' : 'blissScore'
      const topColor = n ? '#002000' : 'rgb(192, 220, 235)'
      this.mountSVG(key, topColor)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  .rect-container{
    display: inline-block;
  }
  .tab{
    margin: 5px 35px;
    border-bottom: 1px solid #ddd;
    display: flex;
    div{
      height: 45px;
      background: #ffffff;
      padding: 8px 15px;
      color: @theme-color;
      margin-bottom: -1px;
      border-bottom: 1px solid #ddd;

      display: flex;
      align-items: center;
      justify-content: center;
    }
    .active{
      color: #000;
      border: 1px solid #ddd;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom: none;
    }
  }
  .btn-container{
    margin-top: 20px;
  }
  .success{
    color: #fff;
    background-color: #19be6b;
    border-color: #19be6b;
    margin-left: 10px;
  }
  .success:active{
    background-color: #09be68;
    border-color: #09be68;
  }
  .primary{
    margin-left: 10px;
    color: #fff;
    background-color: #2d8cf0;
    border-color: #2d8cf0;
  }
  .primary:active{
    background-color: #2b85e4;
    border-color: #2b85e4;
  }
  button{
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 5px 15px 6px;
    font-size: 12px;
    border-radius: 4px;
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
    color: #515a6e;
    background: #fff none;
    border: 1px solid #dcdee2;
  }
  button:focus{
    outline: none;
  }
</style>
