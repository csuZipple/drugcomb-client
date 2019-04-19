<template>
  <div class="search-wrapper">
    <input ref="input" :value="value" type="search" @keyup.enter="handleSearch" title="search" placeholder="Search Drug ...">
    <button @click="handleSearch">Search</button>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    value: String
  },
  methods: {
    handleSearch () {
      this.$emit('search', String(this.$refs.input.value).trim())
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  .search-wrapper{
    height: 35px;
    input{
      height: 100%;
      padding: 0 12px;
      border-radius: 5px;
      border: 1px solid @border-color;
      margin-right: 5px;
      transition: all 0.3s;

      &:focus{
        border-color: @input-focus-color;
        box-shadow: 0 0 0 2px rgba(45,140,240,.2);
      }
    }
    button{
      .btn();
      height: 100%;
    }
  }
</style>
