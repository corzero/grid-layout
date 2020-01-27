<template>
  <div class="canvas-box">
    <div class="canvas-top-nav">

    </div>
    <div class="canvas-main">
      <LeftSider class="canvas-left-sider" />
      <gridLayout class="canvas-console" :isLattice="isLattice" :scale="scale" @keyup.ctrl="onCtrlClick" @scaleChange="scaleChange">
        <gridItem v-for="e in itemArray" :key="e.uid" :id="e.uid" :x="e.x" :y="e.y" :w="e.w" :h="e.h" :zoom="scale" :active="active==e.uid" :parent="false" :debug="false" :min-width="200" :min-height="200" :isConflictCheck="false" :snap="false" :snapTolerance="10" @activated="onActivated" @deactivated="active = null" @dragging="onDragging">
          当前组件id{{e.uid}}
        </gridItem>
      </gridLayout>
      <RightSider class="canvas-right-sider"></RightSider>
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
      scale: 0.75,
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
      this.active = id
      console.log('hhh', id)
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
    -webkit-box-shadow: rgba(39,54,78,.12) 1px 0 6px 0
    box-shadow: 0px 3px 6px 0 rgba(89, 91, 94, 0.12)
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
    background: #fff
    -webkit-transition: all .2s ease-in-out
    transition: all .2s ease-in-out
  .canvas-main
    display: flex
    width: 100%
    height: calc(100% - 30px)
    .canvas-left-sider
      width: 300px
      position: relative
      -ms-flex-negative: 0
      flex-shrink: 0
      color: #5b6b73
      -webkit-box-orient: vertical
      -webkit-box-direction: normal
      -ms-flex-direction: column
      flex-direction: column
      font-size: 12px
      -webkit-box-shadow: hsla(0,0%,83.9%,.5) 0 2px 30px 0
      box-shadow: 0 2px 30px 0 hsla(0,0%,83.9%,.5)
      z-index: 4
      background: #fff
      -webkit-transition: all .2s ease-in-out
      transition: all .2s ease-in-out
      display: flex
      overflow: hidden
      .el-tabs__header
        margin: 0
    .canvas-console
      width: 100%
    .canvas-right-sider
      display: flex
      width: 260px
      min-width: 260px
      position: relative
      -webkit-box-shadow: rgba(39,54,78,.11) 0 -2px 30px 0
      box-shadow: 0 -2px 30px 0 rgba(39,54,78,.11)
      z-index: 4
      background: #fff
</style>
