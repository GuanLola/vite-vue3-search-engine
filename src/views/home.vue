<template>
  <div class="home">
    <div class="main">
      <ul class="site-box-ul">
        <li
          v-for="(item, key) in state.siteUrl"
          :key="key"
          @mouseover="hoverItem(item)"
          @click="goPage"
        >
          <img :src="item.src" alt="" />
        </li>
      </ul>

      <ul class="nav">
        <a
          v-for="(item, key) in state.navUrl"
          :key="key"
          :href="item.href"
          target="_blank"
        >
          <img :src="item.src" alt="" />
        </a>
      </ul>
    </div>

    <a-table
      bordered
      :columns="columns"
      :data-source="data"
      :row-selection="rowSelection"
    >
      <template #expandedRowRender="{ record }">
        <p style="margin: 40px">{{ record.name }}</p>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { Table } from "ant-design-vue";
// const { push } = useRouter();
const router = useRouter();

const username = "jack";

const goPage = () => {
  // router.push("b-popular-rank"); //
  // router.push("/b-popular-rank"); //
  // router.push({ path: "b-popular-rank" }); //
  // router.push("/b-popular-rank"); //
  // router.push({ name: "BilibiliPopularRank" }); //
  // router.push({ name: "BilibiliPopularRank", params: { username } }); //
  router.push({ path: "/b-popular-rank", query: { username } }); //

  // router.push({ path: `/b-popular-rank/${username}` });
};

const buy = [
  {
    name: "tmall",
    src: "",
    href: "https://redirect.simba.taobao.com/rd?c=un&amp;w=bd&amp;f=https%3A%2F%2Fs.click.taobao.com%2Ft%3Funion_lens%3DlensId%253AOPT%25401615280124%25402104be69_0782_1781632b34a_ced8%254001%253BeventPageId%253A8655681%26e%3Dm%253D2%2526s%253Dv%252Bp6OF1HixccQipKwQzePCperVdZeJviePMclkcdtjxyINtkUhsv0MS6Blk41Mgmiybki%252FObwflD415GGSsrJ4YxhNUZ2i3GTlT4SLzYDiBT2M421%252BABgTvflh4%252Fhqj89CGjsatFbg%252FkxFiXT%252FI5kZuVJ2zJE2c0ACFpTaudtkEaHks2%252FfPFu3EqY%252Bakgpmw%26pid%3Dmm_131955459_43834449_111741300360&amp;k=67a22f436b17a341&amp;p=mm_131955459_43834449_111741300360",
    title: "??????",
  },
  {
    name: "jd",
    src: "",
    href: "https://union-click.jd.com/jdc?e=618%7Cpc%7C&amp;p=JF8BAKwJK1olXDYDZBoCUBVIMzZNXhpXVhgcDwYNXRNHXHBTTkRHA1ocZEA-ClV_QRx8ewVdHVFiDyJUDThyYSkEF2sVXgUGVVxVCUoRM28JGloRWwQEVF1tOEsWMyRmGmsXXAcHXVZZAUsRM28PH10VXQ4KVF5VAE0nBG8BKwBAMwIKVgpbAB9DAT9bHQ8lbTYBZFldAV8RcS5aD11nbTYDZF5tVw9KXl8KGloRVDYy",
    title: "??????",
  },
  {
    name: "taobao",
    src: "",
    href: "http://redirect.simba.taobao.com/rd?c=un&amp;w=bd&amp;f=https%3A%2F%2Fs.click.taobao.com%2Ft%3Funion_lens%3DlensId%253AOPT%25401612256136%254021081cca_07a6_17761f44ebb_baac%254001%253BeventPageId%253A20150318020003697%26e%3Dm%253D2%2526s%253DsY41mHkxW%252BscQipKwQzePCperVdZeJviYlC4t6cuS%252FlyINtkUhsv0IMLki6Ahxm7uu5sqabOzx5D415GGSsrJ4YxhNUZ2i3GtfcNNJWtX5PKJQt1fVHsSsjNlcujFciaXu%252BSOOjatb%252FkxFiXT%252FI5kZuVJ2zJE2c0ERBlh1C2Tb%252FBV7GfGbfBR%252F2HTwXsXrhegoQaTYQ9FC3uS535%252FyVca2gfnelFNxevNc8bcJTqQrHGJe8N%252FwNpGw%253D%253D%26pid%3Dmm_131955459_43834449_111744850258&amp;k=67a22f436b17a341&amp;p=131955459_43834449_111744850258",
    title: "?????????",
  },
  {
    name: "suning",
    src: "",
    href: "https://sugs.suning.com/ukrdRpZU",
    title: "????????????",
  },
  {
    name: "vip",
    src: "",
    href: "https://click.union.vip.com/redirect.php?code=JbiZivD",
    title: "?????????",
  },
  {
    name: "amazon",
    src: "",
    href: "https://www.amazon.cn/",
    title: "?????????",
  },
  {
    name: "dangdang",
    src: "",
    href: "http://www.dangdang.com/",
    title: "??????",
  },
  {
    name: "mogu",
    src: "",
    href: "http://www.mogujie.com/",
    title: "?????????",
  },
];

