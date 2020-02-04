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
    id: {
      type: String,
      require: true
    },
    customConfig: {
      type: Object
    },
    theme: String
  },
  data () {
    return {}
  },
  created () {
    this.config = isEmpty(this.customConfig) ? cloneDeep(baseLine) : this.customConfig
    this.chartObj = null
  },
  mounted () {
    this.drawChart()
    this.$EventBus.$on('updateTool', this.updateConfig)
  },
  methods: {
    drawChart () {
      this.chartObj = new Line(this.$refs.baseLine, this.config)
      this.chartObj.render()
    },
    updateConfig (id) {
      if (id === this.id) {
        this.chartObj.updateConfig(this.customConfig)
        this.chartObj.render()
      }
    },
    getData () {

    }
  },
  destroyed () {
    this.chartObj.destroy()
    this.$EventBus.$off('updateTool')
  }
}
</script>
