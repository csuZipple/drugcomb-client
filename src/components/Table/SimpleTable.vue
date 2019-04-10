<template>
  <table>
    <tr>
      <th v-for="(item, index) in header" :key="index">
        <div class="title-container" @click="sortData(item, typeof body[0][item] === 'number')">
          <span>{{item}}</span>
          <img v-if="typeof body[0][item] === 'number'" src="../../assets/icon/sort.png"  alt="">
        </div>
      </th>
    </tr>
    <tr v-for="(row, index) in body" :key="index">
      <td :class="{'link': headerLinkKeys.includes(key)}" v-for="(col, key) in row" :key="key+ 'a' +index" @click="handleItemClick(col, headerLinkKeys.includes(key))">{{col}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'SimpleTable',
  props: {
    header: {
      type: Array,
      default () {
        return []
      }
    },
    linkIndexList: {
      type: Array,
      default () {
        return [4, 5]
      }
    },
    body: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleItemClick (col, flag) {
      if (flag) {
        this.$emit('itemClicked', col)
      }
    },
    sortData (key, flag) {
      if (flag) {
        if (this.body[0][key] <= this.body[1][key]) {
          this.$emit('sort', this.body.sort((pre, next) => {
            return next[key] - pre[key]
          }))
        } else {
          this.$emit('sort', this.body.sort((pre, next) => {
            return pre[key] - next[key]
          }))
        }
      }
    }
  },
  computed: {
    headerLinkKeys () {
      return this.header.filter((item, index) => this.linkIndexList.includes(index))
    }
  }
}
</script>

<style lang="less" scoped>
  table{
    font-family: Consolas,Menlo,Courier,monospace;
    font-size: 12px;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #e9e9e9;
    width: 100%;
    margin-bottom: 24px;
    tr,td{
      transition: all 0.3s;
    }
    tr:hover{
      background: #f7f7f7;
      &>td{
        border-color: #f7f7f7;
      }
    }
    th{
      background: #f7f7f7;
      white-space: nowrap;
      color: #5c6b77;
      font-weight: 600;
      cursor: default;
    }
    th,td{
      border: 1px solid #e9e9e9;
      padding: 8px 16px;
      text-align: left;
    }

    .link{
      color: #2d8cf0;
      cursor: default;
      &:hover{
        text-decoration: underline;
      }
    }

    .title-container{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

</style>
