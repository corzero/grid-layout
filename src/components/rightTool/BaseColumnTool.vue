<template>
  <div>
    <el-tabs stretch type="border-card" style="height:100%;overflow: auto">
      <el-tab-pane label="常见配置">
        <div class="collapse-tool">
          <div class="base-tool tool-item">
            <label>内容</label>
            <el-input v-model="config.title.text" controls-position="right" size="mini" @blur="handleUpdate" />
          </div>
        </div>
        <div class="collapse-tool">
          <div class="base-tool tool-item">
            <label>内容</label>
            <el-input v-model="config.title.text" controls-position="right" size="mini" @blur="handleUpdate" />
          </div>
        </div>
        <el-collapse v-model="activeConfig">
          <el-collapse-item class="collapse-item" :disabled="!config.title.visible" :name="0">
            <template slot="title">
              <span class="collapse-title">标题</span>
              <el-switch v-model="config.title.visible" class="tool-switch" size="mini" @change="(v)=>handleSwitch(v,0)" />
            </template>
            <div class="collapse-tool">
              <div class="tool-item">
                <label>内容</label>
                <el-input v-model="config.title.text" controls-position="right" size="mini" @blur="handleUpdate" />
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item class="collapse-item" :disabled="!config.description.visible" :name="1">
            <template slot="title">
              <span class="collapse-title">副标题</span>
              <el-switch v-model="config.description.visible" class="tool-switch" size="mini" @change="(v)=>handleSwitch(v,1)" />
            </template>
            <div class="collapse-tool">
              <div class="tool-item">
                <label>内容</label>
                <el-input v-model="config.description.text" controls-position="right" size="mini" @blur="handleUpdate" />
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item class="collapse-item" :disabled="!config.legend.visible" :name="2">
            <template slot="title">
              <span class="collapse-title">图例</span>
              <el-switch v-model="config.legend.visible" class="tool-switch" size="mini" @change="(v)=>handleSwitch(v,2)" />
            </template>
            <div class="collapse-tool">
              <div class="tool-item">
                <label>位置</label>
                <el-input v-model="config.legend.text" controls-position="right" size="mini" @blur="handleUpdate" />
              </div>
              <div class="tool-item">
                <label>分页</label>
                <el-switch v-model="config.legend.flipPage" class="tool-switch" size="mini" @change="handleUpdate" />
              </div>
              <div class="tool-item">
                <label>X轴偏移</label>
                <el-input-number v-model="config.legend.offsetX" controls-position="right" size="mini" @blur="handleUpdate" />
              </div>
              <div class="tool-item">
                <label>Y轴偏移</label>
                <el-input-number v-model="config.legend.offsetY" controls-position="right" size="mini" @blur="handleUpdate" />
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item class="collapse-item" :disabled="!config.label.visible" :name="3">
            <template slot="title">
              <span class="collapse-title">图形标签</span>
              <el-switch v-model="config.label.visible" class="tool-switch" size="mini" @change="(v)=>handleSwitch(v,3)" />
            </template>
            <div class="collapse-tool">
              <div class="tool-item">
                <label>位置</label>
                <el-select v-model="config.label.position" size="mini" placeholder="请选择" @change="handleUpdate">
                  <el-option label="上" value="top" />
                  <el-option label="中" value="middle" />
                  <el-option label="下" value="bottom" />
                </el-select>
              </div>
              <div class="tool-item">
                <label>整体偏移</label>
                <el-input-number v-model="config.label.offset" controls-position="right" size="mini" @blur="handleUpdate" />
              </div>
              <div class="tool-item">
                <label>X轴偏移</label>
                <el-input-number v-model="config.label.offsetX" controls-position="right" size="mini" @blur="handleUpdate" />
              </div>
              <div class="tool-item">
                <label>Y轴偏移</label>
                <el-input-number v-model="config.label.offsetY" controls-position="right" size="mini" @blur="handleUpdate" />
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item class="collapse-item" :disabled="!config.tooltip.visible" :name="5">
            <template slot="title">
              <span class="collapse-title">提示</span>
              <el-switch v-model="config.tooltip.visible" class="tool-switch" size="mini" @change="(v)=>handleSwitch(v,5)" />
            </template>
            <div class="collapse-tool">
              <div class="tool-item">
                <label>共享</label>
                <el-switch v-model="config.tooltip.shared" class="tool-switch" size="mini" @change="handleSwitch" />
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item class="collapse-item" :disabled="!config.xAxis.visible" :name="6">
            <template slot="title">
              <span class="collapse-title">X轴</span>
              <el-switch v-model="config.xAxis.visible" class="tool-switch" size="mini" @change="(v)=>handleSwitch(v,6)" />
            </template>
            <div class="collapse-tool">
              <div class="tool-item">
                <label>内容</label>
                <el-input v-model="config.xAxis.text" controls-position="right" size="mini" @blur="handleUpdate" />
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item class="collapse-item" :disabled="!config.yAxis.visible" :name="7">
            <template slot="title">
              <span class="collapse-title">Y轴</span>
              <el-switch v-model="config.yAxis.visible" class="tool-switch" size="mini" @change="(v)=>handleSwitch(v,7)" />
            </template>
            <div class="collapse-tool">
              <div class="tool-item">
                <label>内容</label>
                <el-input v-model="config.yAxis.text" controls-position="right" size="mini" @blur="handleUpdate" />
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="全部配置">全部配置</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { cloneDeep, isEmpty } from 'lodash'
import { baseColumn } from '../widget/BaseConfig'
import { createNamespacedHelpers } from 'vuex'
const {
  mapGetters,
  mapMutations
} = createNamespacedHelpers('dashboard')
export default {
  name: 'BaseColumnTool',
  props: {
    widgetId: String
  },
  data () {
    return {
      activeConfig: [],
      config: null
    }
  },
  created () {
    if (isEmpty(this.getWidgetToolById(this.widgetId))) {
      const { forceFit, data, ...config } = baseColumn
      this.config = cloneDeep(config)
    } else {
      const { forceFit, data, ...config } = this.getWidgetToolById(this.widgetId)
      this.config = cloneDeep(config)
    }
  },
  computed: {
    ...mapGetters(['getWidgetToolById'])
  },
  methods: {
    ...mapMutations(['updateWidgetConf']),
    handleUpdate () {
      console.log(this.config)
      this.updateWidgetConf({ uid: this.widgetId, config: this.config })
      this.$EventBus.$emit('updateTool', this.widgetId)
    },
    handleSwitch (v, i) {
      if (!v) {
        const index = this.activeConfig.findIndex(e => e === i)
        index > -1 && this.activeConfig.splice(index, 1)
      }
    }
  }
}
</script>
<style lang="sass">

</style>
