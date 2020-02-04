<template>
  <!-- 容器 -->
  <div class="grid-box">
    <div class="grid-header">
      <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
        <el-button size="mini" icon="el-icon-edit"></el-button>
      </el-tooltip>
      <el-button-group class="grid-tools">
        <el-tooltip class="item" effect="dark" content="撤销" placement="bottom">
          <el-button size="mini" icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="重做" placement="bottom">
          <el-button size="mini" icon="el-icon-edit"></el-button>
        </el-tooltip>
      </el-button-group>
      <el-button-group class="grid-tools">
        <el-tooltip class="item" effect="dark" content="上移" placement="bottom">
          <el-button size="mini" icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="下移" placement="bottom">
          <el-button size="mini" icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="置顶" placement="bottom">
          <el-button size="mini" icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="置底" placement="bottom">
          <el-button size="mini" icon="el-icon-edit"></el-button>
        </el-tooltip>
      </el-button-group>
      <el-button-group class="grid-tools">
        <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
          <el-button size="mini" icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
          <el-button size="mini" icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
          <el-button size="mini" icon="el-icon-edit"></el-button>
        </el-tooltip>
      </el-button-group>
    </div>
    <div class="grid-container" :class="isLattice ? 'lattice' : ''" @dragover="dragOver($event)" @drop="dropEnd($event)">
      <!-- 刻度尺 -->
      <GridRuler :vertical="false" :width="canvasConf.width" :height="ruler.thick" :isShowReferLine="ruler.isShowReferLine" :start="ruler.startX" :scale="zoom" />
      <GridRuler :vertical="true" :width="ruler.thick" :height="canvasConf.height" :isShowReferLine="ruler.isShowReferLine" :start="ruler.startY" :scale="zoom" />
      <a class="corner" @click="ruler.isShowReferLine = !ruler.isShowReferLine"><i class="el-icon-view" /></a>
      <!-- 刻度尺END -->
      <!-- 画布 -->
      <div :style="style" class="grid-canvas" ref="canvasRef" @contextmenu.prevent="rightClick">
        <gridItem v-for="e in itemList" :key="e.uid" :id="e.uid" :x="e.x" :y="e.y" :z="e.z" :w="e.w" :h="e.h" :zoom="scale" :active="active==e.uid" :parent="false" :debug="false" :min-width="200" :min-height="200" :isConflictCheck="false" :snap="false" :snapTolerance="10" @activated="onActivated" @deactivated="onDeactivated" @dragging="onDragging" @resizing="onResizing">
          <component :is="e.widgetName" />
        </gridItem>
      </div>
      <!-- 画布END -->
      <!-- 右键菜单 -->
      <div v-if="rightMenu.show" class="right-menu" :style="{transform:`translate(${rightMenu.offsetXY})`}">
        <div v-show="rightMenu.show == 'item'">
          <div class="right-menu-item"><span class="menu-item-left">复制</span><span class="menu-item-right">Ctrl + C</span></div>
          <div class="right-menu-item"><span class="menu-item-left">粘贴</span><span class="menu-item-right">Ctrl + V</span></div>
          <div class="right-menu-item"><span class="menu-item-left">剪切</span><span class="menu-item-right">Ctrl + X</span></div>
          <div class="right-menu-item"><span class="menu-item-left">删除</span><span class="menu-item-right">Ctrl + Del</span></div>
          <div class="right-menu-item"><span class="menu-item-left">锁定/解锁</span><span class="menu-item-right">Ctrl + L</span></div>
        </div>
        <div v-show="rightMenu.show == 'canvas'">
          <div class="right-menu-item"><span class="menu-item-left">粘贴到当前位置</span><span class="menu-item-right">Ctrl + Shift + C</span></div>
          <div class="right-menu-item"><span class="menu-item-left">粘贴</span><span class="menu-item-right">Ctrl + C</span></div>
        </div>
      </div>
      <!-- 右键菜单END -->
      <!--辅助线-->
      <span class="ref-line v-line" v-for="item in vLine" :key="item.position + item.origin" v-show="item.display" :style="{ left: item.position, top: item.origin, height: item.lineLength}" />
      <span class="ref-line h-line" v-for="item in hLine" :key="item.position + item.origin" v-show="item.display" :style="{ top: item.position, left: item.origin, width: item.lineLength}" />
      <!--辅助线END-->
    </div>
    <div class="grid-footer">
      <div class="left-tool" @click="$emit('toggleShow','left')">
        <i class="el-icon-s-grid" style="text-align: center;font-size: 18px;width: 30px" />
      </div>
      <div class="grid-resize">
        <span>0.5</span>
        <el-slider v-model="zoom" :min="0.5" :max="1.5" :step="0.1" style="width: 200px;margin: 0 15px;"></el-slider>
        <span>1.5%</span>
      </div>
      <div class="right-tool" @click="$emit('toggleShow','right')">
        <i class="el-icon-setting" style="text-align: center;font-size: 18px;width: 30px" />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import GridRuler from './ruler/GridRuler.vue'
