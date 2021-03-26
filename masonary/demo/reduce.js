function Unzip(arr = []) {
  return arr.reduce(
    (t, v) => (v.forEach((w, i) => t[i].push(w)), t),
    Array.from({
      length: Math.max(...arr.map(v => v.length))
    }).map(v => [])
  );
}

const arr = [
  ["a", 1, true],
  ["b", 2, false]
];

Unzip(arr); // [["a", "b"], [1, 2], [true, false]]

function Count(arr = []) {
  return arr.reduce((t, v) => (t[v] = (t[v] || 0) + 1, t), {});
}
const arr2 = [0, 1, 1, 2, 2, 2];
// Count(arr); // { 0: 1, 1: 2, 2: 3 }
// 此方法是字符统计和单词统计的原理，入参时把字符串处理成数组即可

function countFun(arr) {
  // let obj = {}
  // arr.map((item) => {
  //   if (!obj[item]) {
  //     obj[item] = 1;
  //   } else {
  //     obj[item]++;
  //   }
  // })
  // return obj
  return arr.reduce((ac, cur) => (ac[cur] = (ac[cur] || 0) + 1, ac),{})
}
console.log(countFun(arr2))

const people = [
  { area: "GZ", name: "YZW", age: 27 },
  { area: "SZ", name: "TYJ", age: 25 }
];

const map = people.reduce((t, v) => {
  const { name, ...rest } = v;
  t[name] = rest;
  return t;
}, {});

console.log(map)

function numFormate(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+)/g, '$1.')
}

