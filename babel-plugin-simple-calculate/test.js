const babel = require("@babel/core");
import Big from 'big.js';
const result = babel.transform("const result = 0.1 + 0.2;",{
  plugins:[
    require("./index")
  ]
});

console.log(result.code); // const result = 3;

