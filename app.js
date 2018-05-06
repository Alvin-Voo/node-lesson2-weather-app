const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
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

// geocode.geocodeAddress(argv.a, (errorMessage, results)=>{
//   if(errorMessage) console.log(errorMessage);
//   else{
//     console.log(results.address);
//     weather.getWeather(results.latitude,results.longitude,(errorMessage, results)=>{
//       if(errorMessage) console.log(errorMessage);
//       else {
//         console.log(`Temperature now is: ${results.temp}, but feels like ${results.apparentTemp}`);
//       }
//     });
//   }
// });

geocode.geocodeAddress(argv.a).then(
  (results)=>{
    console.log(results.address)
    return weather.getWeather(results.latitude, results.longitude)
  }
).then(
  (results)=> console.log(`Temperature now is: ${results.temp}, but feels like ${results.apparentTemp}`)
).catch(
  (err)=>console.log(err)
)
