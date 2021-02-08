const arrayProto = Array.prototype;
console.log(arrayProto)
const arrayMethods = Object.create(arrayProto);

[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function(method) {
  const original = arrayProto[method];
  Object.defineProperty(arrayMethods, method, {
    value: function mutaor(...args) {
      return original.apply(this, args);
    },
    enumerable: false,
    writable: true,
    configurable: true
  })
})