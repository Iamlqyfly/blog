const fs = require("fs");
const path = require("path");
const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const { transformFromAst } = require("babel-core");

let ID = 0;

// 解析一个文件及其依赖
function createAsset(filename) {
  const content = fs.readFileSync(filename, "utf-8");
  /**
   * sourceType 可以是 "module" 或者 "script"，它表示 Babylon 应该用哪种模式来解析。
   * "module" 将会在严格模式下解析并且允许模块定义，"script" 则不会
   * sourceType 的默认值是 "script" 并且在发现 import 或 export 时产生错误,使用 scourceType: "module" 来避免这些错误
   */
  const ast = babylon.parse(content, {
    sourceType: "module",
  });
  // 存储分析的依赖
  const dependencies = [];
  // 遍历AST抽象语法树
  traverse(ast, {
    // 获取通过import引入的模块
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    },
  });
  const id = ID++; // 记录每一个载入的模块id,可清晰的看到当前的依赖的模块

  const { code } = transformFromAst(ast, null, {
    presets: ["env"],
  });
  return {
    id,
    filename,
    dependencies,
    code
  };
}

// 构建一个依赖关系图
function createGraph(entry) {
  const mainAssets = createAsset(entry);

  const queue = [mainAssets];
 
  for (const asset of queue) {
    const dirname = path.dirname(asset.filename);

    asset.mapping = {};

    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath);
      /**
       * src/message.js  ./message.js
       * src/name.js
       */
      const child = createAsset(absolutePath);
      asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }
  return queue;
}

// 将所有东西打包成一个单文件
function bundle(graph) {
  let modules = "";

  graph.forEach((mod) => {
    modules += `${mod.id}:[
      function(require,module,exports){
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)}
    ],`;
  });
  /**
   * 打印 moudles,可看出是个这样0: [...], 1: [...]形式的字符串，最后在导入模块的时候，会给这个字符串加上
   * 一个 {}, => {0: [...], 1: [...]},你没看错，这是一个对象，这个对象里用数字作为 key、
   * 一个数组作为值、[0] 第一个就是我们被包裹的代码,[1]第二个就是对应的 mapping
   */
  const result = `
   (function(modules){
      function require(id){
        const [fn, mapping] = modules[id];
        // 代码引入文件时根据相对路径，这里需要把相对路径跟id进行一个映射
        function localRequire(relativePath){
          // require(id)-- 递归调用require(id),实现模块的自动导入
          return require(mapping[relativePath])
        }
        const module = {exports:{}};
        console.log(localRequire(),'---')
        fn(localRequire,module,module.exports)
        return module.exports;
      }
     require(0); // 执行入口模块
   })({${modules}})
   `;
  return result;
}

// const graph = createGraph("./src/entry.js");
// const result = bundle(graph);
// console.log(result)

const build = file => {
  const content = bundle(createGraph(file))
  // 写入到dist/main.js
  fs.mkdirSync('./dist')
  fs.writeFileSync('./dist/main.js', content)
}

build('./src/entry.js')