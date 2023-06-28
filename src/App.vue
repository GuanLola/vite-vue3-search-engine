<template>
  <router-view></router-view>
</template>

<script lang="ts">
export default {
  // option from self
  msg: "Vue",
  // option from a mixin
  mixins: [
    {
      msg: "Hello ",
    },
  ],
  mounted() {
    // 在 this.$options 上暴露被合并的选项
    console.log(this.$options.msg);
  },
};
</script>

<style scoped></style>
