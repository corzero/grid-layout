import { assign } from 'lodash'
import { v1 } from 'uuid'
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
        uid: '53f9e901-464b-11ea-ae7e-990168c9b48d',
        widgetName: 'BaseLine',
        x: 0,
        y: 0,
        z: 1,
        w: 300,
        h: 200,
        config: {}
      },
      {
        uid: '527cbee1-464b-11ea-ae7e-990168c9b48d',
        widgetName: 'BasePie',
        x: 310,
        y: 0,
        z: 1,
        w: 300,
        h: 200,
        config: {}
      },
      {
        uid: '50fef881-464b-11ea-ae7e-990168c9b48d',
        widgetName: 'BaseColumn',
        x: 620,
        y: 0,
        z: 1,
        w: 300,
        h: 200,
        config: {}
      }
    ]
  },
  mutations: {
    addWidget (state, config) {
      let baseWidget = {
        uid: v1(),
        w: 300,
        h: 200,
        z: 1,
        config: {}
      }
      console.log(v1())
      state.widget.push(assign(baseWidget, config))
    },
    updateGlobal (state, config) {
      state.global = assign(state.global, config)
    },
    updateWidget (state, item) {
      const index = state.widget.findIndex(e => e.uid === item.uid)
      index > -1 &&
        state.widget.splice(index, 1, assign(state.widget[index], item))
    },
    updateWidgetConf (state, { uid, config }) {
      const index = state.widget.findIndex(e => e.uid === uid)
      assign(state.widget[index].config, config)
      index > -1 &&
        state.widget.splice(index, 1, state.widget[index])
    },
    deleteWidget (state, uid) {
      const index = state.widget.findIndex(e => e.uid === uid)
      index > -1 && state.widget.splice(index, 1)
    }
  },
  actions: {},
  getters: {
    canvas (state) {
      const { title, interval, ...canvas } = state.global
      return canvas
    },
    getConfigById (state, id) {
      return id => state.widget.find(e => e.uid === id)
    },
    getWidgetToolById (state, id) {
      return id => state.widget.find(e => e.uid === id).config
    }
  }
}

export default dashboard
