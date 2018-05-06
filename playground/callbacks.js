//asynchronous example of callback
let getUser = (id, callback) =>{
  let user ={
    id: id,
    name: 'somebody'
  };

  setTimeout(()=>callback(user),2000);
};

getUser(31, (user)=>{
  console.log(user);
});
