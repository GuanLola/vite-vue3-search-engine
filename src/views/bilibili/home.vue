<template>
  <div class="main">
    <div class="pic-card">
      <picture class="skeleton">
        <div v-if="data.loading" class="cover"></div>
        <img v-if="!data.loading && data.url" :src="data.url" alt="" />
      </picture>
    </div>

    <div class="description">
      <div class="skeleton title" :class="{ white: !data.loading }">
        <div v-if="data.loading" class="cover"></div>
        <div v-else>求求你给我一个认识你的机会呜呜</div>
      </div>
    </div>

    <div class="description">
      <div class="skeleton content" :class="{ white: !data.loading }">
        <div v-if="data.loading" class="cover"></div>
        <div v-else>紫菜蛋花兔兔</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";

const data = reactive({
  loading: true,
  url: "",
});

const fakeApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

const getList = async () => {
  data.loading = true;
  await fakeApi();
  data.loading = false;
  data.url =
    "https://i0.hdslb.com/bfs/live/user_cover/bf8980244ea0230d5a7679445ad1c75c36e31afd.jpg@672w_378h_1c_!web-home-common-cover.avif";
};

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped>
.main {
  padding: 50px;

  .pic-card,
  .description {
    position: relative;
    width: 280px;
    height: 150px;
    border-radius: 6px;
  }
  .skeleton {
    background-color: #f1f2f3;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    overflow: hidden;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: inherit;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .skeleton .cover {
    animation: image_loading 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    background: linear-gradient(-45deg, #f1f2f3 25%, #ffffff 45%, #f1f2f3 65%);
    bottom: -20%;
    content: "";
    display: block;
    height: 140%;
    left: 0;
    position: absolute;
    top: -20%;
    width: 100%;
  }
  .white {
    background: #ffffff;
  }
  .description {
    margin-top: 10px;
    width: 260px;
    height: 20px;

    .title {
      line-height: 20px;
      font-size: 14px;
      color: #212121;
      display: inline-block;
      font-weight: 700;
    }
    .content {
      width: 200px;
      display: flex;
      align-items: center;
      margin: 4px 12px 0 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #999;
      font-size: 12px;
    }
  }
}
@keyframes image_loading {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  to {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}
</style>
