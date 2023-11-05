<script setup>
import { ElMessage } from 'element-plus'
import { useFollowWord } from '@/stores/useFollowWord';
const { followWord, toDetail } = useFollowWord()

const columns = [
  {
    key: 'nickName',
    label: '昵称',
    width: 280
  },
  {
    key: 'ROI',
    label: '7d 投资回报率',
    sortable: true,
    width: 140
  },
  {
    key: 'totalTradeProfit',
    label: '7d 交易达人盈亏',
    width: 160,
    sortable: true
  },
  {
    key: 'totalAllFollowProfit',
    label: '7d 跟单用户盈亏',
    sortable: true,
    width: 160
  },
  {
    key: 'WinRate',
    label: '7d 胜率',
    sortable: true
  },
  {
    key: 'stableScoreLevel',
    label: '稳定性指数',
    sortable: true,
    width: 120
  },
  {
    key: 'Followers',
    label: '跟单人数',
    sortable: true
  },
  {
    key: 'action',
    label: '操作',
    align: 'center',
    width: 130
  },
]

const tableData = [
  {
    nickName: "Lee Pro",
    profilePhoto: "https://s1.bycsi.com/fop/copytrade/f6ac6eb2-38ed-4167-a81a-fba7f93e2427.jpg",
    userTag: [{
      title: '收益冠军'
    },{
      title: '投资回报率冠军'
    }, {
      title: '稳健交易'
    }],
    ROI: '+14.89%',
    totalTradeProfit: '+4,358.77',
    totalAllFollowProfit: '+48,037.13',
    WinRate: '+92.45%',
    stableScoreLevel: '5.0/5.0',
    Followers: '1012',
    status: 2
  },
  {
    nickName: "Rocksteady",
    profilePhoto: "https://s1.bycsi.com/fop/copytrade/677da038-5499-4d00-8df9-327e65606d57.jpg",
    userTag: [{
      title: '高频带单'
    },{
      title: '沙场老兵'
    }],
    ROI: '+51.10%',
    totalTradeProfit: '+3,093.73',
    totalAllFollowProfit: '+22,340.96',
    WinRate: '+90.91%',
    stableScoreLevel: '5.0/5.0',
    Followers: '602',
    status: 2
  },
  {
    nickName: "KriptoDünyamFutures",
    profilePhoto: "https://s1.bycsi.com/fop/copytrade/97c7870b-1898-4500-a4c4-2f0695ce0f2f.png",
    userTag: [{
      title: '收益冠军'
    },{
      title: '常胜将军'
    },{
      title: '高频带单'
    }],
    ROI: '+38.23%',
    totalTradeProfit: '+227.50',
    totalAllFollowProfit: '+15,105.41',
    WinRate: '+78.95%',
    stableScoreLevel: '4.5/5.0',
    Followers: '54',
    status: 1
  },
  {
    nickName: "Pino89",
    profilePhoto: "https://s1.bycsi.com/bybit/deadpool/2a5bed8201c411ed8fbbba6ce010d65b.svg",
    userTag: [{
      title: '高频带单'
    },{
      title: '低杠杆'
    },{
      title: '趋势交易'
    }],
    ROI: '+26.41%',
    totalTradeProfit: '+98,210.69',
    totalAllFollowProfit: '+13,348.14',
    WinRate: '+100.00%',
    stableScoreLevel: '2.5/5.0',
    Followers: '36',
    status: 1
  },
  {
    nickName: "Goichi Hosoda",
    profilePhoto: "https://s1.bycsi.com/fop/copytrade/968ea9f8-8157-460d-8ac1-46a0474e0a38.jpg",
    userTag: [{
      title: '收益冠军'
    },{
      title: '投资回报率冠军'
    },{
      title: '常胜将军'
    }],
    ROI: '+4.53%',
    totalTradeProfit: '+944.18',
    totalAllFollowProfit: '+10,125.34',
    WinRate: '+88.89%',
    stableScoreLevel: '5.0/5.0',
    Followers: '720',
    status: 1
  },
  {
    nickName: "Tubuyaki",
    profilePhoto: "https://s1.bycsi.com/fop/copytrade/ff70ab2d-3bf0-4415-8cc1-a0f53a5c1c16.png",
    userTag: [{
      title: '收益冠军'
    },{
      title: '稳健交易'
    },{
      title: '常胜将军'
    }],
    ROI: '+1.35%',
    totalTradeProfit: '0.00',
    totalAllFollowProfit: '+9,756.31',
    WinRate: '+100.00%',
    stableScoreLevel: '5.0/5.0',
    Followers: '907',
    status: 0
  },
  {
    nickName: "小瓜呆",
    profilePhoto: "https://s1.bycsi.com/fop/copytrade/e6aa12d9-6125-4c8a-96cb-cd56281147a7.png",
    userTag: [{
      title: '沙场老兵'
    }],
    ROI: '+14.54%',
    totalTradeProfit: '+215.00',
    totalAllFollowProfit: '+8,918.37',
    WinRate: '+80.00%',
    stableScoreLevel: '2.5/5.0',
    Followers: '402',
    status: 1
  },
  {
    nickName: "Sicario",
    profilePhoto: "https://s1.bycsi.com/fop/copytrade/208b70bc-ec9d-42d2-b5a9-f7937fea1a8c.jpg",
    userTag: [{
      title: '收益冠军'
    },{
      title: '稳健交易'
    },{
      title: '低杠杆'
    }],
    ROI: '+1.78%',
    totalTradeProfit: '+21.94',
    totalAllFollowProfit: '+7,403.33',
    WinRate: '+20.93%',
    stableScoreLevel: '5.0/5.0',
    Followers: '9',
    status: 1
  },
]

