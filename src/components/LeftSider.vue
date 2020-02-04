<template>
  <el-tabs type="border-card" tab-position="left" class="left-sider-tabs">
    <el-tab-pane>
      <el-tooltip slot="label" effect="dark" content="组件" placement="right">
        <i class="el-icon-menu left-icon" />
      </el-tooltip>
      <el-collapse>
        <el-collapse-item class="collapse-item">
          <template slot="title">
            <span class="collapse-title">线图</span>
          </template>
          <div class="widget-item" v-for="e in lineImg" :key="e.name" draggable="true" @dragstart="startDragWidget($event,e.name)">
            <img :src="e.url" width="100%">
            <p style="text-align: center;">{{e.desc}}</p>
          </div>
        </el-collapse-item>
        <el-collapse-item class="collapse-item">
          <template slot="title">
            <span class="collapse-title">柱状图</span>
          </template>
          <div class="widget-item" v-for="e in columnImg" :key="e.name" draggable="true" @dragstart="startDragWidget($event,e.name)">
            <img :src="e.url" width="100%">
            <p style="text-align: center;">{{e.desc}}</p>
          </div>
        </el-collapse-item>
        <el-collapse-item class="collapse-item">
          <template slot="title">
            <span class="collapse-title">饼图</span>
          </template>
          <div class="widget-item" v-for="e in pieImg" :key="e.name" draggable="true" @dragstart="startDragWidget($event,e.name)">
            <img :src="e.url" width="100%">
            <p style="text-align: center;">{{e.desc}}</p>
          </div>
        </el-collapse-item>
        <el-collapse-item class="collapse-item">
          <template slot="title">
            <span class="collapse-title">仪表盘</span>
          </template>
          <div class="widget-item" v-for="e in gaugeImg" :key="e.name" draggable="true" @dragstart="startDragWidget($event,e.anme)">
            <img :src="e.url" width="100%">
            <p style="text-align: center;">{{e.desc}}</p>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
    <el-tab-pane>
      <el-tooltip slot="label" effect="dark" content="Right Center 提示文字" placement="right">
        <i class="el-icon-date left-icon" />
      </el-tooltip>
    </el-tab-pane>
    <el-tab-pane>
      <el-tooltip slot="label" effect="dark" content="Right Center 提示文字" placement="right">
        <i class="el-icon-date left-icon" />
      </el-tooltip>
    </el-tab-pane>
    <el-tab-pane>
      <el-tooltip slot="label" effect="dark" content="Right Center 提示文字" placement="right">
        <i class="el-icon-date left-icon" />
      </el-tooltip>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'LeftSider',
  components: {
  },
  data () {
    return {
      lineImg: [{
        name: 'BaseLine',
        desc: '基础线图',
        url: require('../assets/widget/baseLine.png')
      }],
      pieImg: [{
        name: 'BasePie',
        desc: '基础饼图',
        url: require('../assets/widget/basePie.png')
      }],
      columnImg: [{
        name: 'BaseColumn',
        desc: '基础柱状图',
        url: require('../assets/widget/baseColumn.png')
      }],
      gaugeImg: []
    }
  },
  methods: {
    startDragWidget (e, name) {
      e.dataTransfer.setData('name', name)
    }
  }
}
</script>
<style lang="sass">
.left-sider-tabs
  .el-tabs__item
    height: 60px
    line-height: 60px
  .el-tabs__content
    width: 100%
    padding: 0
    .collapse-item
      padding: 0 5px
      .collapse-title
        font-weight: bold
        flex: 1 0 67%
        order: 1
      .tool-switch
        order: 2
      .el-collapse-item__header
        height: 35px
        line-height: 35px
        padding-left: 5px
        font-weight: 400
        font-size: 12px
      .el-collapse-item__content
        .widget-item
          cursor: grab
          width: 45%
          display: inline-block
          text-align: center
          font-size: 12px
          margin: 5px
          padding-top: 5px
          &:hover
            border-radius: 5px
            box-shadow: 0px 1px 6px 0 rgba(89, 91, 94, 0.7)
  .left-icon
    font-size: 20px
</style>
