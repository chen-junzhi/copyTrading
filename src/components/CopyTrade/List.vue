<script setup>
import { ref, computed } from "vue"
import { CaretTop, CaretBottom } from '@element-plus/icons-vue'
import chartLine from './ChartLine.vue'
import { useFollowWord } from '@/stores/useFollowWord';
const { followWord, toDetail } = useFollowWord()

const props = defineProps({
  listData: {
    type: Array,
    default: () => []
  }
})

const currentIndex = ref(0)

const defaultBg = 'https://s1.bycsi.com/bybit/deadpool/9c17a00e648811ed890b8e79ed0a92f0.png'
const bannerBg = ref([
  'https://s1.bycsi.com/bybit/deadpool/704be805648811ed890b8e79ed0a92f0.png',
  'https://s1.bycsi.com/bybit/deadpool/84f87add648811ed890b8e79ed0a92f0.png',
  'https://s1.bycsi.com/bybit/deadpool/90f1e2cf648811ed890b8e79ed0a92f0.png',
  defaultBg
])

const rate = computed(() => {
  return (yesToday, today) => {
    if (yesToday < today) {
      return (((today - yesToday) / yesToday) * 100).toFixed(2) + '%'
    } else {
      return (((today - yesToday) / yesToday) * 100).toFixed(2) + '%'
    }
  }
})

const metricsValue = computed(() => {
  return (index, value) => {
    if (index === 1) {
      return '+' + (value / 100) + '%'
    } else if (index === 2) {
      return (value / 100) + '%'
    } else if (index === 3) {
      return (+(value / 100000000).toFixed(2)).toLocaleString()
    }
  }
})

</script>

