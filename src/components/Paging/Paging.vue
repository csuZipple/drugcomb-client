<template>
  <div class="page-container">
    <span v-if="showTotal">共 {{total}} 条</span>
    <Cell :title="'上一页'" :disabled="current===1" @click.native="current > 1 && $emit('pageClick', current - 1)">&lt;</Cell><Cell v-for="(item, index) in groupList" :key="index" :active="item === current" :disabled="item==='...'" @click.native="item !== current && item !== '...' && $emit('pageClick', item)">{{item}}</Cell><Cell :title="'下一页'" :disabled="current===page" @click.native="current < page && $emit('pageClick', current + 1)">&gt;</Cell>
    <Elevator @changeTo="$emit('changePage', $event)" v-if="showElevator"/>
    <Options :options="pageSizeOpts" @pageSizeChange="pageSizeChange"/>
  </div>
</template>

<script>
import Cell from './Cell'
import Elevator from './Elevator'
import Options from './Options'
export default {
  name: 'Page',
  components: {Options, Elevator, Cell},
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOpts: {
      type: Array,
      default () {
        return [10, 20, 30, 40]
      }
    },
    showElevator: {
      type: Boolean,
      default: false
    },
    showTotal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * 生成一个从 start 到 end 的连续数组 start 和 end都需是正整数 且 start < end
     * @param start
     * @param end
     */
    generateArray (start, end) {
      return Array.from(new Array(end + 1).keys()).slice(start)
    },
    pageSizeChange (size) {
      this.$emit('pageSizeChange', Math.ceil(Math.ceil(this.total / size) * this.current / Math.ceil(this.total / this.pageSize)), size)
    }
  },
  computed: {
    page () {
      return Math.ceil(this.total / this.pageSize)
    },
    groupList () {
      let ret = []
      const pageTotal = this.page
      const before = 3 // current所在数的前三后四
      const after = 4
      const current = this.current
      if (pageTotal < before + after) {
        ret = this.generateArray(1, pageTotal)
      } else {
        if (current < before) {
          ret.push(...this.generateArray(1, before))
          ret.push('...')
          ret.push(pageTotal - 1)
          ret.push(pageTotal)
        } else if (current > this.page - after) {
          ret.push(1)
          ret.push(2)
          ret.push('...')
          ret.push(...this.generateArray(current - 1, current))
          ret.push(...this.generateArray(current + 1, pageTotal))
        } else {
          if (current - before > 1) {
            ret.push(1)
            if (current - before > 2) {
              ret.push('...')
            }
          }
          ret.push(...this.generateArray(current - before > 0 ? current - before : 1, current + after))
          if (current + after < pageTotal) {
            if (current + after < pageTotal - 1) {
              ret.push('...')
            }
            ret.push(pageTotal)
          }
        }
      }
      return ret
    }
  }
}
</script>

<style lang="less" scoped>
  .page-container{
    font-size: 12px;
    color: #515a6e;

    &>span{
      margin-right: 10px;
    }
  }
</style>
