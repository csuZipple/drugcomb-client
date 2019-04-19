<template>
  <div class="drug-protein-container">
    <svg :width="width" :height="height">
      <defs>
        <linearGradient id="brilliance_gradient" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0" style="stop-color:#FFFFFF;stop-opacity:1;"></stop>
          <stop offset="0.1" style="stop-color:#FFFFFF;stop-opacity:0.99;"></stop>
          <stop offset="1" style="stop-color:#FFFFFF;stop-opacity:0;"></stop>
        </linearGradient>
      </defs>
      <defs >
        <filter id="filter_shadow">
          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
        </filter>
      </defs>
      <defs >
        <linearGradient id="bubble_gradient1" x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset="0.2472" style="stop-color:#FAFAFA;"></stop>
          <stop offset="0.4517" style="stop-color:#A2A2A2;"></stop>
          <stop offset="0.6785" style="stop-color:#5E5E5E;"></stop>
          <stop offset="0.8975" style="stop-color:#3C3C3C;"></stop>
          <stop offset="1" style="stop-color:#383838;"></stop>
        </linearGradient>
        <radialGradient cx="50%" cy="50%" id="bubble_gradient2" r="50%">
          <stop offset="0" style="stop-color:#FFFFFF;"></stop>
          <stop offset="0.3726" style="stop-color:#FDFDFD;"></stop>
          <stop offset="0.6026" style="stop-color:#EBEBEB;"></stop>
          <stop offset="0.7463" style="stop-color:#C4C4C4;"></stop>
          <stop offset="0.8581" style="stop-color:#888888;"></stop>
          <stop offset="0.9523" style="stop-color:#373737;"></stop>
          <stop offset="0.9926" style="stop-color:#090909;"></stop>
          <stop offset="1" style="stop-color:#000000;"></stop>
        </radialGradient>
      </defs>
    </svg>
  </div>
</template>

<script>
import {charts} from '../../mixins/charts'
import * as d3 from 'd3'
export default {
  name: 'DrugProteinNetworks',
  mixins: [charts],
  props: {
    drugProteinLinks: {
      type: Object
    }
  },
  mounted () {
    this.mountForceLayout()
  },
  methods: {
    mountForceLayout () {
      const svg = d3.select('svg')
      const width = this.width
      const height = this.height
      const graph = this.drugProteinLinks
      console.log(graph)
      const distanceScale = d3.scaleLinear().domain([0, this.maxScore]).range([0, 200])
      const simulation = d3.forceSimulation().force('link', d3.forceLink().id(d => d.id).distance(d => distanceScale(d.score)))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2))

      const link = svg.append('g')
        .selectAll('line')
        .data(graph.links)
        .enter()
        .append('line')
        .attr('stroke', '#aaa')
        .attr('stroke-width', '3px')

      const node = svg.append('g')
        .selectAll('g')
        .data(graph.nodes)
        .enter()
        .append('g')
        .attr('cursor', 'pointer')
        .call(d3.drag().on('start', d => {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        }).on('drag', d => {
          d.fx = d3.event.x
          d.fy = d3.event.y
        }).on('end', d => {
          if (!d3.event.active) simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        }))

      this.generateCircle(node)

      graph.nodes[0].fx = width / 2
      graph.nodes[0].fy = height / 2
      node.append('title').text(d => d.id)
      simulation.nodes(graph.nodes).on('tick', () => {
        link
          .attr('x1', function (d) { return d.source.x })
          .attr('y1', function (d) { return d.source.y })
          .attr('x2', function (d) { return d.target.x })
          .attr('y2', function (d) { return d.target.y })

        node.selectAll('ellipse')
          .attr('cx', function (d) { return d.x })
          .attr('cy', function (d, i) {
            return i === 0 ? d.y + 10 : d.y - 13
          })
        node.selectAll('circle')
          .attr('cx', function (d) { return d.x })
          .attr('cy', function (d) { return d.y })
      })
      simulation.force('link').links(graph.links)
    },
    generateCircle (g) {
      const radius = 20
      g.append('ellipse')
        .attr('rx', 19)
        .attr('ry', 14)
        .attr('opacity', 0.6)
        .attr('fill', '#000000')
        .attr('filter', 'url(#filter_shadow)')
      g.append('circle')
        .attr('r', radius)
        .attr('fill', 'url(#bubble_gradient1)')
      g.append('circle')
        .attr('r', radius)
        .attr('opacity', 0.33)
        .attr('fill', 'url(#bubble_gradient2)')
        .on('mouseover', function () {
          d3.select(this).attr('opacity', 0)
        })
        .on('mouseout', function () {
          d3.select(this).attr('opacity', 0.33)
        })
      g.append('circle')
        .attr('r', radius)
        .attr('opacity', 0.4)
        .attr('pointer-events', 'none')
        .attr('fill', () => {
          return this.getRandomColor()
        })
      g.append('ellipse')
        .attr('rx', 11.5)
        .attr('ry', 6)
        .attr('fill', 'url(#brilliance_gradient)')
    },
    getRandomColor () {
      return 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')'
    }
  },
  computed: {
    maxScore () {
      let ret = this.drugProteinLinks.links[0].score
      this.drugProteinLinks.links.forEach(item => {
        if (item.score >= ret) {
          ret = item.score
        }
      })
      return ret
    }
  }
}
</script>

<style lang="less" scoped>

</style>
