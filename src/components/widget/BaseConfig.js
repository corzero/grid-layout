const baseLine = {
  padding: 'auto',
  forceFit: true,
  'xField': 'x',
  'yField': 'y',
  title: {
    visible: true,
    text: '配置折线数据点样式'
  },
  description: {
    visible: true,
    text: '自定义配置趋势线上数据点的样式'
  },
  data: [
    {
      x: '2019-03',
      y: 385,
      serie: 'Paris'
    },
    {
      x: '2019-04',
      y: 888,
      serie: 'Paris'
    },
    {
      x: '2019-05',
      y: 349,
      serie: 'Paris'
    },
    {
      x: '2019-06',
      y: 468,
      serie: 'Paris'
    },
    {
      x: '2019-07',
      y: 477,
      serie: 'Paris'
    },
    {
      x: '2019-03',
      y: 291,
      serie: 'London'
    },
    {
      x: '2019-04',
      y: 484,
      serie: 'London'
    },
    {
      x: '2019-05',
      y: 293,
      serie: 'London'
    },
    {
      x: '2019-06',
      y: 147,
      serie: 'London'
    },
    {
      x: '2019-07',
      y: 618,
      serie: 'London'
    }
  ],
  xAxis: {
    grid: {
      visible: true
    },
    title: {
      visible: true,
      text: 'asdas'
    }
  },
  yAxis: {
    line: {
      visible: true
    },
    tickLine: {
      visible: true
    },
    title: {
      visible: true,
      text: 'asd'
    }
  },
  legend: {
    visible: true,
    flipPage: true,
    text: '图例',
    offsetX: null,
    offsetY: null
  },
  label: {
    visible: true,
    type: 'point',
    offset: null,
    offsetX: null,
    offsetY: null
  },
  point: {
    visible: true,
    size: 5,
    shape: 'diamond',
    style: {
      fill: 'white',
      stroke: '#2593fc',
      lineWidth: 2
    }
  },
  tooltip: {
    visible: true,
    shared: true
  }
}
const basePie = {
  forceFit: true,
  radius: 0.57,
  angleField: 'value',
  colorField: 'type',
  title: {
    visible: true,
    text: '饼图'
  },
  description: {
    visible: true,
    text: '一个简单的饼图'
  },
  legend: {
    visible: true,
    position: 'right-top',
    flipPage: false,
    offsetX: null,
    offsetY: null
  },
  tooltip: {
    visible: true
  },
  label: {
    visible: true,
    type: 'spider',
    offset: null,
    offsetX: null,
    offsetY: null
  },
  color: ['#5B8FF9', '#5AD8A6', '#2a5bb1', '#F6BD16', '#E8684A'],
  data: [
    {
      type: '分类一',
      value: 27
    },
    {
      type: '分类二',
      value: 25
    },
    {
      type: '分类三',
      value: 18
    },
    {
      type: '分类四',
      value: 15
    },
    {
      type: '分类五',
      value: 10
    },
    {
      type: '其它',
      value: 5
    }
  ]
}
const baseColumn = {
  forceFit: true,
  xField: 'x',
  yField: 'y',
  columnSize: 40,
  title: {
    visible: true,
    text: '柱形图'
  },
  description: {
    visible: true,
    text: '一个基础的柱形图'
  },
  legend: {
    visible: true,
    flipPage: false,
    offsetX: null,
    offsetY: null
  },
  tooltip: {
    visible: true,
    shared: true
  },
  xAxis: {
    visible: true,
    grid: {
      visible: true
    },
    tickLine: {
      visible: true
    },
    label: {
      offset: 5,
      offsetX: 1,
      offsetY: 2
    },
    title: {
      text: '日期'
    }
  },
  yAxis: {
    visible: true,
    line: {
      visible: true
    },
    tickLine: {
      visible: true
    },
    label: {
      offset: 1,
      offsetX: 2,
      offsetY: 3
    },
    title: {
      text: '数值'
    }
  },
  label: {
    visible: true,
    position: 'top',
    offset: 1,
    offsetX: 2,
    offsetY: 3
  },
  data: [
    {
      x: '2019-03',
      y: 385,
      serie: 'default'
    },
    {
      x: '2019-04',
      y: 888,
      serie: 'default'
    },
    {
      x: '2019-05',
      y: 349,
      serie: 'default'
    },
    {
      x: '2019-06',
      y: 468,
      serie: 'default'
    },
    {
      x: '2019-07',
      y: 477,
      serie: 'default'
    }
  ]
}
module.exports = { baseLine, basePie, baseColumn }
