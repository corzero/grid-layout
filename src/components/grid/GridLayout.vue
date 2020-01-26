<template>
  <!-- 容器 -->
  <div class="grid-container" :class="isLattice ? 'lattice' : ''" @mousewheel="handleZoom(this)">
    <!-- 刻度尺 -->
    <GridRuler :vertical="false" :width="ruler.width" :height="ruler.thick" :isShowReferLine="ruler.isShowReferLine" :start="ruler.startX" :scale="scale" @onLineChange="handleLineChange" />
    <GridRuler :vertical="true" :width="ruler.thick" :height="ruler.height" :isShowReferLine="ruler.isShowReferLine" :start="ruler.startY" :scale="scale" @onLineChange="handleLineChange" />
    <a class="corner">@</a>
    <!-- 刻度尺END -->
    <!-- 画布 -->
    <div :style="style" class="grid-canvas" ref="canvasRef">
      <slot :zoom="scale"></slot>
    </div>
    <!-- 画布END -->
    <!--辅助线-->
    <span class="ref-line v-line" v-for="item in vLine" :key="item.position + item.origin" v-show="item.display" :style="{ left: item.position, top: item.origin, height: item.lineLength}" />
    <span class="ref-line h-line" v-for="item in hLine" :key="item.position + item.origin" v-show="item.display" :style="{ top: item.position, left: item.origin, width: item.lineLength}" />
    <!--辅助线END-->
  </div>
</template>

<script>
import GridRuler from './ruler/GridRuler.vue'
export default {
  name: 'grid-layout',
  components: { GridRuler },
  props: {
    // 画布样式
    canvasStyle: {
      type: Object,
      default: () => {
        return {
          backgroundColor: '#fff',
          width: '1920px',
          height: '1080px',
          border: '1px solid #ccc'
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
      return {
        transform: `scale(${this.scale}) translate(${0}px, ${0}px)`,
        ...this.canvasStyle
      }
    }
  },
  watch: {},
  methods: {
    handleZoom () {
      /* 获取当前页面的缩放比,若未设置scale缩放比，则为默认100%，即1，原图大小 */
      /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动   */
      // let scale = this.scale
      // scale += +(event.wheelDelta / 1200).toFixed(1)
      // console.log(scale)
      // if (scale >= 0.5 && scale <= 3) {
      //   this.zoom = scale
      //   this.$emit('scaleChange', scale)
      // }
    },
    handleLineChange (arr, vertical) {
      const newLines = vertical
        ? { h: this.horLineArr, v: [...arr] }
        : { h: [...arr], v: this.verLineArr }
      this.$emit('handleLine', newLines)
    }
  }
}
</script>
