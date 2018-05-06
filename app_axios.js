const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options({
  a:{
    demandOption: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    type: 'string'
  }
})
.help()
.alias('help','h')
.argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyA2Glr_pskeAYTmxjAzmGHscgQtAmfCI_g`
let weatherUrl=`https://api.darksky.net/forecast/e4f5429da8f32763d45bbaacda3daa42/`;
axios.get(geocodeUrl)
.then(
  (response)=>{
    if(response.data.status==='ZERO_RESULTS')
      throw new Error('Not able to find address')

    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl+`${response.data.results[0].geometry.location.lat},${response.data.results[0].geometry.location.lat}`)
  }
).then(
  (response)=>{
    if(response.status === 200) {
      console.log(`Temperature now is: ${response.data.currently.temperature},\
        but feels like ${response.data.currently.apparentTemperature}`)
    }else throw new Error('Unable to fetch weather')
  }
).catch((err)=>{
  if(err.code==='ENOTFOUND') console.log('Unable to connect to API servers');
  else console.log(err.message);
});
