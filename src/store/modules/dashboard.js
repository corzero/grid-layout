import { assign } from 'lodash'
const dashboard = {
  namespaced: true,
  state: {
    global: {
      title: '新建模板', // 描述
      width: 1920, // 宽度
      height: 1080,
      interval: 10,
      lattice: true,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      backgroundImage: '',
      scaleType: 0,
      backgroundSize: '51% 100%',
      backgroundPosition: 'left top'
    },
    widget: [
      {
        uid: 1111111,
        widgetName: 'BaseLine',
        x: 0,
        y: 0,
        z: 1,
        w: 200,
        h: 200
      },
      {
        uid: 2222222222,
        widgetName: 'BasePie',
        x: 210,
        y: 0,
        z: 1,
        w: 200,
        h: 200
      },
      {
        uid: 3333333333,
        widgetName: 'BaseColumn',
        x: 420,
        y: 0,
        z: 1,
        w: 200,
        h: 200
      }
    ]
  },
  mutations: {
    addWidget (state, config) {
      state.widget.push(config)
    },
    updateGlobal (state, config) {
      state.global = assign(state.global, config)
    },
    updateWidget (state, item) {
      const index = state.widget.findIndex(e => e.uid === item.uid)
      index > -1 &&
        state.widget.splice(index, 1, assign(state.widget[index], item))
    },
    deleteWidget (state, uid) {
      const index = state.widget.findIndex(e => e.uid === uid)
      index > -1 && state.widget.splice(index, 1)
    },
    resize () {}
  },
  actions: {},
  getters: {
    canvas (state) {
      const { title, interval, ...canvas } = state.global
      return canvas
    }
  }
}

export default dashboard
