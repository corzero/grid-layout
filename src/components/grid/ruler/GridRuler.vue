<template>
  <div :class="rwClassName" :style="rwStyle">
    <canvas class="ruler" ref="$canvas" @click="handleClick" @mouseenter="handleEnter" @mousemove="handleMove" @mouseleave="handleLeave" />
    <div class="lines" v-show="isShowReferLine">
      <AssistLine v-for="(v,i) in lines" :key="v+i" :index="i" :value="v >> 0" :scale="scale" :start="start" :thick="thick" :palette="palette" :vertical="vertical" :isShowReferLine="isShowReferLine" @onRemove="handleLineRemove" @onMouseDown="handleLineDown" @onRelease="handleLineRelease" />
    </div>
    <div class="indicator" :style="indicatorStyle" v-show="showIndicator">
      <div class="value">{{value}}</div>
    </div>
  </div>
</template>

<script>
import AssistLine from './Baseline.vue'
import { drawHorizontalRuler, drawVerticalRuler } from './utils'
const getValueByOffset = (offset, start, scale) => Math.round(start + offset / scale)
const DEFAULTMENU = {
  bgColor: '#fff',
  dividerColor: '#DBDBDB',
  listItem: {
    textColor: '#415058',
    hoverTextColor: '#298DF8',
    disabledTextColor: 'rgba(65, 80, 88, 0.4)',
    bgColor: '#fff',
    hoverBgColor: '#F2F2F2'
  }
}
export default {
  name: 'GridRuler',
  components: {
    AssistLine
  },
  props: {
    // 辅助线
    vertical: {
      type: Boolean,
      default: true
    },
    // 缩放
    scale: {
      type: Number,
      default: 0.75
    },
    ratio: {
      type: Number,
      default: window.devicePixelRatio || 1
    },
    // 标尺厚度
    thick: {
      type: Number,
      default: 18
    },
    width: {
      type: Number,
      default: 2000
    },
    height: {
      type: Number,
      default: 1000
    },
    shadow: {
      type: Object,
      default: () => {
        return {
          x: 200,
          y: 100,
          width: 200,
          height: 400
        }
      }
    },
    start: {
      type: Number,
      default: 0
    },
    selectStart: {
      type: Number
    },
    selectLength: {
      type: Number
    },
    palette: {
      type: Object,
      default: () => {
        return {
          bgColor: 'rgba(225,225,225, 0)', // ruler bg color
          longfgColor: '#BABBBC', // ruler longer mark color
          shortfgColor: '#C8CDD0', // ruler shorter mark color
          fontColor: '#7D8694', // ruler font color
          shadowColor: '#E8E8E8', // ruler shadow color
          lineColor: '#EB5648',
          borderColor: '#DADADC',
          cornerActiveColor: 'rgb(235, 86, 72, 0.6)',
          menu: DEFAULTMENU
        }
      }
    },
    isShowReferLine: {
      type: Boolean
    },
    handleShowReferLine: {
      type: Function
    }
  },
  data () {
    return {
      isDraggingLine: false,
      showIndicator: false,
      value: 0,
      $canvas: {},
      canvasContext: {},
      lines: []
    }
  },
  mounted () {
    this.initCanvasRef()
    this.updateCanvasContext()
    this.drawRuler()
  },
  watch: {
    scale () {
      this.drawRuler()
    },
    start () {
      this.drawRuler()
    },
    width (val) {
      this.updateCanvasContext()
      this.drawRuler()
    },
    height (val) {
      this.updateCanvasContext()
      this.drawRuler()
    }
  },
  computed: {
    rwClassName () {
      const className = this.vertical ? 'v-container' : 'h-container'
      return className
    },
    rwStyle () {
      const hContainer = {
        // width: `calc(100% - ${this.thick}px)`,
        width: `${this.width}px`,
        height: `${this.thick}px`
        // left: `${this.thick}` + 'px'
      }
      const vContainer = {
        width: `${this.thick}px`,
        // height: `calc(100% - ${this.thick}px)`
        height: `${this.height}px`
        // top: `${this.thick}` + 'px'
      }
      return this.vertical ? vContainer : hContainer
    },
    lineStyle () {
      return {
        borderTop: `1px solid ${this.palette.lineColor}`,
        cursor: this.isShowReferLine ? 'ns-resize' : 'none'
      }
    },
    indicatorStyle () {
      const indicatorOffset = (this.value - this.start) * this.scale
      let positionKey = 'top'
      let boderKey = 'borderLeft'
      positionKey = this.vertical ? 'top' : 'left'
      boderKey = this.vertical ? 'borderBottom' : 'borderLeft'
      return {
        [positionKey]: indicatorOffset + 'px',
        [boderKey]: `1px solid ${this.palette.lineColor}`
      }
    },
    canvasConfigs () {
      const {
        bgColor,
        longfgColor,
        shortfgColor,
        fontColor,
        shadowColor,
        lineColor,
        borderColor,
        cornerActiveColor
      } = this.palette
      return {
        ratio: this.ratio,
        bgColor,
        longfgColor,
        shortfgColor,
        fontColor,
        shadowColor,
        lineColor,
        borderColor,
        cornerActiveColor
      }
    }
  },
  methods: {
    handleLineDown () {
      this.isDraggingLine = true
    },
    handleLineRelease (value, index) {
      this.isDraggingLine = false
      // 左右或上下超出时, 删除该条对齐线
      const offset = value - this.start
      const maxOffset = (this.vertical ? this.height : this.width) / this.scale

      if (offset < 0 || offset > maxOffset) {
        this.handleLineRemove(index)
      } else {
        this.lines[index] = value
        this.$emit('onLineChange', this.lines, this.vertical)
      }
    },
    handleLineRemove (index) {
      this.lines.splice(index, 1)
      this.$emit('onLineChange', this.lines, this.vertical)
    },
    // 尺子
    initCanvasRef () {
      this.$canvas = this.$refs.$canvas
      this.canvasContext = this.$canvas && this.$canvas.getContext('2d')
    },
    updateCanvasContext () {
      const { ratio } = this.canvasConfigs

      // 比例宽高
      this.$canvas.width = this.width * ratio
      this.$canvas.height = this.height * ratio

      const ctx = this.$canvas.getContext('2d')
      ctx.font = `${12 * ratio}px -apple-system, 
                "Helvetica Neue", ".SFNSText-Regular", 
                "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB", 
                "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`
      ctx.lineWidth = 1
      ctx.textBaseline = 'middle'
    },
    drawRuler () {
      const options = {
        scale: this.scale,
        width: this.width,
        height: this.height,
        canvasConfigs: this.canvasConfigs
      }

      if (this.vertical) {
        drawVerticalRuler(
          this.canvasContext,
          this.start,
          { y: this.selectStart, height: this.selectLength },
          options
        )
      } else {
        drawHorizontalRuler(
          this.canvasContext,
          this.start,
          { x: this.selectStart, width: this.selectLength },
          options
        )
      }
    },
    handleClick (e) {
      if (this.isShowReferLine) {
        const offset = this.vertical ? e.offsetY : e.offsetX
        const value = getValueByOffset(offset, this.start, this.scale)
        this.lines.push(value)
        this.$emit('onLineChange', this.lines, this.vertical)
      }
    },
    handleEnter (e) {
      // 获取当前鼠标坐标
      if (this.isShowReferLine) {
        let offset = this.vertical ? e.offsetY : e.offsetX
        const value = getValueByOffset(offset, this.start, this.scale)
        if (!this.isDraggingLine) {
          this.showIndicator = true
          this.value = value
        }
      }
    },
    handleMove (e) {
      let offset = this.vertical ? e.offsetY : e.offsetX
      const value = getValueByOffset(offset, this.start, this.scale)
      if (this.showIndicator) {
        this.value = value
      }
    },
    handleLeave () {
      this.showIndicator = false
    }
  }
}
</script>

<style lang="sass" scoped>
.line
  position: absolute
.h-container,
.v-container
  position: absolute
.h-container .lines,
.v-container .lines
  pointer-events: none
.h-container:hover .lines,
.v-container:hover .lines
  pointer-events: auto
.h-container
  top: 0
  .line
    height: 100vh
    top: 0
    padding-left: 5px
    .action
      transform: translatex(-24px)
      .value
        margin-left: 4px
  .indicator
    top: 0
    height: 100vw
    position: inherit
    z-index: 999
    .value
      padding: 0 2px
      width: auto
      margin-left: 4px
      margin-top: 4px
.v-container
  left: 0
  .line
    width: 100vw
    left: 0
    padding-top: 5px
    .action
      transform: translatey(-24px)
      flex-direction: column
      .value
        margin-top: 4px
  .indicator
    width: 100vw
    position: inherit
    z-index: 999
    .value
      padding: 0 2px
      width: auto
      left: 0px
      margin-left: 2px
      margin-top: -5px
      transform-origin: 0 0
      transform: rotate(-90deg)
</style>
