setTimeout(function() {
  console.log('timeout')
})

process.nextTick(function(){
  console.log('nextTick 1')
})

new Promise(function(resolve){
  console.log('Promise 1')
  resolve();
  console.log('Promise 2')
}).then(function(){
  console.log('Promise Resolve')
})

process.nextTick(function(){
  console.log('nextTick 2')
})

// 只要当前的宏任务完成后，立马调用nextTick
// 在Node环境（10.3.0版本）中打印的顺序 Promise 1 > Promise 2 > nextTick 1 > nextTick 2 > Promise Resolve > timeout