const handlePageChanged = (pageNo) => {
  ElMessage({
    message: `切换第${pageNo}页数据`,
    type: 'success',
  })
}
</script>


<template>
  <el-table
    :data="tableData"
    :default-sort="{ prop: 'totalAllFollowProfit', order: 'descending' }"
    style="width: 100%"
    @row-click="toDetail"
  >
    <el-table-column
      v-for="column in columns"
      :key="column.key"
      :prop="column.key"
      :label="column.label"
      :width="column.width"
      :sortable="column.sortable"
      :formatter="column.formatter"
      :align="column.align"
    >
      <template #header>
        {{ column.label }}
      </template>
      <template #default="scope">
        <template v-if="column.key === 'nickName'">
          <div class="user">
            <img class="avatar" :src="scope.row.profilePhoto" />
            <div class="info">
              <div class="nickname">{{ scope.row.nickName }}</div>
              <div class="tag-list">
                <div class="tag" v-for="item in scope.row.userTag" :key="item.title">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <div class="btn-wrap">
            <el-button :type="scope.row.status === 2 ? 'danger' : 'primary'" @click.stop="followWord(scope.row)">
              <span>{{ scope.row.status === 2 ? '已满员' : '跟单' }}</span>
              <div v-if="scope.row.status === 0" class="btn-mask"></div>
            </el-button>
          </div>
        </template>
        <template v-else>{{ [null, ''].includes(scope.row[column.key]) ? '/' : scope.row[column.key] }}</template>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination background layout="prev, pager, next" :total="1000" @current-change="handlePageChanged" />
  </div>
</template>

<style lang="scss" scoped>
.el-table {
  color: rgba(0,0,0,.85);
  font-weight: 500;
  ::v-deep(tr) {
    cursor: pointer;
  }
}
.user {
  display: flex;
  align-items: center;
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .info {
    margin-left: 12px;
    flex: 1;
    .nickname {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #000;
      font-size: 16px;
    }
    .tag-list {
      height: 18px;
      margin-top: 8px;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      .tag {
        &:not(:last-child) {
          margin-right: 8px;
        }
        color: #3ead5d;
        background: rgba(119,186,118,.14);
        font-size: 10px;
        line-height: 16px;
        padding: 0 4px;
      }
    }
  }
}
.btn-wrap {
  position: relative;
  .el-button {
    width: 110px;
  }
}
.btn-mask {
  position: absolute;
  background-color: rgba(0,0,0,.3);
  width: 110px;
  height: 32px;
  z-index: 11;
  left: 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: "";
    width: 13px;
    height: 14px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAyCAYAAAAus5mQAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHrSURBVHgB7ZmLbYMwEIaPqgOkG5AJmg1CJ2i6Ad2ADcIGyQbpBu0GoRMknYBsEDa43tVEipLDAZ+xiMonnQDjO//CbwMwoiMCBYg4o8srWUIW18ZUZHuyb7KPKIoOEBIWRrbF9nDeGEJABS3RnSX0CRWwQT0b6AMKvEJ/rMAnFDC1FFaSZXjWxtC00bR+10QKPuCCLQWtW/jnDb5Hsgloweavl3eIkWtj2IKXQuDODZ18PoU4O9CApnolYuiIa6yHG3FnQlrhMjPUPoXwKrH5uQj8AXckX2tHuSVQogJ3JF/vAoMyCtQyeIGPUiKNTQmYHjwXXs8VM0BTvIyuexqKCqs3ZVygfYLvmxKbFhGoW4j6ZjlkcSe42iFCMxeWMEym3Ema9gkFmF1ZCJ7JFkJ6xtW7Ez5vDoGhMteCjpKrGIX8T9TlNXOui0Cek4+X6aJAEqfa0LsiabnPmcSFuorS+vHL23GHNABBR/B651eiw45N0uKrinmIiM+e+T4FD/gSOGmZ1plxPahlFKhlFKjl3wgshLQ9+MDHVFfH4TPAY20ZOCBpGZdbWu5C4NXSHs3JQlDQ/Fa7pOIXW6Ftlg0OfYlLUD7R2HInSSlPP39/9Lz/9VY0p+3BvlhLDjSYTE+d5I0TYDgcyF745hdCqgaxBtl5FQAAAABJRU5ErkJggg==) 50% no-repeat;
    background-size: 13px 14px;
  }
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}
</style>