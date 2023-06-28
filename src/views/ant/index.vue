<template>
  <div class="container">
    <a-input
      class="my-input"
      v-model:value="title"
      placeholder="标题"
      suffix="最多64个字节"
      @change="changeTitle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const title = ref("");

const changeTitle = () => {
  if (!title.value) return;
  console.log(title.value);
  const byte = new Blob([title.value]).size;
  console.log("字节数", byte);
  if (byte > 64) {
    title.value = truncateStringByBytes(title.value, 64);
  }
};

const truncateStringByBytes = (str, len) => {
  // 匹配字符串中的emoji
  const regex =
    /[\u{1F000}-\u{1F9FF}]|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
  const emojiArr = str.match(regex);

  // 找到所有emoji所在的下标
  let emojiIdx = [];
  emojiArr.map((e) => {
    const char = e;
    const regexSame = new RegExp(char, "g");
    const indexes = [];
    let match;
    while ((match = regexSame.exec(str)) !== null) {
      indexes.push(match.index);
    }
    emojiIdx = [...emojiIdx, ...indexes];
  });
  emojiIdx = Array.from(new Set(emojiIdx));
  emojiIdx.sort((a, b) => a - b);

  // emoji下标+1 （一个emoji字符的长度是2个字符长度）
  const emojiIdxPlusOne = emojiIdx.map((v) => v + 1);

  let num = 0;
  let result = "";
  /**
    数字 1
    英文 1
    中文 3
    emoji 4
  */
  for (let i = 0; i < str.length; i++) {
    if (emojiIdx.includes(i) || emojiIdxPlusOne.includes(i)) {
      num += 2; // emoji 4个字节
    } else {
      num += str.charCodeAt(i) > 255 ? 3 : 1; // 中文3个字节，英文1个字节
    }

    if (num > len) {
      // 如果匹配到emoji的后一半（emoji分两份），为了防止把emoji截断变成乱码，到这里就需要整个emoji去除
      result = str.slice(0, emojiIdxPlusOne.includes(i) ? i - 1 : i);
      break;
    }
  }
  return result;
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  .my-input {
    width: 600px;
  }
}
</style>
