
(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id];
    // 代码引入文件时根据相对路径，这里需要把相对路径跟id进行一个映射
    function localRequire(relativePath) {
      // require(id)-- 实现模块的自动倒入
      return require(mapping[relativePath])
    }
    const module = { exports: {} };
    console.log(localRequire(), '---')
    fn(localRequire, module, module.exports)
    return module.exports;
  }
  require(0); // 执行入口模块
})({
  0: [
    function (require, module, exports) {
      "use strict";

      var _message = require("./message.js");

      var _message2 = _interopRequireDefault(_message);

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

      console.log(_message2.default);
    },
    { "./message.js": 1 }
  ], 1: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _name = require("./name.js");

      exports.default = "hello " + _name.name + "!";
    },
    { "./name.js": 2 }
  ], 2: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var name = exports.name = 'watermelon';
    },
    {}
  ],
})
