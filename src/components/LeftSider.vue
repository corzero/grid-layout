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
          <div class="widget-item" v-for="e in 3" :key="e" draggable="true" @dragstart="startDragWidget($event,e)">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" height="45px">
            <p style="text-align: center;">好吃的汉堡</p>
          </div>
        </el-collapse-item>
        <el-collapse-item class="collapse-item">
          <template slot="title">
            <span class="collapse-title">柱状图</span>
          </template>
          <div class="widget-item" v-for="e in 3" :key="e" draggable="true" @dragstart="startDragWidget($event,e)">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" height="45px">
            <p style="text-align: center;">好吃的汉堡</p>
          </div>
        </el-collapse-item>
        <el-collapse-item class="collapse-item">
          <template slot="title">
            <span class="collapse-title">饼图</span>
          </template>
          <div class="widget-item" v-for="e in 3" :key="e" draggable="true" @dragstart="startDragWidget($event,e)">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" height="45px">
            <p style="text-align: center;">好吃的汉堡</p>
          </div>
        </el-collapse-item>
        <el-collapse-item class="collapse-item">
          <template slot="title">
            <span class="collapse-title">仪表盘</span>
          </template>
          <div class="widget-item" v-for="e in 3" :key="e" draggable="true" @dragstart="startDragWidget($event,e)">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" height="45px">
            <p style="text-align: center;">好吃的汉堡</p>
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
  methods: {
    startDragWidget (e, name) {
      console.log('1111', e, name)
      e.dataTransfer.setData('name', 'asdasdsadasd')
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
        flex: 1 0 90%
        order: 1
      .el-collapse-item__header
        height: 35px
        line-height: 35px
        padding-left: 5px
        font-weight: 400
        font-size: 12px
      .el-collapse-item__content
        .widget-item
          cursor: pointer
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
