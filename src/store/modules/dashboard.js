const dashboard = {
  namespaced: true,
  state: {
    global: {
      description: String, // 描述
      width: Number, // 宽度
      height: Number
    },
    widget: [
      {
        id: '',
        name: '',

        title: ''
      }
    ]
  },
  mutations: {},
  actions: {}
}

export default dashboard
