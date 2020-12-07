const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const generate = require('babel-generator').default

const code = `const a = 4+1;`;
const ast = babylon.parse(code);

traverse(ast, {
  enter(path) {
   if (path.node.type === "VariableDeclaration" && path.node.kind === 'const' ) {
      path.node.kind = 'var';
    }
  }
})
const genCode = generate(ast, {}, code); 
console.log('genCode', genCode);  // genCode { code: 'var a = 4 + 1;', map: null, rawMappings: null }

/**
 * 第一步，由Babylon进行解析为AST
  第二步由babel-traverse转义为新的AST
  第三步，由babel-generator生成解析后的代码
 */