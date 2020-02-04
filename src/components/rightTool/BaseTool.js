const baseLine = {
  padding: 'auto',
  forceFit: true,
  xField: 'year',
  yField: 'value',
  title: {
    visible: true,
    text: '配置折线数据点样式'
  },
  description: {
    visible: true,
    text: '自定义配置趋势线上数据点的样式'
  },
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 }
  ],
  label: {
    visible: true,
    type: 'point'
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
  }
}
const basePie = {
  forceFit: true,
  title: {
    visible: true,
    text: '多色饼图'
  },
  description: {
    visible: true,
    text: 'desc'
  },
  radius: 0.8,
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
  ],
  angleField: 'value',
  colorField: 'type',
  label: {
    visible: true,
    type: 'inner'
  }
}
const baseColumn = {
  title: {
    visible: true,
    text: '基础柱状图'
  },
  forceFit: true,
  data: [
    {
      type: '家具家电',
      sales: 38
    },
    {
      type: '粮油副食',
      sales: 52
    },
    {
      type: '生鲜水果',
      sales: 61
    },
    {
      type: '美容洗护',
      sales: 145
    },
    {
      type: '母婴用品',
      sales: 48
    },
    {
      type: '进口食品',
      sales: 38
    },
    {
      type: '食品饮料',
      sales: 38
    },
    {
      type: '家庭清洁',
      sales: 38
    }
  ],
  padding: 'auto',
  xField: 'type',
  yField: 'sales',
  meta: {
    type: {
      alias: '类别'
    },
    sales: {
      alias: '销售额(万)'
    }
  }
}
module.exports = { baseLine, basePie, baseColumn }
