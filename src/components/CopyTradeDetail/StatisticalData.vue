<script setup name="StatisticalData">
import { DualAxes } from '@antv/g2plot'
import { onMounted } from 'vue'

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
onMounted(() => {
  const colors = ['#5B8FF9', '#5AD8A6']
  const line = new DualAxes('line', {
      data: [lineData, lineData],
      xField: 'year',
      yField: ['rate', 'amount'],
      meta: {
        rate: {
          alias: '累计收益率',
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

    line.render();
})
</script>

<template>
  <div>
    <div id="line"></div>
  </div>
</template>

<style lang="scss" scoped>
#line {
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
</style>