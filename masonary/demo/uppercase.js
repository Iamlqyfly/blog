'AbcDefGh'.replace(/[a-zA-Z]/g, function (a) {
  return /[a-z]/.test(a) ? a.toUpperCase() : a.toLowerCase();
});


function numLetter(str) {
  return str.replace(/(\w)/g, m => m === m.toUpperCase() ? m.toLowerCase() : m.toUpperCase())
}
