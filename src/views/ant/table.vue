<template>
  <div class="annual-report">
    <a-button class="export-btn" type="primary" @click="exportExcel"
      >导出</a-button
    >

    <a-table
      size="small"
      :scroll="scroll"
      :dataSource="dataSource"
      :columns="columns"
      :pagination="false"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <div class="name" v-if="column.key === 'name'">
          {{ record.name }}
        </div>

        <template v-for="(month, monthKey) in months" :key="monthKey">
          <template v-for="(info, infoKey) in infos" :key="infoKey">
            <template v-if="column.key === `${monthKey}_${infoKey}`">
              {{ record[`month_${monthKey}`][infoKey] }}
            </template>
          </template>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import data from "./data";

console.log("data", data);

import { createWs, sheet2Blob, saveXlsx } from "./excel";
const infos = {
  show: "展现数",
  read: "阅读数",
  like: "点赞数",
  comment: "评论数",
  star: "收藏数",
};

const months = {
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "七",
  8: "八",
  9: "九",
  10: "十",
  11: "十一",
  12: "十二",
};

const scroll = {
  x: "100%",
};

const dataSource = data;

const columns = [
  {
    title: "达人",
    width: 100,
    align: "center",
    key: "name",
    fixed: "left",
    customHeaderCell: () => {
      return {
        style: {
          background: "#9BBB59",
        },
      };
    },
  },
];
for (const month in months) {
  const eachMonth = {
    title: `${months[month]}月`,
    align: "center",
    customHeaderCell: () => {
      return {
        style: {
          background: month % 2 === 0 ? "#9BBB59" : "#C3D69B",
        },
      };
    },
    children: [],
  };

  Object.keys(infos).map((i) => {
    const eachInfo = {
      title: infos[i],
      align: "center",
      width: 80,
      key: `${month}_${i}`,
      customHeaderCell: () => {
        return {
          style: {
            background: month % 2 === 0 ? "#9BBB59" : "#C3D69B",
          },
        };
      },
    };

    eachMonth.children.push(eachInfo);
  });
  columns.push(eachMonth);
}

const handleExportData = () => {
  const exportData = [];
  dataSource.forEach((obj) => {
    const newObj = { name: obj.name };
    for (const key in obj) {
      if (key !== "name") {
        const value = obj[key];
        for (const info in infos) {
          newObj[`${key}_${info}`] = value[`${info}`];
        }
      }
    }
    exportData.push(newObj);
  });
  return exportData;
};

const handleExportField = () => {
  if (exportData.length) return Object.keys(exportData[0]);
  return [];
};

const handleExportTitle = () => {
  const obj = { name: "达人" };

  for (const month in months) {
    for (const info in infos) {
      if (info === "show") {
        obj[`month_${month}_show`] = `${months[month]}月`;
      }
    }
  }

  return obj;
};

const firstLine = () => {
  const obj = {
    name: "达人",
  };

  for (const month in months) {
    for (const info in infos) {
      obj[`month_${month}_${info}`] = infos[info];
    }
  }

  return obj;
};

let exportData = handleExportData();
const exportField = handleExportField();
const exportTitle = handleExportTitle();
const exportDataFirstLine = firstLine();
exportData = [{ ...exportDataFirstLine }, ...exportData];

const exportExcel = () => {
  console.log("data", exportData);
  console.log("field", exportField);
  console.log("title", exportTitle);
  const ws = [];

  ws.push(createWs(exportData, exportField, exportTitle, "达人数据"));

  console.log("ws", ws);
  saveXlsx(sheet2Blob(ws), "达人数据.xlsx");
};
</script>
<style lang="scss" scoped>
.annual-report {
  padding: 10px;
  .name {
    display: block;
    max-width: 90px;
    text-align: center;
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    overflow: hidden;
  }
  .export-btn {
    float: right;
    margin-bottom: 10px;
  }
}
</style>
