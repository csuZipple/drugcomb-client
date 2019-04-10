<template>
  <div class="page-elevator">跳至 <input title="" @blur="handleBlur" @keyup.enter="handleBlur" type="text" autocomplete="off" spellcheck="false">页</div>
</template>

<script>
export default {
  name: 'Elevator',
  methods: {
    handleBlur (e) {
      let value = e.target.value
      if (value === '') {
        return
      }
      let page = value.replace(/\D/g, '')
      if (page !== '') {
        this.$emit('changeTo', page)
        e.target.value = ''
      } else {
        this.$message({
          type: 'warn',
          text: '请输入合法的页数'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .page-elevator{
    display: inline-block;
    vertical-align: middle;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #515a6e;
    input{
      display: inline-block;
      height: 32px;
      line-height: 1.5;
      padding: 4px 7px;
      font-size: 12px;
      border: 1px solid #dcdee2;
      color: #515a6e;
      background: #fff none;
      position: relative;
      cursor: text;
      transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
      border-radius: 4px;
      margin: 0 8px;
      width: 50px;

      &:focus{
        border-color: #57a3f3;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(45,140,240,.2);
      }
    }
  }
</style>
