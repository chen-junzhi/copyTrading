<script setup name="CopyTradeDetail">
import { ref, computed, nextTick } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue'
import StatisticalData from '@/components/CopyTradeDetail/StatisticalData.vue'
import LeadData from '@/components/CopyTradeDetail/LeadData.vue'
import FollowUser from '@/components/CopyTradeDetail/FollowUser.vue'

const dayList = ref([{
  label: '7天',
  value: 1
}, {
  label: '30天',
  value: 2
}, {
  label: '90天',
  value: 3
}])

const activeDay = ref(1)

const handleCommand = (command) => {
  activeDay.value = command
  console.log(activeDay.value)
}

const activeDayLabel = computed(() => {
  return dayList.value.find(item => item.value === activeDay.value).label
})

const performanceList = ref([
  {
    label: '回报率',
    tooltips: '回报率是一个效果指标，用于评估交易达人的盈利率或收益率。',
    value: '+41.74%',
    isLight: true
  },
  {
    label: '交易达人盈亏',
    tooltips: '包括已结盈亏和未结盈亏在内的交易达人总盈亏。',
    value: '+4,753.01',
    isLight: true
  },
  {
    label: '胜率',
    tooltips: '交易达人在特定时期的平均胜率。',
    value: '95.45%',
    isLight: false
  },
  {
    label: '跟单用户盈亏',
    tooltips: '所有历史与现有跟单用户产生的总盈亏。由于跟单用户的入场时间和价格各异，交易达人与跟单用户的盈亏可能有所出入。',
    value: '+100,608.43',
    isLight: true
  },
  {
    label: '最大回撤',
    tooltips: '最大回撤较低表示交易达人的交易策略造成的未结亏损相对较小。',
    value: '10.15%',
    isLight: false
  },
  {
    label: '每笔交易平均盈亏',
    tooltips: '交易达人所有已平仓位的平均盈亏。该数值越高，则表明交易达人在收益方面表现更佳。',
    value: '+39.89',
    isLight: true
  },
])

const win = 113
const lost = 4
const progress = Math.floor(win / (win + lost) * 100)

const profitList = ref([
  {
    label: '盈亏比率',
    value: '10.65 : 1',
    tooltips: '盈利订单每单收益与亏损订单每单亏损的比值'
  },
  {
    label: '每周交易次数',
    value: '128.13次',
    tooltips: '交易达人账户近1月平均每周交易次数'
  },
  {
    label: '平均持仓时间',
    value: '9.95 小时',
    tooltips: '历史已平订单的平均持仓时间'
  },
  {
    label: '收益波动率',
    value: '10.66%',
    tooltips: '数值越大，收益越不稳定。'
  },
  {
    label: '夏普比率',
    value: '1.47',
    tooltips: '在相同的收益波动率下，数值越大，收益越高。'
  },
  {
    label: '索提诺比率',
    value: '2.24',
    tooltips: '在相同的亏损风险下，数值越大，收益越高。'
  },
  {
    label: '最近交易时间',
    value: '2023-11-05 16:59:21',
    tooltips: '该交易达人账户最近开仓、平仓操作的时间'
  },
])

const userProfitList = ref([
  {
    name: 'cas**@***',
    amount: '+24,875.20',
    rate: '+0.91%'
  },
  {
    name: 'ta-**@***',
    amount: '+8,772.81',
    rate: '+0.90%'
  },
  {
    name: 'eve**@***',
    amount: '+6,747.88',
    rate: '+1.10%'
  },
  {
    name: 'ozr**@***',
    amount: '+6,462.64',
    rate: '+0.91%'
  },
  {
    name: 'byb**@***',
    amount: '+6,097.15',
    rate: '+1.94%'
  }
])

const tabs = [
  {
    name: 'statistical',
    label: '统计数据',
    components: StatisticalData
  },
  {
    name: 'lead',
    label: '带单数据',
    components: LeadData
  },
  {
    name: 'follow',
    label: '跟单用户',
    components: FollowUser
  },
]
const activeTab = ref('statistical')
const activeComponents = computed(() => {
  return tabs.find(tab => tab.name === activeTab.value).components
})

const handleViewAll = () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
  nextTick(() => {
    activeTab.value = 'follow'
  })
}
</script>

