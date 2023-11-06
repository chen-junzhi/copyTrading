<script setup name="StatisticalData">
import { DualAxes, Column } from '@antv/g2plot'
import { onMounted, onUnmounted, ref } from 'vue'

const lineData = [
  {
    "year": "10/29",
    "rate": 1.95,
    "amount": 112.79,
    "date": '2023-10-29',
    "dayRate": 1.96
  },
  {
    "year": "10/30",
    "rate": 5.43,
    "amount": 584.61,
    "date": '2023-10-30',
    "dayRate": 4.34
  },
  {
    "year": "10/31",
    "rate": 6.18,
    "amount": 665.03,
    "date": '2023-10-31',
    "dayRate": 0.71
  },
  {
    "year": "11/01",
    "rate": 10.57,
    "amount": 1138.04,
    "date": '2023-11-01',
    "dayRate": 4.14
  },
  {
    "year": "11/02",
    "rate": -0.65,
    "amount": -70.15,
    "date": '2023-11-02',
    "dayRate": -10.16
  },
  {
    "year": "11/03",
    "rate": 11.48,
    "amount": 1349.81,
    "date": '2023-11-03',
    "dayRate": 12.15
  },
  {
    "year": "11/04",
    "rate": 41.74,
    "amount": 4907.54,
    "date": '2023-11-04',
    "dayRate": 27.14
  }
]
const lineChart = ref()
const initLine = () => {
  const colors = ['#5B8FF9', '#5AD8A6']
  lineChart.value = new DualAxes('line', {
    data: [lineData, lineData],
    xField: 'year',
    yField: ['rate', 'amount'],
    meta: {
      rate: {
        alias: '累计收益率',
        // max: 100
      },
      amount: {
        alias: '累计收益额 (USDT)'
      }
    },
    legend: {
      offsetY: -5
    },
    tooltip: {
      // formatter: (datum) => {
      //   console.log(datum)
      //   return { value: datum.amount }
      // },
      customContent: (title, datum) => {
        if (!datum.length) return
        const { data: { date, dayRate } } = datum[0]
        let htmlStr = `<div class="tooltip-wrap">
            <div class="tooltip">
              <div class="tip-item title">${date}</div>`.replace('\n', '')
        const list = datum.map(({ name, value }, index) => {
            return `<div class="tip-item">
                <div class="left">
                  <span class="icon icon${index + 1}"></span>
                  <span>${name}:</span>
                </div>
                <div class="${value < 0 ? 'red' : 'green'}">
                  ${value}${name === '累计收益率' ? '%' : ''}
                </div>
              </div>`.replace('\n', '')
          }).join('')
        htmlStr += list
        htmlStr += `<div class="tip-item">
            <div class="left">
              <span class="icon"></span>
              <span>当日收益率:</span>
            </div>
            <div class="${dayRate < 0 ? 'red' : 'green'}">${dayRate}%</div>
          </div>`.replace('\n', '')
        return htmlStr
      }
    },
    yAxis: {
      rate: {
        label: {
          formatter: (v) => `${v}%`
        }
      }
    },
    geometryOptions: colors.map(item => {
      return {
        geometry: 'line',
        color: item,
        smooth: true
      }
    })
  });
  lineChart.value.render();
}

const columnToolTips = [{
  label: '当日收益额',
  key: 'dayAmount'
}, {
  label: '已结盈亏',
  key: 'settleProfits'
}, {
  label: '未结盈亏变动',
  key: 'unSettleProfits'
},]
const columnData = [
  {
    "year": "10/29",
    "date": '2023-10-29',
    "dayAmount": 471.82,
    "settleProfits": 455.83,
    "unSettleProfits": 15.99
  },
  {
    "year": "10/30",
    "date": '2023-10-30',
    "dayAmount": 80.41,
    "settleProfits": 111.89,
    "unSettleProfits": -31.48
  },
  {
    "year": "10/31",
    "date": '2023-10-31',
    "dayAmount": 473.01,
    "settleProfits": 584.33,
    "unSettleProfits": -111.32
  },
  {
    "year": "11/01",
    "date": '2023-11-01',
    "dayAmount": -1208.20,
    "settleProfits": 309.31,
    "unSettleProfits": -1517.51
  },
  {
    "year": "11/02",
    "date": '2023-11-02',
    "dayAmount": 1419.97,
    "settleProfits": 624.81,
    "unSettleProfits": 795.16
  },
  {
    "year": "11/03",
    "date": '2023-11-03',
    "dayAmount": 3557.73,
    "settleProfits": 2327.87,
    "unSettleProfits": 1229.86
  },
  {
    "year": "11/04",
    "date": '2023-11-04',
    "dayAmount": 251.31,
    "settleProfits": 495.96,
    "unSettleProfits": -244.65
  }
]
const columnChart = ref()
const initColumn = () => {
  const winColor = '#2bb674'
  const loseColor = '#f04f53'

  columnChart.value = new Column('column', {
    data: columnData,
    xField: 'year',
    yField: 'dayAmount',
    color: (item) => {
      const value = columnData.find(i => i.year === item.year).dayAmount
      return value < 0 ? loseColor : winColor
    },
    legend: false,
    columnWidthRatio: 0.4,
    tooltip: {
      customContent: (title, datum) => {
        if (!datum.length) return
        const { data } = datum[0]
        let htmlStr = `<div class="tooltip-wrap">
            <div class="tooltip">
              <div class="tip-item title">${data.date}</div>`.replace('\n', '')
        const list = columnToolTips.map(({ label, key }) => {
          const value = data[key] > 0 ? `+${data[key]}` : data[key]
          return `<div class="tip-item">
                <div class="left">
                  <span>${label}:</span>
                </div>
                <div class="${value < 0 ? 'red' : 'green'}">${value} USDT</div>
              </div>`.replace('\n', '')
        }).join('')
        htmlStr += list
        return htmlStr
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  });
  columnChart.value.render();
}
onMounted(() => {
  initLine()
  initColumn()
})
onUnmounted(() => {
  lineChart.value.destroy()
  columnChart.value.destroy()
})
</script>

<template>
  <div class="container">
    <div class="chart">
      <div class="header flex-x-between">
        <div class="title">获利</div>
      </div>
      <div id="line"></div>
    </div>
    <div class="chart">
      <div class="header flex-x-between">
        <div class="title">收益额</div>
      </div>
      <div id="column"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#line, #column {
  min-height: 330px;
}
::v-deep(.tooltip-wrap) {
  line-height: 12px;
  .tooltip {
    min-width: 250px;
    .tip-item {
      margin: 12px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &.title {
        color: #000;
      }
      .icon {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 8px;
        .left {
          display: flex;
          align-items: center;
        }
        &.icon1 {
          background-color: #5B8FF9;
        }
        &.icon2 {
          background-color: #5AD8A6;
        }
      }
      .green {
        color: #24ae64;
      }
      .red {
        color: #ef454a;
      }
    }
  }
}
.container {
  margin-top: -16px;
}
.chart {
  padding: 30px 0;
  border-bottom: .5px solid #e9edf2;
  .header {
    margin-bottom: 30px;
    .title {
      font-size: 14px;
      font-weight: 600;
    }
  }
}
</style>