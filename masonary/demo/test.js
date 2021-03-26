let num = 100000000
function numFormate(num) {
  return num && num.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}
console.log(numFormate(num))
// replace(/(\d)(?=(\d{3})+$)/g, '$1,')
