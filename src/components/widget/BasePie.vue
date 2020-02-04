<template>
  <div style="width:100%;height:100%" ref="basePie" />
</template>
<script>
import { isEmpty, cloneDeep } from 'lodash'
import { Pie } from '@antv/g2plot'
import { basePie } from './BaseConfig'
export default {
  name: 'BasePie',
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
    this.config = isEmpty(this.customConfig) ? cloneDeep(basePie) : this.customConfig
    this.chartObj = null
  },
  mounted () {
    this.drawChart()
    this.$EventBus.$on('updateTool', this.updateConfig)
  },
  methods: {
    drawChart () {
      this.chartObj = new Pie(this.$refs.basePie, this.config)
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
