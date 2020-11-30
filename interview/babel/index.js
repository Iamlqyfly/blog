const esprima = require("esprima");
const estraverse = require("estraverse");
const escodegen = require('escodegen');

let code = "var ans=6 * 7";
let tree = esprima.parseScript(code) // 生成语法树
// 遍历语法树: 遍历和修改AST
estraverse.traverse(tree, {
  enter(node) {
    console.log("enter", node);
    if (node.type === 'VariableDeclarator') {
      node.id.name = 'solu'
    }
  },
  leave(node) {
    console.log("leave", node.type);
  }
});

// 编译修改后的语法树:将AST-> JS
let compileTreeJS = escodegen.generate(tree);
console.log(compileTreeJS)


