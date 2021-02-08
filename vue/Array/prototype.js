// var Calculator = function (decimalDigits, tax) {
//   this.decimalDigits = decimalDigits;
//   this.tax = tax;
// };

// // Calculator.prototype = {
// //   add: function (x, y) {
// //     return x + y;
// //   },

// //   subtract: function (x, y) {
// //     return x - y;
// //   },
// // };
// Calculator.prototype = function () {
//   add = function (x, y) {
//       return x + y;
//   },

//   subtract = function (x, y) {
//       return x - y;
//   }
//   return {
//       add: add,
//       subtract: subtract
//   }
// } ();
// console.log(new Calculator().subtract(1,2));

var BaseCalculator = function() {
  this.decimalDigits = 2;
};

BaseCalculator.prototype = {
  add: function(x, y) {
      return x + y;
  },
  subtract: function(x, y) {
      return x - y;
  }
};

var Calculator = function () {
  //为每个实例都声明一个税收数字
  this.tax = 5;
};    
Calculator.prototype = new BaseCalculator();