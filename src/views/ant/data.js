const obj = {};

const months = Array.from({ length: 12 }, (_, i) => i + 1);

months.map((v) => {
  obj[`month_${v}`] = {
    show: 1000,
    read: 120000,
    like: 132,
    comment: 69,
    star: 180,
  };
});

const users = [
  "王鹤棣_Dylan",
  "李炮儿",
  "王者荣耀吕德华",
  "三石的一家老小",
  "廖智",
];

const data = [];

users.map((v) => {
  data.push({
    name: v,
    ...obj,
  });
});

export default data;
