<template>
  <div class="search-wrapper">
    <span style="padding-right: 15px;">{{beforeText}}</span>
    <div class="search-area">
      <input ref="input" spellcheck="false" :value="value" type="search" @keyup.enter="handleSearch" @input="handleInput" title="search" :placeholder="placeHolder">
      <ul class="search-tips" v-show="tips.length!==0">
        <li @click="handleSearchTipsClicked(item)" v-for="(item, index) in tips" :key="index">{{item}}</li>
      </ul>
    </div>
    <button @click="handleSearch">{{searchText}}</button>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    value: String,
    placeHolder: {
      type: String,
      default: 'Search Drug ...'
    },
    searchText: {
      type: String,
      default: 'Search'
    },
    beforeText: {
      type: String
    },
    tips: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleSearch () {
      this.$emit('search', String(this.$refs.input.value).trim())
    },
    handleInput (e) {
      this.$emit('input', e.target.value.trim())
    },
    handleSearchTipsClicked (drug) {
      this.$emit('search', drug)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  .search-wrapper{
    height: 35px;
    .search-area{
      height: 100%;
      display: inline-block;
      position: relative;
      input{
        width: 480px;
        height: 100%;
        padding: 0 12px;
        border-radius: 5px;
        border: 1px solid @border-color;
        transition: all 0.3s;

        &:focus{
          border-color: @input-focus-color;
          box-shadow: 0 0 0 2px rgba(45,140,240,.2);
        }
      }
      .search-tips {
        position: absolute;
        left: 0;
        top: 35px;
        width: 100%;
        max-height: 150px;
        overflow-y: auto;
        border: 1px solid @border-color;
        background: #FFFFFF;
        list-style: none;

        li {
          padding: 5px 10px;
          &:hover {
            background: @input-focus-color;
            color: white;
          }
        }
      }
    }
    button{
      .btn();
      height: 100%;
      margin-left: 5px;
    }
  }
</style>
