console.log('starting');
console.time('check');

setTimeout(()=>{
  console.log('inside call back 1')
}, 2000);

setTimeout(()=>{
  console.log('inside call back 2')
}, 0)

console.log('finishing')
console.timeEnd('check');
