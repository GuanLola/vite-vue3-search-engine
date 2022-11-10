<template>
  <div class="bilibili-popular-rank">
    <div class="header-bar"></div>
    <div class="rank-list-wrap">
      <ul class="rank-list">
        <li class="rank-item" v-for="(item, key) in state.list" :key="key">
          <div class="content">
            <div class="img">
              <a :href="item.short_link" target="_blank">
                <img
                  class="lazy-image cover"
                  :src="attachImageUrl(item.pic)"
                  lazy="loaded"
                  alt=""
                />
              </a>
              <i :class="iClass(key)">
                <svg
                  viewBox="0 0 41 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="rank-icon"
                >
                  <path
                    fill-rule="evenodd"
                    bilibili-popular-rank
                    clip-rule="evenodd"
                    d="M0 0H41C36.4908 2.23529 33.1107 6.24084 31.6656 11.0618L27.6131 24.5817C26.6491 27.7975 23.6896 30 20.3324 30H0V0Z"
                    :fill="`url(#rank-linear-${key})`"
                  ></path>
                  <defs>
                    <linearGradient
                      :id="`rank-linear-${key}`"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="30"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop class="start"></stop>
                      <stop offset="1" class="end"></stop>
                    </linearGradient>
                  </defs>
                </svg>

                <span>{{ key + 1 }}</span>
              </i>
            </div>
            <div class="info">
              <a class="title" :href="item.short_link" target="_blank">
                {{ item.title }}
              </a>
              <div class="detail">
                <a
                  target="_blank"
                  :href="'https://space.bilibili.com/' + item.owner.mid"
                >
                  <span class="data-box up-name">
                    <img src="@/assets/images/bilibili/icon_up.png" alt="" />
                    {{ item.owner.name }}
                  </span>
                </a>

                <div class="detail-state">
                  <span class="data-box">
                    <img src="@/assets/images/bilibili/play.png" alt="play" />
                    {{ formatViewCount(item.stat.view) }}
                  </span>
                  <span class="data-box">
                    <img src="@/assets/images/bilibili/like.png" alt="like" />
                    {{ formatViewCount(item.stat.danmaku) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { Bilibili } from "@/api/bilibili/index";
import { formatCount } from "@/utils/index";
import { useRoute } from "vue-router";
const route = useRoute();

console.log(">>>", route, route.params, route.query);

interface IState {
  list: any[];
}

interface IObj {
  num: boolean;
  [propName: string]: any;
}

const state: IState = reactive({
  list: [],
});

const getList = async () => {
  const res = await Bilibili.getList({ id: 0, type: "all" });
  state.list = res.data.list;
};

const attachImageUrl = (srcUrl: string) => {
  if (srcUrl) {
    return srcUrl.replace(
      /http\w{0,1}:\/\/p/g,
      "https://images.weserv.nl/?url=p"
    );
  }
};

const formatViewCount = (num: number) => {
  return formatCount(num);
};

const iClass = (key: number) => {
  const k = "num" + (key + 1);
  const obj: IObj = {
    num: true,
  };

  obj[k] = true;

  return obj;
};

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped>
.bilibili-popular-rank {
  .header-bar {
    z-index: 0;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 0 auto;
    min-width: 1000px;
    min-height: 155px;
    height: 9.375vw;
    max-height: 240px;
    background-color: #e3e5e7;
    background-position: center 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("../../assets/images/bilibili/top-bg.jpg");
  }

  .rank-list-wrap {
    max-width: 1286px;
    margin: 0 auto;
    padding: 0 0 80px;

    &:hover {
      a {
        color: #00a1d6;
      }
    }

    .rank-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .rank-item {
        width: calc(50% - 5px);

        .content {
          display: flex;
          padding: 20px 0;
          overflow: hidden;

          .img {
            width: 206px;
            height: 116px;
            background: #e7e7e7;
            border-radius: 2px;
            overflow: hidden;
            flex-shrink: 0;
            position: relative;

            a {
              display: block;
              width: 100%;
              height: 100%;

              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }

            .num {
              position: absolute;
              top: 0;
              left: 0;
              line-height: 30px;
              text-align: center;
              font-size: 16px;
              font-weight: 700;

              .rank-icon {
                width: 41px;
                height: 30px;
              }

              span {
                position: absolute;
                top: 0;
                left: 0;
                width: 28px;
                text-align: center;
              }

              .start {
                stop-color: #7b859a;
              }

              .end {
                stop-color: #7b859a;
              }
            }

            .num1 {
              .start {
                stop-color: #fffd8c;
              }

              .end {
                stop-color: #ffa30d;
              }
            }

            .num2 {
              .start {
                stop-color: #c2f4ff !important;
              }

              .end {
                stop-color: #88a5d2 !important;
              }
            }

            .num3 {
              .start {
                stop-color: #ffe4c7;
              }

              .end {
                stop-color: #ed9487;
              }
            }
          }
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 10px;
          padding-right: 70px;
          height: 116px;
          cursor: pointer;

          &:hover {
            .title {
              color: #00a1d6;
            }
          }

          .title {
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #212121;
            display: inline-block;
            font-weight: 700;
          }

          .detail {
            margin-top: 20px;
            color: #999;
            font-size: 12px;

            .data-box {
              display: flex;
              align-items: center;
              margin: 4px 12px 0 0;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }

            img {
              width: 16px;
              height: 16px;
              margin-right: 5px;
              display: inline-block;
            }

            a {
              display: block;
            }

            .detail-state {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1310px) {
  .rank-list-wrap {
    width: 1070px;
  }
}
</style>