import gridItem from '@/components/grid/GridItem.vue'
const comps = require.context('../widget', false, /\.vue$/)
const widgetList = comps.keys().reduce((prev, cur) => {
  const compTemp = comps(cur)
  const comp = compTemp.default || compTemp
  prev[comp.name] = comp
  return prev
}, {})
export default {
  name: 'GridLayout',
  components: { GridRuler, gridItem, ...widgetList },
  props: {
    itemList: {
      type: Array,
      default: () => []
    },
    // 画布样式
    canvasConf: {
      type: Object,
      default: () => {
        return {
          backgroundColor: '#fff',
          width: 1920,
          height: 1080
        }
      }
    },
    isRuler: {
      type: Boolean,
      default: true
    },
    isLattice: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 0.75
    }
  },
  data () {
    return {
      active: null,
      rightMenu: {
        show: null,
        offsetXY: '0px, 0px'
      },
      zoom: this.scale,
      vLine: [],
      hLine: [],
      ruler: {
        isShowReferLine: true,
        thick: 16,
        startX: -60,
        startY: -60
      }
    }
  },
  created () { },
  mounted () { },
  beforeDestroy () {
  },
  computed: {
    style () {
      let { ...canvasConf } = this.canvasConf
      canvasConf.width = canvasConf.width + 'px'
      canvasConf.height = canvasConf.height + 'px'
      return {
        transform: `scale(${this.zoom}) translate(60px, 60px)`,
        ...canvasConf
      }
    }
  },
  watch: {},
  methods: {
    onActivated (id) {
      if (!this.active) {
        this.active = id
        this.$emit('onActivated', id)
      }
    },
    onDeactivated () {
      this.active = null
      this.rightMenu = {
        show: null,
        offsetXY: '0px, 0px'
      }
      this.$emit('onDeactivated')
    },
    onDragging: debounce(function (position) {
      this.$emit('updateConfig', position)
    }, 1000),
    onResizing: debounce(function (size) {
      this.$emit('updateConfig', size)
    }, 1000),
    rightClick (e) {
      console.log(e)
      // 点击item
      if (e.target.className.includes('grid-canvas')) {
        this.rightMenu = {
          show: 'canvas',
          offsetXY: `${e.layerX}px,${e.layerY}px`
        }
      } else {
        this.rightMenu = {
          show: 'item',
          offsetXY: `${e.layerX}px,${e.layerY}px`
        }
      }
    },
    dropEnd (e) {
      const widgetName = e.dataTransfer.getData('name')
      this.$emit('addWidget', { widgetName, x: e.offsetX, y: e.offsetY })
    },
    dragOver (e) {
      e.preventDefault()
    }
  }
}
</script>
<style lang="sass">
/* 容器 */
.grid-box
  height: 100%
  display: flex
  flex-flow: column
  position: relative
  .grid-header
    padding:0 10px
    display: flex
    // justify-content: space-between
    -webkit-box-align: center
    -ms-flex-align: center
    align-items: center
    height: 40px
    border-bottom: 1px solid #e5e5e5
    box-shadow: 0px 1px 6px 0 rgba(89, 91, 94, 0.12)
    z-index: 100
    .grid-tools
      margin-left: 10px
  .grid-container
    width: 100%
    height: 100%
    overflow: auto
    position: relative
    /* 画布区域 */
    .grid-canvas
      position: absolute
      transform-origin: 0 0
      transition: 0.2s all ease-in-out
      background-size: cover, contain
      background-position: center, right bottom
      background-repeat: no-repeat, no-repeat
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 30px 0
    /* 尺子左上操作 */
    .corner
      position: absolute
      left: 0
      top: 0
      pointer-events: auto
      cursor: pointer
      transition: all 0.2s ease-in-out
      box-sizing: content-box
      background-color: #ccc
    .right-menu
      width: 220px
      position: absolute
      background-color: #fff
      // transition: all .8s ease-in-out
      background: #fff
      z-index: 999
      border: 1px solid #eee
      box-shadow: 0 0.5em 1em 0 rgba(0,0,0,.1)
      border-radius: 1px
      font-size: 10px
      .right-menu-item
        user-select: none
        display: -ms-flexbox
        display: -webkit-flex
        -ms-flex-pack: distribute
        justify-content: space-around
        -webkit-box-align: center
        -ms-flex-align: center
        align-items: center
        height: 28px
        color: #1a1a1a
        line-height: 28px
        padding: 0 5px
        cursor: pointer
        &:hover
          background: #409eff
          color: #fff
        .menu-item-left
          width:100px
          text-align: left
        .menu-item-right
          width:100px
          text-align: right
  .grid-footer
    height: 30px
    border-top: 1px solid #e5e5e5
    box-shadow: 0px -1px 6px 0 rgba(89, 91, 94, 0.12)
    z-index: 100
    display: flex
    -webkit-box-pack: justify
    justify-content: space-between
    align-items: center
    .left-tool
      cursor: pointer
      display: flex
      align-items: center
      border-right: 1px solid #c8cdd0
    .right-tool
      cursor: pointer
      display: flex
      align-items: center
      border-left: 1px solid #c8cdd0
    .grid-resize
      display: flex
      justify-content: center
      align-items: center
    .el-slider__runway
      margin: 0
    .el-slider__button
      width: 10px
      height:10px
  /* 背景点阵图 */
  .lattice
    background-image: linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0), linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0)
    background-position: 0 0, 10px 10px
    background-size: 20px 20px
</style>