const state = reactive({
  siteUrl: [
    {
      name: "buy",
      src: "",
    },
    {
      name: "news",
      src: "",
    },
    {
      name: "forum",
      src: "",
    },
    {
      name: "tool",
      src: "",
    },
    {
      name: "favorites",
      src: "",
    },
  ],
  navUrl: [],
  type: "buy",
});

state.navUrl = buy;

const getAssetsImages = (type: string, name: string) => {
  switch (type) {
    case "site":
      return new URL(`../assets/images/global/${name}.png`, import.meta.url)
        .href;
    case type:
      return new URL(
        `../assets/images/global/${type}/${name}.png`,
        import.meta.url
      ).href;
    default:
      return "";
  }
};

state.siteUrl.map((v) => {
  v.src = getAssetsImages("site", v.name);
});

const getNavImages = () => {
  state.navUrl.map((v) => {
    v.src = getAssetsImages(state.type, v.name);
  });
};

getNavImages();

watch(
  () => state.navUrl,
  (n, o, callback) => {
    if (n !== o) {
      getNavImages();
    }
  },
  { deep: true }
);

const a = ref(true);
const b = ref("");

watch(
  () => [a.value, b.value],
  (newValue, oldvalue) => {
    // console.log(newValue[0], newValue[1]);
    // console.log(oldvalue[0], oldvalue[1]);
  }
);

