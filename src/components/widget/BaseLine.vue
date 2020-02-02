<template>
  <div style="width:100%;height:100%" ref="baseLine" />
</template>
<script>
import { isEmpty, cloneDeep } from 'lodash'
import { Line } from '@antv/g2plot'
import { baseLine } from './BaseConfig'
export default {
  name: 'BaseLine',
  props: {
    customConfig: {
      type: Object,
      default: () => { }
    },
    theme: String
  },
  data () {
    return {}
  },
  created () {
    this.config = cloneDeep(baseLine)
    this.chartObj = null
    this.mergeConfig()
  },
  mounted () {
    this.drawChart()
  },
  methods: {
    mergeConfig () {
      if (!isEmpty(this.customConfig)) {

      }
    },
    drawChart () {
      this.chartObj = new Line(this.$refs.baseLine, this.config)
      this.chartObj.render()
    },
    updateConfig () {
      this.mergeConfig()
      this.chartObj.render()
    },
    getData () {

    }
  },
  destroyed () {
    this.chartObj.destroy()
  }
}
</script>
