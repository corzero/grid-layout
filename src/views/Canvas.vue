<template>
  <div class="canvas-box">
    <div class="canvas-top-nav">

    </div>
    <div class="canvas-main">
      <transition name="left-sider">
        <LeftSider class="canvas-left-sider" v-show="showLeft" />
      </transition>
      <gridLayout class="canvas-console" :isLattice="isLattice" :scale="scale" @keyup.ctrl="onCtrlClick" @scaleChange="scaleChange" @toggleShow="toggleShow">
        <gridItem v-for="e in itemArray" :key="e.uid" :id="e.uid" :x="e.x" :y="e.y" :w="e.w" :h="e.h" :zoom="scale" :active="active==e.uid" :parent="false" :debug="false" :min-width="200" :min-height="200" :isConflictCheck="false" :snap="false" :snapTolerance="10" @activated="onActivated" @deactivated="active = null" @dragging="onDragging">
          当前组件id{{e.uid}}
        </gridItem>
      </gridLayout>
      <transition name="right-sider">
        <RightSider class="canvas-right-sider" v-show="showRight"></RightSider>
      </transition>
    </div>
  </div>
</template>

<script>
import '@/components/grid/layout.css'
import { createNamespacedHelpers } from 'vuex'
import gridLayout from '@/components/grid/GridLayout.vue'
import gridItem from '@/components/grid/GridItem.vue'
import LeftSider from '@/components/LeftSider.vue'
import RightSider from '@/components/RightSider.vue'
const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers('view')
export default {
  name: 'Canvas',
  components: {
    gridLayout,
    gridItem,
    LeftSider,
    RightSider
  },
  data () {
    return {
      // 辅助
      showLeft: false,
      showRight: false,
      scale: 0.8,
      isLattice: true,
      itemArray: [
        { x: 0, y: 0, z: 1, w: 200, h: 200, class: 'test1', uid: Math.random() * 100 },
        { x: 210, y: 0, z: 1, w: 200, h: 200, class: 'test2', uid: Math.random() * 100 },
        { x: 420, y: 0, z: 1, w: 200, h: 200, class: 'test3', uid: Math.random() * 100 }
      ],
      active: null
    }
  },
  computed: {
    ...mapState([]),
    ...mapGetters([])
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([]),
    onActivated (id) {
      if (!this.active) {
        this.active = id
        console.log('hhh', id)
      }
    },
    onCtrlClick (e) {
      console.log(e)
      if (this.active) {
        console.log('111111111')
      }
    },
    onDragging (dragObj) {
      const index = this.itemArray.findIndex(e => e.uid === dragObj.id)
      index !== -1 && this.$set(this.itemArray, index, Object.assign(this.itemArray[index], { x: dragObj.x, y: dragObj.y }))
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
      flex-direction: column
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
      transform: translateX(100px)
    .left-sider-enter-active,.left-sider-leave-active,.right-sider-enter-active,.right-sider-leave-active
      transition: all 0.4s ease-in-out
</style>