const hoverItem = (item) => {
  let arr = [];
  switch (item.name) {
    case "buy": {
      arr = buy;
      break;
    }
    case "news": {
      arr = [
        {
          name: "qq",
          src: "",
          href: "http://news.qq.com/",
          title: "????????????",
        },
        {
          name: "ifeng",
          src: "",
          href: "http://news.ifeng.com/",
          title: "????????????",
        },
        {
          name: "sohu",
          src: "",
          href: "http://news.sohu.com/",
          title: "????????????",
        },
        {
          name: "163",
          src: "",
          href: "http://news.163.com/",
          title: "????????????",
        },
        {
          name: "thepaper",
          src: "",
          href: "http://www.thepaper.cn/",
          title: "????????????",
        },
        {
          name: "sina",
          src: "",
          href: "http://news.sina.com.cn/",
          title: "????????????",
        },
        {
          name: "huanqiu",
          src: "",
          href: "http://www.huanqiu.com/",
          title: "????????????",
        },
        {
          name: "guokr",
          src: "",
          href: "http://www.guokr.com/",
          title: "?????????",
        },
      ];
      break;
    }
    case "forum": {
      arr = [
        {
          name: "weibo",
          src: "",
          href: "https://weibo.com/",
          title: "????????????",
        },
        { name: "tqq", src: "", href: "http://t.qq.com/", title: "????????????" },
        { name: "wx", src: "", href: "https://wx.qq.com/", title: "????????????" },
        {
          name: "tieba",
          src: "",
          href: "https://tieba.baidu.com/index.html",
          title: "????????????",
        },
        {
          name: "douban",
          src: "",
          href: "https://www.douban.com/",
          title: "??????",
        },
        {
          name: "tianya",
          src: "",
          href: "http://bbs.tianya.cn/",
          title: "????????????",
        },
        {
          name: "zcool",
          src: "",
          href: "http://www.zcool.com.cn/",
          title: "??????",
        },
        {
          name: "zhihu",
          src: "",
          href: "http://www.zhihu.com/",
          title: "??????",
        },
      ];
      break;
    }
    case "tool": {
      arr = [
        {
          name: "weather",
          src: "",
          href: "http://www.weather.com.cn/",
          title: "??????",
        },
        {
          name: "day",
          src: "",
          href: "http://qq.ip138.com/day/",
          title: "??????",
        },
        {
          name: "jsq",
          src: "",
          href: "http://www.zxjsq.net/",
          title: "?????????",
        },
        {
          name: "baidufanyi",
          src: "",
          href: "http://fanyi.baidu.com/",
          title: "????????????",
        },
        {
          name: "googletranslate",
          src: "",
          href: "https://translate.google.cn/",
          title: "????????????",
        },
        {
          name: "baidumap",
          src: "",
          href: "http://map.baidu.com/",
          title: "????????????",
        },
        {
          name: "kuaidi100",
          src: "",
          href: "http://www.kuaidi100.com/",
          title: "??????100",
        },
        {
          name: "12306",
          src: "",
          href: "http://www.12306.cn/mormhweb/",
          title: "12306",
        },
      ];
      break;
    }
    case "favorites": {
      arr = [
        {
          name: "vqq",
          src: "",
          href: "https://v.qq.com/index.html",
          title: "????????????",
        },
        {
          name: "iqiyi",
          src: "",
          href: "http://www.iqiyi.com/",
          title: "???????????????",
        },
        {
          name: "mgtv",
          src: "",
          href: "http://www.mgtv.com/",
          title: "??????TV",
        },
        {
          name: "douyu",
          src: "",
          href: "https://www.douyu.com/",
          title: "????????????",
        },
        {
          name: "duowan",
          src: "",
          href: "http://tu.duowan.com/m/bxgif",
          title: "??????gif",
        },
        {
          name: "bilibili",
          src: "",
          href: "https://www.bilibili.com/",
          title: "????????????",
        },
        {
          name: "qqmail",
          src: "",
          href: "https://mail.qq.com/",
          title: "QQ??????",
        },
        {
          name: "music163",
          src: "",
          href: "http://music.163.com/",
          title: "???????????????",
        },
      ];
      break;
    }
    default: {
      break;
    }
  }
  state.type = item.name;
  state.navUrl = arr.map((ov) => ({
    name: ov.name,
    src: "",
    href: ov.href,
  }));

  a.value = !a.value;
  b.value = item.name;

  // console.log(a, b);
};

const columns = [
  Table.SELECTION_COLUMN,
  Table.EXPAND_COLUMN,
  {
    title: "Name",
    dataIndex: "name",
    // key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    // key: "age",
    width: "12%",
  },
  {
    title: "Address",
    dataIndex: "address",
    width: "30%",
    key: "address",
  },
];
const data = [
  {
    key: 1,
    name: "John Brown sr.",
    age: 60,
    address: "New York No. 1 Lake Park",
  },
  {
    key: 2,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];
const rowSelection = ref({
  // checkStrictly: false,
  // onChange: (selectedRowKeys, selectedRows) => {
  //   console.log(
  //     `selectedRowKeys: ${selectedRowKeys}`,
  //     "selectedRows: ",
  //     selectedRows
  //   );
  // },
  // onSelect: (record, selected, selectedRows) => {
  //   console.log(record, selected, selectedRows);
  // },
  // onSelectAll: (selected, selectedRows, changeRows) => {
  //   console.log(selected, selectedRows, changeRows);
  // },
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/global/bg.png");

  .main {
    width: 100%;
    height: 100%;
  }

  .site-box-ul {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 30vh;

    li {
      cursor: pointer;
      margin: 0 22px;
    }
    li:hover img {
      transform: rotate(360deg);
    }
    img {
      transition: all 0.5s ease-in-out;
    }
  }

  .nav {
    display: flex;
    justify-content: center;
    margin-top: 50px;

    a {
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background-repeat: no-repeat;
      cursor: pointer;
      margin: 0 15px;
      box-shadow: 0 14px 24px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
