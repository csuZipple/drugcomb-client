<template>
  <span>{{easingNumber | toFixed(0)}}</span>
</template>

<script>
export default {
  name: 'EaseNumber',
  props: {
    number: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.easingNumber = this.number
  },
  methods: {
    handleNumberChange (n) {
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        let oldEasingNumber = this.easingNumber
        if (Math.abs(Math.round(n - oldEasingNumber)) <= 0.1) {
          this.easingNumber = n
          clearInterval(this.timer)
          return
        }
        let space = String(Math.abs(Math.round(n - oldEasingNumber))).length
        let step = Math.pow(10, space - 2)
        this.easingNumber += n > oldEasingNumber ? step : -step
      }, 10)
    }
  },
  data () {
    return {
      easingNumber: 0,
      timer: null,
      step: 1
    }
  },
  watch: {
    number (n) {
      this.handleNumberChange(n)
    }
  }
}
</script>

<style scoped>

</style>
