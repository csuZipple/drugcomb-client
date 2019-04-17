<template>
  <div class="mask" @click="closeDialog">
    <div class="dialog" @click.stop>
      <header>
        <div>
          <slot name="title"></slot>
        </div>
        <img title="close dialog" @click.stop="closeDialog" src="../../assets/icon/close.png" alt="close btn">
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="less" scoped>
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 19;

    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);

    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.35s;
    animation: scaleIn 0.5s forwards;
    transform: scale(0);

    .dialog{
      height: 90%;
      overflow: auto;
      padding: 10px 30px;
      background: #ffffff;
      border: 1px solid #f3f3f3;
      box-shadow: 0 30px 30px -10px rgba(33,71,109,0.3), 0 0 20px -2px rgba(15,81,148,0.2);
      transition: all 0.35s;
      opacity: 0;
      animation: fadeIn 0.5s forwards;
      animation-delay: 0.2s;
      &>header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          float: right;
          transition: all 0.3s;
          &:hover{
            transform: rotate(360deg);
          }
        }
        &>div{
          width: calc(100% - 60px);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  @keyframes scaleIn {
    0%{

    }
    100%{
      transform: scale(1);
    }
  }
  @keyframes scaleOut {
    0%{

    }
    100%{
      transform: scale(0);
    }
  }
</style>
