const request = require('request');

//using callback
// let geocodeAddress = (address, callback) =>{
//   let encodedAddress = encodeURIComponent(address);
//
//   request({
//     url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyA2Glr_pskeAYTmxjAzmGHscgQtAmfCI_g`,
//     json: true//take json string converted into object
//   }, (error, response, body)=>{
//     if(error){
//       callback('Unable to connect to google server');
//     }else if(body.status==='ZERO_RESULTS'){
//       callback('Not able to find address');
//     }else if(body.status==='OK'){
//       callback(undefined, {
//         address: body.results[0].formatted_address,
//         latitude: body.results[0].geometry.location.lat,
//         longitude: body.results[0].geometry.location.lng
//       })
//     }
//   });
// }
//using promise
let geocodeAddress = (address) =>{
  let encodedAddress = encodeURIComponent(address);

  return new Promise((resolve, reject)=>{
    request({
      url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyA2Glr_pskeAYTmxjAzmGHscgQtAmfCI_g`,
      json: true//take json string converted into object
    }, (error, response, body)=>{
      if(error){
        reject('Unable to connect to google server');
      }else if(body.status==='ZERO_RESULTS'){
        reject('Not able to find address');
      }else if(body.status==='OK'){
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        })
      }
    });
  })
}

module.exports = {geocodeAddress}
