<template>
  <el-tabs stretch>
    <el-tab-pane label="组件">
      <el-tabs type="border-card" tab-position="left" class="left-sider-tabs">
        <el-tab-pane label="图1">
        </el-tab-pane>
        <el-tab-pane label="图1">
        </el-tab-pane>
        <el-tab-pane label="图1">
        </el-tab-pane>
        <el-tab-pane label="图1">
        </el-tab-pane>
        <el-tab-pane label="图1">
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="页面">
      啊哈哈哈哈哈哈哈
    </el-tab-pane>
    <el-tab-pane label="图层">
      嘻嘻嘻嘻
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'LeftSider',
  components: {
  }
}
</script>
<style lang="sass">
.left-sider-tabs
  .el-tabs__nav-scroll
    height: calc(100vh - 30px)
</style>
