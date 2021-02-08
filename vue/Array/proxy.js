// const target = [];
// const proxy = new Proxy(target,{
//   set(target, key, value) {
//     console.log(key, 'set')
//     target[key] = value;
//     return true;
//   }
// })
// proxy.push(1)

const target = {};
const proxy = new Proxy(target,{
  set(target, key, value) {
    console.log(key, 'set')
    target[key] = value;
    return true;
  }
})
proxy['name'] = 'iamlqy'
