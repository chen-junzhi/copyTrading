<script setup>
import { Line, Area } from '@antv/g2plot'
import { computed, onMounted } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => {}
  },
  id: {
    type: String,
    default: ''
  }
})

const cardData = computed(() => {
  return props.data.map(item => {
    return {
      time: item.statisticDate,
      value: item.trendValue / 100
    }
  })
})


onMounted(() => {
  console.log(cardData.value)
  const linePlot = new Area(props.id, {
    padding: [10, -6, 4, 38],
    autoFit: true,
    data: cardData.value,
    xField: 'time',
    yField: 'value',
    smooth: true,
    areaStyle: {
      fill: '#a1dfc0'
    },
    line: {
      color: '#20b26c'
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
      grid: {
        visible: false
      }
    },
    tooltip: false,
    annotations: [
      {
        type: 'line',
        start: ['min', 'min'],
        end: ['max', 'min'],
        style: {
          lineDash: [2, 3],
        },
        text: {
          content: `${Math.min(...cardData.value.map(i => i.value))}%`,
          offsetX: -4,
          offsetY: 5,
          style: {
            fontSize: 10,
            fill: '#999',
            textAlign: 'right'
          }
        }
      },
      {
        type: 'line',
        start: ['min', 'max'],
        end: ['max', 'max'],
        style: {
          lineDash: [2, 3],
        },
        text: {
          content: `${Math.max(...cardData.value.map(i => i.value))}%`,
          offsetX: -4,
          offsetY: 5,
          style: {
            fontSize: 10,
            fill: '#999',
            textAlign: 'right'
          }
        }
      },
    ],
  })
  linePlot.render()
})

</script>

<template>
  <div :id="id" style="height: 52px;"></div>
</template>