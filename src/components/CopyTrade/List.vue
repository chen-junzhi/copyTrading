<script setup>
import { ref, computed } from "vue"
import { CaretTop, CaretBottom } from '@element-plus/icons-vue'

const props = defineProps({
  listData: {
    type: Array,
    default: () => []
  }
})

const totalPage = computed(() => {
  return Math.ceil(props.listData.length / 4)
})

const cardList = computed(() => {
  return props.listData.slice(currentIndex.value * 4, currentIndex.value * 4 + 4)
})

const currentIndex = ref(0)
const handleChange = (index) => {
  currentIndex.value = index
}

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
</script>

<template>
  <el-carousel :interval="4000"
               height="200px"
               indicator-position="none"
               :autoplay="false"
               :loop="false"
               arrow="always"
               @change="handleChange">
    <el-carousel-item v-for="page in totalPage"
                      :key="page">
      <div class="list-box">
        <div class="copyTrade-recommendCard"
             v-for="(cardData, cardIndex) in cardList"
             :class="{ ['card' + cardIndex]: page === 1 }"
             :key="cardData.nickName">
          <div class="copyTrade-recommendCard-top">
            <img class="copyTrade-recommendCard-top-banner"
                 :src="page === 1 ? bannerBg[cardIndex] : defaultBg" />
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
                    <div class="leader-grade_level-name">Crypto Musk</div>
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
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="scss" scoped>
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
      width: 70px;
      height: 80px;
      z-index: 9;
      overflow: hidden;
      margin-top: 30px;
      display: block;
      -o-object-fit: cover;
      object-fit: cover;
      margin-left: 20px;
    }
    .copyTrade-recommendCard-top-nameBox {
      margin-top: 44px;
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
  }
}
</style>