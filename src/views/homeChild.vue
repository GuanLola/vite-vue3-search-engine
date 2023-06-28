<template>
  <h1 ref="childMsg">我是儿子</h1>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const childMsg = ref("childMsg");

const handleChangeMsg = () => {
  childMsg.value = "修改了吗？？？";
};

const props = defineProps<{
  msg?: string;
}>();
console.log("data", props.msg);

defineExpose({ childMsg, handleChangeMsg });
</script>