<template>
  <div class="list__overflow">
    <div class="list-box">
      <div class="copyTrade-recommendCard"
            v-for="(cardData, cardIndex) in listData"
            :class="[['card' + cardIndex]]"
            :key="cardData.nickName"
            @click="toDetail(cardData)">
        <div class="copyTrade-recommendCard-top">
          <img class="copyTrade-recommendCard-top-banner"
                :src="cardIndex < 3 ? bannerBg[cardIndex] : defaultBg" />
          <div class="copyTrade-recommendCard-top-tips">{{ `No.0${currentIndex * 4 + cardIndex + 1}` }}</div>
          <div class="copyTrade-recommendCard-top-inf">
            <div class="copyTrade-recommendCard-avatar-box">
              <img :src="cardData.profilePhoto"
                    loading="lazy"
                    class="copyTrade-recommendCard-avatar-img">
            </div>
            <div class="copyTrade-recommendCard-top-nameBox">
              <div class="copyTrade-recommendCard-top-name">
                <div class="leader-grade_level-name-box">
                  <div class="leader-grade_level-name">{{ cardData.nickName }}</div>
                </div>
              </div>
              <div class="copyTrade-recommendCard-top-followers">
                {{ cardData.currentFollowerCount }} 跟单人数
                <div class="copyTrade-recommendCard-top-followers-percent share-grow-text">
                  <el-icon class="icon" :class="{ 'top': cardData.currentFollowerCount - cardData.yesterdayMaxFollowerCount >= 0 }">
                    <CaretTop v-if="cardData.currentFollowerCount - cardData.yesterdayMaxFollowerCount >= 0" />
                    <CaretBottom v-else />
                  </el-icon>{{ rate(cardData.yesterdayMaxFollowerCount, cardData.currentFollowerCount) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copyTrade-recommendCard-bottom">
          <div class="copyTrade-recommendCard-detail">
            <div class="copyTrade-recommendCard-detail-item">
              <div class="copyTrade-recommendCard-detail-item-title-wrap">
                <div class="copyTrade-recommendCard-detail-item-title-wrap-title">
                  <el-tooltip
                    effect="dark"
                    placement="top"
                  >
                    <template #content>
                      <p style="max-width: 200px;">{{ cardData.metricsInfoList?.[0]?.metricsDesc }}</p>
                    </template>
                    <div class="copyTrade-recommendCard-title-inside">
                      <div class="copyTrade-recommendCard-title-text">
                        {{ cardData.metricsInfoList?.[0]?.metricsName }}
                      </div>
                      <div class="copyTrade-recommendCard-title-tips">
                        {{ cardData.metricsInfoList?.[0]?.metricsDuration }}
                      </div>
                    </div>
                  </el-tooltip>
                </div>
                <div class="copyTrade-recommendCard-detail-item-title-wrap-value">
                  {{ '+' + (cardData.metricsInfoList?.[0]?.metricsValue / 100) + '%' }}
                </div>
              </div>
              <div class="copyTrade-recommendCard-detail-line">
                <chartLine :data="cardData.yieldTrendList" :id="cardData.leaderUserId + '-' + cardIndex"></chartLine>
              </div>
            </div>
            <div class="copyTrade-recommendCard-detail-item" v-for="(item, index) in cardData.metricsInfoList" :key="index">
              <div class="copyTrade-recommendCard-title" v-if="index > 0">
                <el-tooltip
                  effect="dark"
                  placement="top"
                >
                  <template #content>
                    <p style="max-width: 200px;">{{ cardData.metricsInfoList?.[index]?.metricsDesc }}</p>
                  </template>
                  <div class="copyTrade-recommendCard-title-inside">
                    <div class="copyTrade-recommendCard-title-text">
                      {{ cardData.metricsInfoList?.[index]?.metricsName }}
                    </div>
                    <div class="copyTrade-recommendCard-title-tips" v-if="index !== cardData.metricsInfoList.length - 1">
                      {{ cardData.metricsInfoList?.[index]?.metricsDuration }}
                    </div>
                  </div>
                </el-tooltip>
              </div>
              <div class="copyTrade-recommendCard-value share-grow-text" v-if="index > 0">
                {{ metricsValue(index, cardData.metricsInfoList?.[index]?.metricsValue) }}
              </div>
            </div>
          </div>
          <span class="trader-follow-btn-container">
            <el-button type="primary" class="btn" @click.stop="followWord(cardData)">跟单</el-button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.el-tooltip__popper {
  max-width: 100px;
}
</style>
<style lang="scss" scoped>
.list__overflow {
  overflow-x: auto;
  display: flex;
}
.list-box {
  display: flex;
  .copyTrade-recommendCard {
    width: 320px;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border: 0.5px solid #f3f5f7;
    position: relative;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
    &:not(:first-child) {
      margin-left: 24px;
    }
    &:hover {
      box-shadow: 0 0 32px rgba(247, 166, 0, 0.3);
    }
    .copyTrade-recommendCard-top {
      height: 124px;
      border-radius: 8px 8px 0 0;
      position: relative;
      &-banner {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
    }
    .copyTrade-recommendCard-top-tips {
      border-radius: 0 8px 0 24px;
      position: absolute;
      top: 0;
      right: 0;
      width: 88px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #fff;
      z-index: 2;
      background-color: #d5dae0;
    }
    &.card0 {
      .copyTrade-recommendCard-top-tips {
        background-color: rgba(194, 137, 0, 0.3);
      }
    }
    &.card1 {
      .copyTrade-recommendCard-top-tips {
        background-color: #d2daea;
      }
    }
    &.card2 {
      .copyTrade-recommendCard-top-tips {
        background-color: #e6c29d;
      }
    }
    .copyTrade-recommendCard-top-inf {
      display: flex;
    }
    .copyTrade-recommendCard-avatar-img {
      width: 80px;
      height: 80px;
      z-index: 9;
      overflow: hidden;
      margin-top: 40px;
      display: block;
      -o-object-fit: cover;
      object-fit: cover;
      margin-left: 20px;
    }
    .copyTrade-recommendCard-top-nameBox {
      margin-top: 54px;
      color: #121214;
      max-width: 184px;
      z-index: 2;
      margin-left: 10px;
      .leader-grade_level-name {
        height: 28px;
        line-height: 28px;
        font-weight: 600;
        font-size: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .leader-grade_level-name-box {
          display: flex;
          align-items: center;
          .leader-grade_level-name {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-right: 4px;
          }
          .leader-grade_level-icon.leader-grade_level-icon--middle {
            width: 20px;
            height: 20px;
          }
        }
      }
      .copyTrade-recommendCard-top-followers {
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        margin-top: 10px;
        display: flex;
        .copyTrade-recommendCard-top-followers-percent {
          margin-left: 3.5px;
          display: flex;
          align-items: center;
          .icon {
            font-size: 16px;
            color: #ef454a;
            &.top {
              color: #20b26c;
            }
          }
        }
      }
    }
    .copyTrade-recommendCard-bottom {
      padding-bottom: 24px;
      .copyTrade-recommendCard-detail {
        padding: 12px 24px 16px;
        &-item {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2px;
          .copyTrade-recommendCard-detail-line {
            width: 144px;
            height: 52px;
            margin-top: 4px;
          }
          &-title-wrap-title {
            width: fit-content;
          }
          &-title-wrap-value {
            font-weight: 700;
            font-size: 28px;
            line-height: 40px;
            margin-top: 6px;
            margin-bottom: 8px;
          }
          .copyTrade-recommendCard-value {
            font-weight: 500;
            font-size: 14px;
            line-height: 22px;
            color: #121214;
          }
        }
        .copyTrade-recommendCard-title-inside {
          display: flex;
          align-items: center;
          .copyTrade-recommendCard-title-text {
            font-size: 12px;
            line-height: 18px;
            color: #81858c;
          }
          .copyTrade-recommendCard-title-tips {
            margin-left: 4px;
            padding: 0 4.2px;
            height: 14.4px;
            font-size: 12px;
            zoom: .83;
            border: 0.5px solid #adb1b8;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            color: #81858c;
          }
        }
      }
      .trader-follow-btn-container {
        width: calc(100% - 48px);
        display: inline-block;
        margin-left: 24px;
        .btn {
          width: 100%;
        }
      }
    }
  }
}
</style>