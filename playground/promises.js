let asyncAdd = (a,b) =>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      if(typeof a === 'number' && typeof b === 'number'){
        resolve(a+b);
      }else{
        reject('Arguments must be numbers')
      }
    }, 1500);
  });
};

//simple then call
// asyncAdd(5, 7).then(
//   (res)=>{
//     console.log('result: ', res);
//   },
//   (err)=> console.log(err)
// )

//wrong way of chaining promises
//error which handled means promise is settled
//next then will resolve instead of reject (error out)
// asyncAdd(5, '7').then(
//   (res)=>{
//     console.log('result: ', res);
//     return asyncAdd(res, 33);
//   },
//   (err)=> console.log(err) //<-- once error is resolved here, then will be called next
// ).then(
//   (res)=>console.log('second result: ',res),//<-- hence res is undefined here coz previously it errors out
//   (err)=> console.log(err)
// )

//you want the error to be handled in a catch function
asyncAdd(5, '7').then(
  (res)=>{
    console.log('result: ', res);
    return asyncAdd(res, 33);
  }
).then(
  (res)=> console.log('second result: ', res)
).catch(
  (err)=> console.log(err)
)
