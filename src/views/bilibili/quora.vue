<template>
  <div class="father">
    <div
      class="son"
      style="
        box-sizing: border-box;
        aspect-ratio: 16 / 9;
        margin-left: -16px;
        margin-right: -16px;
      "
    ></div>
  </div>
</template>

<style scoped>
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
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

.father {
  width: 500px;
  height: 250px;
  background-color: rgb(241, 242, 242);
  overflow: hidden;
}

.son {
  animation: 1.2s linear 0s infinite normal forwards running image_loading;
  background-size: 200% 100%;
  background-repeat: repeat;
  background-color: rgb(241, 242, 242);
  background-image: linear-gradient(
    100deg,
    rgb(241, 242, 242) 5%,
    rgb(228, 230, 230) 20%,
    rgb(241, 242, 242) 35%
  );
}
</style>
