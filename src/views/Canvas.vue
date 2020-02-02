<template>
  <div class="canvas-box">
    <div class="canvas-top-nav">

    </div>
    <div class="canvas-main">
      <transition name="left-sider">
        <LeftSider class="canvas-left-sider" v-show="showLeft" />
      </transition>
      <gridLayout class="canvas-console" :canvasConf="canvas" :itemList="widget" @keyup.ctrl="onCtrlClick" @scaleChange="scaleChange" @toggleShow="toggleShow" @updateConfig="updateWidget" />
      <transition name="right-sider">
        <component :is="rightTool" class="canvas-right-sider" v-show="showRight" />
      </transition>
    </div>
  </div>
</template>

<script>
import '@/components/grid/layout.css'
import { createNamespacedHelpers } from 'vuex'
import gridLayout from '@/components/grid/GridLayout.vue'
import LeftSider from '@/components/LeftSider.vue'
import GlobalConfig from '@/components/GlobalConfig.vue'
const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers('dashboard')
export default {
  name: 'Canvas',
  components: {
    gridLayout,
    LeftSider,
    GlobalConfig
  },
  data () {
    return {
      // 辅助(不存store)
      showLeft: true,
      showRight: true,
      rightTool: 'GlobalConfig',
      scale: 0.8,
      isLattice: true,
      active: null
    }
  },
  created () {
  },
  computed: {
    ...mapState(['widget', 'global']),
    ...mapGetters(['canvas'])
  },
  methods: {
    ...mapMutations(['updateWidget']),
    ...mapActions([]),
    onCtrlClick (e) {
      console.log('ctrl', e)
    },
    toggleShow (type) {
      if (type === 'left') {
        this.showLeft = !this.showLeft
      } else {
        this.showRight = !this.showRight
      }
    },
    scaleChange (s) {
      this.scale = s
    }
  }
}
</script>
<style lang="sass">
.canvas-box
  height:100%
  .canvas-top-nav
    min-width: 900px
    position: relative
    height: 30px
    // box-shadow: 0px 3px 6px 0 rgba(89, 91, 94, 0.12)
    display: -webkit-box
    display: -ms-flexbox
    display: flex
    -webkit-box-pack: justify
    -ms-flex-pack: justify
    justify-content: space-between
    -webkit-box-align: center
    -ms-flex-align: center
    align-items: center
    z-index: 105
    background: #404040
    -webkit-transition: all .2s ease-in-out
    transition: all .2s ease-in-out
  .canvas-main
    display: flex
    width: 100%
    height: calc(100% - 30px)
    overflow: hidden
    .canvas-left-sider
      width: 300px
      position: relative
      flex-shrink: 0
      color: #5b6b73
      font-size: 12px
      box-shadow: 0 2px 30px 0 hsla(0,0%,83.9%,.5)
      z-index: 4
      background: #fff
      display: flex
      overflow: hidden
      .el-tabs__header
        margin: 0
    .canvas-console
      width: 100%
      height: calc(100vh - 30px)
    .canvas-right-sider
      display: flex
      width: 400px
      height: calc(100vh - 30px)
      position: relative
      -webkit-box-shadow: rgba(39,54,78,.11) 0 -2px 30px 0
      box-shadow: 0 -2px 30px 0 rgba(39,54,78,.11)
      z-index: 4
      background: #fff
    .left-sider-enter,.left-sider-leave-to,.right-sider-enter,.right-sider-leave-to
      opacity: 0
      width: 0px
    .left-sider-enter-active,.left-sider-leave-active,.right-sider-enter-active,.right-sider-leave-active
      transition: all 0.4s ease
</style>
