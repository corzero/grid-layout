<template>
  <div>
    <el-tabs stretch type="border-card" class="global-config">
      <el-tab-pane label="常见配置">
        <el-collapse>
          <el-collapse-item class="collapse-item">
            <template slot="title">
              <span class="collapse-title">线图</span>
            </template>
          </el-collapse-item>
          <el-collapse-item class="collapse-item">
            <template slot="title">
              <span class="collapse-title">柱状图</span>
            </template>
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item class="collapse-item">
            <template slot="title">
              <span class="collapse-title">饼图</span>
            </template>
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item class="collapse-item">
            <template slot="title">
              <span class="collapse-title">仪表盘</span>
            </template>
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="全部配置">全部配置</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'RightSider'
}
</script>
<style lang="sass">
.global-config
  width: 100%
  .el-tabs__content
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
</style>
