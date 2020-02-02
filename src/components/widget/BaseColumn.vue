<template>
  <div style="width:100%;height:100%" ref="baseColumn" />
</template>
<script>
import { isEmpty, cloneDeep } from 'lodash'
import { Column } from '@antv/g2plot'
import { baseColumn } from './BaseConfig'
export default {
  name: 'BaseColumn',
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
    this.config = cloneDeep(baseColumn)
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
      this.chartObj = new Column(this.$refs.baseColumn, this.config)
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
