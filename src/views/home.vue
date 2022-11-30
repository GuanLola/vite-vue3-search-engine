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
    title: "天猫",
  },
  {
    name: "jd",
    src: "",
    href: "https://union-click.jd.com/jdc?e=618%7Cpc%7C&amp;p=JF8BAKwJK1olXDYDZBoCUBVIMzZNXhpXVhgcDwYNXRNHXHBTTkRHA1ocZEA-ClV_QRx8ewVdHVFiDyJUDThyYSkEF2sVXgUGVVxVCUoRM28JGloRWwQEVF1tOEsWMyRmGmsXXAcHXVZZAUsRM28PH10VXQ4KVF5VAE0nBG8BKwBAMwIKVgpbAB9DAT9bHQ8lbTYBZFldAV8RcS5aD11nbTYDZF5tVw9KXl8KGloRVDYy",
    title: "京东",
  },
  {
    name: "taobao",
    src: "",
    href: "http://redirect.simba.taobao.com/rd?c=un&amp;w=bd&amp;f=https%3A%2F%2Fs.click.taobao.com%2Ft%3Funion_lens%3DlensId%253AOPT%25401612256136%254021081cca_07a6_17761f44ebb_baac%254001%253BeventPageId%253A20150318020003697%26e%3Dm%253D2%2526s%253DsY41mHkxW%252BscQipKwQzePCperVdZeJviYlC4t6cuS%252FlyINtkUhsv0IMLki6Ahxm7uu5sqabOzx5D415GGSsrJ4YxhNUZ2i3GtfcNNJWtX5PKJQt1fVHsSsjNlcujFciaXu%252BSOOjatb%252FkxFiXT%252FI5kZuVJ2zJE2c0ERBlh1C2Tb%252FBV7GfGbfBR%252F2HTwXsXrhegoQaTYQ9FC3uS535%252FyVca2gfnelFNxevNc8bcJTqQrHGJe8N%252FwNpGw%253D%253D%26pid%3Dmm_131955459_43834449_111744850258&amp;k=67a22f436b17a341&amp;p=131955459_43834449_111744850258",
    title: "淘宝网",
  },
  {
    name: "suning",
    src: "",
    href: "https://sugs.suning.com/ukrdRpZU",
    title: "苏宁易购",
  },
  {
    name: "vip",
    src: "",
    href: "https://click.union.vip.com/redirect.php?code=JbiZivD",
    title: "唯品会",
  },
  {
    name: "amazon",
    src: "",
    href: "https://www.amazon.cn/",
    title: "亚马逊",
  },
  {
    name: "dangdang",
    src: "",
    href: "http://www.dangdang.com/",
    title: "当当",
  },
  {
    name: "mogu",
    src: "",
    href: "http://www.mogujie.com/",
    title: "蘑菇街",
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
          title: "腾讯新闻",
        },
        {
          name: "ifeng",
          src: "",
          href: "http://news.ifeng.com/",
          title: "凤凰资讯",
        },
        {
          name: "sohu",
          src: "",
          href: "http://news.sohu.com/",
          title: "搜狐新闻",
        },
        {
          name: "163",
          src: "",
          href: "http://news.163.com/",
          title: "网易新闻",
        },
        {
          name: "thepaper",
          src: "",
          href: "http://www.thepaper.cn/",
          title: "澎湃新闻",
        },
        {
          name: "sina",
          src: "",
          href: "http://news.sina.com.cn/",
          title: "新浪新闻",
        },
        {
          name: "huanqiu",
          src: "",
          href: "http://www.huanqiu.com/",
          title: "环球时报",
        },
        {
          name: "guokr",
          src: "",
          href: "http://www.guokr.com/",
          title: "果壳网",
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
          title: "新浪微博",
        },
        { name: "tqq", src: "", href: "http://t.qq.com/", title: "腾讯微博" },
        { name: "wx", src: "", href: "https://wx.qq.com/", title: "网页微信" },
        {
          name: "tieba",
          src: "",
          href: "https://tieba.baidu.com/index.html",
          title: "百度贴吧",
        },
        {
          name: "douban",
          src: "",
          href: "https://www.douban.com/",
          title: "豆瓣",
        },
        {
          name: "tianya",
          src: "",
          href: "http://bbs.tianya.cn/",
          title: "天涯论坛",
        },
        {
          name: "zcool",
          src: "",
          href: "http://www.zcool.com.cn/",
          title: "站酷",
        },
        {
          name: "zhihu",
          src: "",
          href: "http://www.zhihu.com/",
          title: "知乎",
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
          title: "天气",
        },
        {
          name: "day",
          src: "",
          href: "http://qq.ip138.com/day/",
          title: "日历",
        },
        {
          name: "jsq",
          src: "",
          href: "http://www.zxjsq.net/",
          title: "计算器",
        },
        {
          name: "baidufanyi",
          src: "",
          href: "http://fanyi.baidu.com/",
          title: "百度翻译",
        },
        {
          name: "googletranslate",
          src: "",
          href: "https://translate.google.cn/",
          title: "谷歌翻译",
        },
        {
          name: "baidumap",
          src: "",
          href: "http://map.baidu.com/",
          title: "百度地图",
        },
        {
          name: "kuaidi100",
          src: "",
          href: "http://www.kuaidi100.com/",
          title: "快递100",
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
          title: "腾讯视频",
        },
        {
          name: "iqiyi",
          src: "",
          href: "http://www.iqiyi.com/",
          title: "爱奇艺视频",
        },
        {
          name: "mgtv",
          src: "",
          href: "http://www.mgtv.com/",
          title: "芒果TV",
        },
        {
          name: "douyu",
          src: "",
          href: "https://www.douyu.com/",
          title: "斗鱼直播",
        },
        {
          name: "duowan",
          src: "",
          href: "http://tu.duowan.com/m/bxgif",
          title: "多玩gif",
        },
        {
          name: "bilibili",
          src: "",
          href: "https://www.bilibili.com/",
          title: "哔哩哔哩",
        },
        {
          name: "qqmail",
          src: "",
          href: "https://mail.qq.com/",
          title: "QQ邮箱",
        },
        {
          name: "music163",
          src: "",
          href: "http://music.163.com/",
          title: "网易云音乐",
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
