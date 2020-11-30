let babel = require('@babel/core');
let t = require('@babel/types');
const Big = require("big.js");

const visitor = {
  BinaryExpression(path) {
    const node = path.node;
    let result;
    
    if (t.isNumericLiteral(node.left) && t.isNumericLiteral(node.right)) {
      switch (node.operator) {
        case "+":
          result = +new Big(node.left.value).plus(node.right.value)
          break;
        case "-":
          result = +new Big(node.left.value).minus(node.right.value);
          break;  
          default:
      }
    }

    if (result !== undefined) {
      // 把表达式节点替换成number字面量, 如果不替换输出来的就是表达式，如:const result = 1 + 2;
      path.replaceWith(t.numericLiteral(result));
      let parentPath = path.parentPath;
      // 向上遍历父节点
      parentPath && visitor.BinaryExpression.call(this, parentPath);
    }
  }
}

module.exports = function (babel) {
  return {
    visitor
  };
}

