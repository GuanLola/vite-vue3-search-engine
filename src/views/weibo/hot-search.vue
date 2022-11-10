<template>
  <div class="weibo-hot-search">
    <div class="banner">
      <video loop autoplay muted src="@/assets/images/weibo/weibo_login.mp4" />
    </div>

    <div class="content">
      <div class="content-item" v-for="(item, key) in state.list" :key="key">
        <a
          class="box-item"
          :href="`https://s.weibo.com/weibo?q=%23${item.note}%23`"
          target="_blank"
        >
          <img
            v-if="!key"
            src="@/assets/images/weibo/hot-rank-top.png"
            alt=""
          />
          <div v-else-if="[1, 2, 3].includes(key)" :class="rankClass(key)">
            <span>{{ key }}</span>
          </div>
          <div v-else class="rank rank-default">
            <span>{{ key + 1 }}</span>
          </div>
          <span class="note">{{ item.note }}</span>
          <span
            v-if="item.label_name"
            :class="{
              'new-icon': item.label_name === '新',
              'hot-icon': item.label_name === '沸',
            }"
          >
            {{ item.label_name }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { Weibo } from "@/api/weibo/index";

interface Istate {
  list: any[];
}

interface IObj {
  rank: boolean;
  [propName: string]: any;
}

const state: Istate = reactive({
  list: [],
});

const getList = async () => {
  const res = await Weibo.getList();
  state.list = res.data.realtime;
};

const rankClass = (key: number) => {
  const obj: IObj = {
    rank: true,
  };
  obj["rank-no-" + key] = true;
  return obj;
};

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped>
.weibo-hot-search {
  background: #0c0c0c;
  width: 100%;
  min-height: 100%;
  .banner {
    width: 100%;
    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .content {
    width: 640px;
    margin: auto;
    color: #fff;

    .content-item {
      padding: 12px 16px;
      margin: 10px 0 0;
      font-size: 18px;
      font-weight: 700;
      color: #d3d3d3;
      border: 1px solid #202025;
      cursor: pointer;

      &:hover {
        .note {
          color: #f38511;
        }
      }

      .box-item {
        display: flex;
        align-items: center;

        img {
          width: 48px;
          height: 19px;
          margin: 0 6px 0 8px;
        }

        .rank {
          width: 45.46px;
          height: 22.79px;
          margin: -5px 6px 0 8px;
          background-repeat: no-repeat;
          background-size: 100%;
          position: relative;

          span {
            position: absolute;
            left: auto;
            right: 28.5%;
            bottom: -2px;
            font-size: 14px;
            font-weight: 500;
          }
        }

        .rank-default {
          background-image: url("../../assets/images/weibo/hot-rank-default.png");
          width: 32px;
          height: 18px;
          margin: 0 6px 0 8px;
          span {
            right: 24%;
          }
        }

        .rank-no-1 {
          background-image: url("../../assets/images/weibo/hot-rank-1.png");
        }
        .rank-no-2 {
          background-image: url("../../assets/images/weibo/hot-rank-2.png");
        }
        .rank-no-3 {
          background-image: url("../../assets/images/weibo/hot-rank-3.png");
        }

        .new-icon,
        .hot-icon {
          display: inline-block;
          height: 20px;
          border-radius: 4px;
          line-height: 20px;
          text-align: center;
          font-size: 14px;
          padding: 0 3px;
          width: auto;
          margin-left: 10px;
        }
        .new-icon {
          background: rgb(255, 56, 82);
        }
        .hot-icon {
          background: rgb(248, 100, 0);
        }
      }
    }
  }
}
</style>
