<template>
  <div>
    <el-tabs stretch type="border-card" style="height:100%;overflow: auto">
      <el-tab-pane label="常见配置">
        <div class="collapse-tool">
          <div class="base-tool tool-item">
            <label>内容</label>
            <el-input v-model="config.title.text" controls-position="right" size="mini" @change="handleUpdate" @blur="handleUpdate" />
          </div>
        </div>
        <div class="collapse-tool">
          <div class="base-tool tool-item">
            <label>内容</label>
            <el-input v-model="config.title.text" controls-position="right" size="mini" @change="handleUpdate" @blur="handleUpdate" />
          </div>
        </div>
        <el-collapse v-model="activeConfig" @change="handleChange">
          <el-collapse-item class="collapse-item" :disabled="!config.title.visible" :name="0">
            <template slot="title">
              <span class="collapse-title">标题</span>
              <el-switch v-model="config.title.visible" class="tool-switch" size="mini" @change="(v)=>handleSwitch(v,0)" />
            </template>
            <div class="collapse-tool">
              <div class="tool-item">
                <label>内容</label>
                <el-input v-model="config.title.text" controls-position="right" size="mini" @change="handleUpdate" @blur="handleUpdate" />
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
                <el-input v-model="config.description.text" controls-position="right" size="mini" @change="handleUpdate" @blur="handleUpdate" />
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
                <el-input v-model="config.legend.text" controls-position="right" size="mini" @change="handleUpdate" @blur="handleUpdate" />
              </div>
              <div class="tool-item">
                <label>分页</label>
                <el-switch v-model="config.legend.flipPage" class="tool-switch" size="mini" @change="handleUpdate" />
              </div>
              <div class="tool-item">
                <label>X轴偏移</label>
                <el-input-number v-model="config.legend.offsetX" controls-position="right" size="mini" @change="handleUpdate" @blur="handleUpdate" />
              </div>
              <div class="tool-item">
                <label>Y轴偏移</label>
                <el-input-number v-model="config.legend.offsetY" controls-position="right" size="mini" @change="handleUpdate" @blur="handleUpdate" />
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
                <label>类型</label>
                <el-select v-model="config.label.type" size="mini" placeholder="请选择" @change="handleUpdate">
                  <el-option label="内" value="inside" />
                  <el-option label="外" value="outer" />
                  <el-option label="蜘蛛" value="spider" />
                </el-select>
              </div>
              <div class="tool-item">
                <label>整体偏移</label>
                <el-input-number v-model="config.label.offset" controls-position="right" size="mini" @change="handleUpdate" @blur="handleUpdate" />
              </div>
              <div class="tool-item">
                <label>X轴偏移</label>
                <el-input-number v-model="config.label.offsetX" controls-position="right" size="mini" @change="handleUpdate" @blur="handleUpdate" />
              </div>
              <div class="tool-item">
                <label>Y轴偏移</label>
                <el-input-number v-model="config.label.offsetY" controls-position="right" size="mini" @change="handleUpdate" @blur="handleUpdate" />
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item class="collapse-item" :disabled="!config.tooltip.visible" :name="5">
            <template slot="title">
              <span class="collapse-title">提示</span>
            </template>
            <div class="collapse-tool">
              <div class="tool-item">
                <label>启用</label>
                <el-switch v-model="config.tooltip.visible" class="tool-switch" size="mini" @change="(v)=>handleSwitch(v,5)" />
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
import { basePie } from '../widget/BaseConfig'
import { createNamespacedHelpers } from 'vuex'
const {
  mapGetters,
  mapMutations
} = createNamespacedHelpers('dashboard')
export default {
  name: 'BasePieTool',
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
      const { forceFit, data, ...config } = basePie
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
      // this.updateWidgetConf({ uid: this.widgetId, config: this.config })
    },
    handleChange (v) {
      console.log(v)
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
