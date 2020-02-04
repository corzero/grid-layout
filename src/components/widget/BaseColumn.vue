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
    id: {
      type: String,
      require: true
    },
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
    this.config = isEmpty(this.customConfig) ? cloneDeep(baseColumn) : this.customConfig
    this.chartObj = null
  },
  mounted () {
    this.drawChart()
    this.$EventBus.$on('updateTool', this.updateConfig)
  },
  methods: {
    drawChart () {
      this.chartObj = new Column(this.$refs.baseColumn, this.config)
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
  }
}
</script>
