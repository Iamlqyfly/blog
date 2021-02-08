let pending = false;
const callbacks = [];
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

function queue(cb) {
  callbacks.push(cb);
  if (!pending) {
    pending = true;
    Promise.resolve().then(flushCallbacks)
  }
}

queue(() => console.log(1));
queue(() => console.log(2));
queue(() => console.log(3));

console.log(4)