export const charts = {
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    data: {
      type: Object
    }
  },
  methods: {
    initChart (instance, container) {
      return instance.select(container)
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
    }
  }
}
