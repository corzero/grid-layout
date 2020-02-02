<template>
  <div>
    <el-tabs stretch type="border-card" class="global-config">
      <el-tab-pane label="常见配置">
        <el-form ref="form" :model="config" label-position="left" label-width="80px" size="mini">
          <el-form-item label="名称">
            <el-input v-model="config.title" controls-position="right" size="mini" @change="v=>updateGlobal({width:v})" @blur="updateGlobal(config)" />
          </el-form-item>
          <el-form-item label="宽度">
            <el-input-number v-model="config.width" controls-position="right" size="mini" @change="v=>updateGlobal({width:v})" @blur="updateGlobal(config)" />
          </el-form-item>
          <el-form-item label="高度">
            <el-input-number v-model="config.height" controls-position="right" size="mini" @change="v=>updateGlobal({height:v})" @blur="updateGlobal(config)" />
          </el-form-item>
          <el-form-item label="网格间距">
            <el-input-number v-model="config.interval" controls-position="right" size="mini" @change="v=>updateGlobal({interval:v})" @blur="updateGlobal(config)" />
          </el-form-item>
          <el-form-item label="网格显示">
            <el-switch v-model="config.lattice" @change="updateGlobal(config)" />
          </el-form-item>
          <el-form-item label="页面缩放">
            <el-radio-group v-model="config.scaleType" @change="updateGlobal(config)">
              <el-radio :label="0" style="margin-bottom: 10px">等比缩放</el-radio>
              <el-radio :label="1" style="margin-bottom: 10px">等比缩放宽度铺满</el-radio>
              <el-radio :label="2" style="margin-bottom: 10px">等比缩放高度铺满</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="背景颜色">
            <el-color-picker v-model="config.backgroundColor" show-alpha @change="updateGlobal(config)" />
          </el-form-item>
          <el-form-item label="背景图片">
            <el-upload class="bg-img-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="global.backgroundImage" :src="global.backgroundImage" class="bg-img">
              <i v-else class="el-icon-plus bg-img-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="全部配置">全部配置</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import { createNamespacedHelpers } from 'vuex'
const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers('dashboard')
export default {
  name: 'GlobalConfig',
  data () {
    return {
      config: null
    }
  },
  created () {
    this.config = cloneDeep(this.global)
  },
  computed: {
    ...mapState(['global']),
    ...mapGetters([])
  },
  methods: {
    ...mapMutations(['updateGlobal']),
    ...mapActions([]),
    updateConfig (e) {
      console.log(e)
    },
    handleAvatarSuccess (res, file) {
      this.form.backgroundImage = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="sass">
.global-config
  width:100%
  .bg-img-uploader .el-upload
    border: 1px dashed #d9d9d9
    border-radius: 6px
    cursor: pointer
    position: relative
    overflow: hidden
    &:hover
      border-color: #409EFF
    .bg-img
      width: 178px
      height: 178px
      display: block
    .bg-img-uploader-icon
      font-size: 28px
      color: #8c939d
      width: 140px
      height: 70px
      line-height: 70px
      text-align: center
</style>