<template>
  <div class="detail-wrapper">
    <div class="left">
      <el-card>
        <template #header>
          <div class="card-header">
            <span class="title">表现</span>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                {{ activeDayLabel }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="item in dayList"
                    :key="item.value"
                    :command="item.value"
                    :class="{ 'is-active': activeDay === item.value }">
                  {{ item.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
        <div class="main">
          <div
            v-for="(item, index) in performanceList"
            :key="item.label"
            class="performance-item">
            <div class="label" :class="[index % 2 === 0 ? 'flex-x-start' : 'flex-x-end']">
              <div>
                <el-tooltip
                  effect="dark"
                  placement="top"
                >
                  <template #content>
                    <p style="max-width: 200px;">{{ item.tooltips }}</p>
                  </template>
                  <div>{{ item.label }}</div>
                </el-tooltip>
              </div>
            </div>
            <div class="value" :class="{ light: item.isLight }">{{ item.value }}</div>
          </div>
        </div>
        <div class="progress">
          <div class="bar flex-y-center flex-x-between">
            <div class="flex-y-center">
              <div class="label">
                <el-tooltip
                  effect="dark"
                  placement="top"
                >
                  <template #content>
                    <p style="max-width: 200px;">已结盈利单的总数</p>
                  </template>
                  <div>盈利</div>
                </el-tooltip>
              </div>
              <div class="win-value">{{ win }}</div>
            </div>
            <div class="flex-y-center">
              <div class="label">
                <el-tooltip
                  effect="dark"
                  placement="top"
                >
                  <template #content>
                    <p style="max-width: 200px;">已结亏损单的总数</p>
                  </template>
                  <div>亏损</div>
                </el-tooltip>
              </div>
              <div class="lose-value">{{ lost }}</div>
            </div>
          </div>
          <el-progress :percentage="progress" :show-text="false" color="#20b26c" />
        </div>
        <div class="profit-list">
          <div
            v-for="item in profitList"
            :key="item.label"
            class="profit-item flex-x-between flex-y-center">
            <div class="label">
              <el-tooltip
                effect="dark"
                placement="top"
              >
                <template #content>
                  <p style="max-width: 200px;">{{ item.tooltips }}</p>
                </template>
                <div>{{ item.label }}</div>
              </el-tooltip>
            </div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
        <div class="tips">计价单位: USDT</div>
      </el-card>
      <div class="user-profit">
        <el-card>
          <template #header>
            <div class="card-header">
              <span class="title">跟单用户收益</span>
              <div class="view-all" @click="handleViewAll()">查看全部 ></div>
            </div>
          </template>
          <div class="user-list">
            <div
              v-for="item in userProfitList"
              :key="item.name"
              class="user-item">
              <div class="name">{{ item.name }}</div>
              <div class="flex-x-between">
                <div class="amount">
                  <div class="label">
                    <el-tooltip
                      effect="dark"
                      placement="top"
                    >
                      <template #content>
                        <p style="max-width: 200px;">跟随该交易达人账户总获利金额</p>
                      </template>
                      <div>累计跟单收益额</div>
                    </el-tooltip>
                  </div>
                  <div class="value">{{ item.amount }}</div>
                </div>
                <div class="rate">
                  <div class="label">
                    <el-tooltip
                      effect="dark"
                      placement="top"
                    >
                      <template #content>
                        <p style="max-width: 200px;">跟随该交易达人账户累计收益总和/累计保证金总和</p>
                      </template>
                      <div>跟单总收益率</div>
                    </el-tooltip>
                  </div>
                  <div class="value">{{ item.rate }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="tips">计价单位: USDT</div>
        </el-card>
      </div>
    </div>
    <div class="right el-card is-always-shadow">
      <el-tabs class="tabs" v-model="activeTab">
        <el-tab-pane v-for="tab in tabs" :key="tab.name" :name="tab.name">
          <template #label>
            <span class="custom-tabs-label">
              <span>{{ tab.label }}</span>
            </span>
          </template>
        </el-tab-pane>
      </el-tabs>
      <div class="body">
        <component :is="activeComponents"></component>
      </div>
    </div>
  </div>
</template>

<style>
.el-dropdown-menu__item.is-active {
  color: #0792ff;
  background-color: #ecf5ff;
}
.el-dropdown-menu__item:not(.is-active):not(.is-disabled):hover {
  background: none;
}
.el-dropdown-menu__item:not(.is-active):not(.is-disabled):focus {
  color: #606266;
  background: none;
}
</style>
<style lang="scss" scoped>
.detail-wrapper {
  max-width: 1200px;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .left {
    width: 360px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-dropdown {
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        color: #121214;
      }
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #121214;
      }
      .el-dropdown-link {
        cursor: pointer;
        // color: var(--el-color-primary);
        display: flex;
        align-items: center;
      }
    }
    .main {
      padding-bottom: 16px;
      border-bottom: 1px solid #f3f5f7;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: -16px;
      .performance-item {
        width: 50%;
        margin-top: 16px;
        &:nth-child(even) {
          text-align: right;
        }
        .value {
          font-size: 18px;
          font-weight: 600;
          line-height: 26px;
          &.light {
            color: #20b26c;
          }
        }
      }
      .label {
        color: #81858c;
        font-size: 14px;
        line-height: 22px;
        cursor: pointer;
      }
    }
    .progress {
      margin-top: 16px;
      .label {
        font-size: 14px;
        font-weight: 600;
        line-height: 26px;
        color: rgba(0,0,0,.85);
        margin-right: 4px;
        cursor: pointer;
      }
      .win-value {
        color: #20b26c;
      }
      .lose-value {
        color: #81858c;
      }
      .bar {
        margin-bottom: 8px;
      }
    }
    .profit-list {
      .profit-item {
        margin-top: 16px;
        font-size: 14px;
        line-height: 22px;
        .label {
          color: #81858c;
          cursor: pointer;
        }
        .value {
          font-weight: 600;
          color: #121214;
        }
      }
    }
    .tips {
      text-align: right;
      color: #adb1b8;
      font-size: 12px;
      margin-top: 16px;
    }
    .user-profit {
      margin-top: 20px;
      .view-all {
        color: #81858c;
        font-size: 16px;
        cursor: pointer;
      }
      .user-list {
        margin-top: -16px;
        .user-item {
          margin-top: 16px;
          .name {
            font-weight: 600;
            font-size: 14px;
            line-height: 22px;
            margin-bottom: 4px;
          }
          .label {
            cursor: pointer;
            font-size: 14px;
            line-height: 18px;
            color: #81858c;
          }
          .value {
            font-weight: 600;
            font-size: 14px;
            line-height: 22px;
            color: #20b26c;
          }
          .rate {
            text-align: right;
          }
        }
      }
    }
  }
  .right {
    width: 816px;
    ::v-deep(.el-tabs__nav) {
      margin-left: 20px;
    }
    ::v-deep(.el-tabs__item) {
      font-weight: 600;
      font-size: 16px;
      color: #81858c;
      &:hover, &.is-active {
        color: #121214;
      }
    }
    .tabs {
      padding: 6px 0 20px;
    }
    .body {
      padding: 0 20px 20px;
    }
  }
}

</style>