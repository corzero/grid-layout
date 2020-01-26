<template>
  <div style="width:100%;height:800px">
    <gridLayout :isLattice="isLattice" @keyup.ctrl="onCtrlClick" @scaleChange="scaleChange" :scale="scale">
      <gridItem v-for="e in itemArray" :key="e.uid" :zoom="scale" :active="active==e.uid" :w="e.w" :h="e.h" :x="e.x" :y="e.y" :id="e.uid" :tabindex="0" :parent="false" :debug="false" :min-width="200" :min-height="200" :isConflictCheck="false" :snap="false" :snapTolerance="10" @refLineParams="getRefLineParams" @activated="onActivated" @deactivated="active = null" @dragging="onDragging">
        当前组件id{{e.uid}}
      </gridItem>
    </gridLayout>
  </div>
</template>

<script>
import '@/components/grid/layout.css'
import gridLayout from '@/components/grid/GridLayout.vue'
import gridItem from '@/components/grid/GridItem.vue'
export default {
  name: 'test',
  components: {
    gridLayout,
    gridItem
  },
  data () {
    return {
      scale: 1,
      isLattice: true,
      itemArray: [
        { x: 0, y: 0, w: 200, h: 200, class: 'test1', uid: Math.random() * 100 },
        { x: 210, y: 0, w: 200, h: 200, class: 'test2', uid: Math.random() * 100 },
        { x: 420, y: 0, w: 200, h: 200, class: 'test3', uid: Math.random() * 100 }
      ],
      vLine: [],
      hLine: [],
      active: null
    }
  },
  methods: {
    // 辅助线回调事件
    getRefLineParams (params) {
      const { vLine, hLine } = params
      this.vLine = vLine
      this.hLine = hLine
    },
    onActivated (id) {
      console.log('hhh', id)
    },
    onCtrlClick (e) {
      console.log(e)
      if (this.active) {
        console.log('111111111')
      }
    },
    onDragging (dragObj) {
      console.log(dragObj)
      const index = this.itemArray.findIndex(e => e.uid === dragObj.id)
      index !== -1 && this.$set(this.itemArray, index, Object.assign(this.itemArray[index], { x: dragObj.x, y: dragObj.y }))
    },
    scaleChange (s) {
      this.scale = s
    }
  }
}
</script>
