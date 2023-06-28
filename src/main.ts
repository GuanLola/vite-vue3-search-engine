import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/css/main.scss";

const app = createApp(App);

import { Base64 } from "js-base64";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// import { Table } from "ant-design-vue";

import STable from "@surely-vue/table";
import "@surely-vue/table/dist/index.css";

// const { proxy } = getCurrentInstance()
// console.log(proxy.$httpUrl)

const Base64Api = () => {
  app.config.globalProperties.$Base64 = Base64;
  return Base64;
};

window.$Base64 = Base64Api;

// 为  `msg` 定义一个合并策略函数
app.config.optionMergeStrategies.msg = (parent: any, child: any) => {
  // console.log("parent", parent, "child", child);
  return (parent || "") + (child || "");
};

app.use(createPinia());
app.use(router).use(Antd).use(STable);

app.mount("#app");

// console.log("app", app);
