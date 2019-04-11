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
      <td :class="{'link': headerLinkKeys.includes(key)}" v-for="(col, key) in row" :key="key+ 'a' +index" @click="handleItemClick(col, headerLinkKeys.includes(key))">{{col ? col : 'Null'}}</td>
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
  @import "../../assets/style/main";
  @table-color: #f7f7f7;
  @table-border-color: #dadde3;
  table{
    font-family: Consolas,Menlo,Courier,monospace;
    font-size: 12px;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid @table-border-color;
    width: 100%;
    margin-bottom: 24px;
    tr,td{
      transition: all 0.3s;
    }
    tr:hover{
      background: @table-color;
      &>td{
        border-color: @table-color;
      }
    }
    th{
      background: @table-color;
      color: #5c6b77;
      font-weight: 600;
      cursor: default;
      text-transform: uppercase;
    }
    th,td{
      border: 1px solid @table-border-color;
      padding: 8px 16px;
      text-align: left;
    }

    .link{
      color: @theme-color;
      cursor: default;
      &:hover{
        text-decoration: underline;
      }
    }

    .title-container{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img{
        margin-left: 5px;
      }
    }
  }

</style>
