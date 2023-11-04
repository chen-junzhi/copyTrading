<script setup>
import { ref } from 'vue'
import { TrendCharts, Menu, Search, Right } from '@element-plus/icons-vue'
import { listData } from '@/utils/data'
import List from '@/components/CopyTrade/List.vue'
import All from '@/components/CopyTrade/All.vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('top')

const keyword = ref('')

const toMore = () => {
  activeTab.value = 'all'
}

const handleSearch = () => {
  ElMessage.success(`搜索内容：${keyword.value}`)
  toMore()
}
</script>
<template>
  <div class="trader-list">
    <div class="trader-list__switch-box">
      <div class="trader-list__switch-box-left">
        <el-tabs class="tabs" v-model="activeTab">
          <el-tab-pane name="top">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon class="icon">
                  <TrendCharts />
                </el-icon>
                <span>顶级交易达人</span>
              </span>
            </template>
            <div class="leader-recommend">
              <div class="leader-recommend-item" v-for="(item, index) in listData" :key="index">
                <div class="leader-recommend-item-top">
                  <div class="leader-recommend-item-top_title_box">
                    <div class="leader-recommend-title">{{ item.title }}</div>
                    <div class="leader-recommend-subTitle">{{ item.description }}</div>
                  </div>
                  <div class="leader-recommend_more" @click="toMore()">
                    了解详情
                    <el-icon class="arrow">
                      <Right />
                    </el-icon>
                  </div>
                </div>
                <div class="leader-recommend-item-scroll">
                  <List :list-data="item.leaderRecommendDetailList"></List>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="all">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon class="icon">
                  <Menu />
                </el-icon>
                <span>全部交易达人</span>
              </span>
            </template>
            <All />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="trader-list__switch-box-right">
        <el-input v-model="keyword"
                  class="search-input"
                  placeholder="搜索交易达人"
                  clearable
                  :suffix-icon="!keyword ? Search : ''"
                  @keyup.enter="handleSearch" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.trader-list {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.trader-list__switch-box {
  position: sticky;
  top: 0;
  z-index: 9;
  margin-top: 20px;
  display: flex;
  background: #fff;
  align-items: center;
  width: 1200px;
  .trader-list__switch-box-left {
    width: 100%;
  }
  .trader-list__switch-box-right {
    .search-input {
      width: 240px;
      position: absolute;
      top: 20px;
      right: 0;
    }
  }
}
::v-deep(.el-tabs__item) {
  height: 70px;
  font-size: 20px;
  color: #adb1b8;
  font-weight: 600;
  &.is-active {
    color: #121214;
    .custom-tabs-label .icon {
      color: var(--el-color-primary);
    }
  }
}
.custom-tabs-label {
  .icon {
    vertical-align: middle;
    margin: 0 10px 4px 0;
    font-size: 18px;
  }
}
.leader-recommend {
  width: 1200px;
  .leader-recommend-item {
    &:first-child {
      margin-top: 22px;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .leader-recommend-title {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #121214;
      }
      .leader-recommend-subTitle {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        margin-top: 4px;
        color: #81858c;
      }
      .leader-recommend_more {
        display: flex;
        align-items: center;
        color: var(--el-color-primary);
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        .arrow {
          margin-left: 10px;
        }
      }
    }
    &-scroll {
      padding: 26px 0 48px;
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
