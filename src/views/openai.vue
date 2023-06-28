<template>openai</template>

<script setup lang="ts">
import { Configuration, OpenAIApi } from "openai";

console.log(Configuration);
console.log(OpenAIApi);

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Hello world",
});
console.log(completion.data.choices[0].text);
</script>
