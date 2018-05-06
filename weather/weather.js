const request = require('request');

let getWeather = (lat, lng, callback) =>{
  request({
    url: `https://api.darksky.net/forecast/e4f5429da8f32763d45bbaacda3daa42/${lat},${lng}`,
    json: true
  }, (error, response, body)=>{
    if(!error && response.statusCode === 200) {
      callback(undefined, {
        temp: body.currently.temperature,
        apparentTemp: body.currently.apparentTemperature
      });
    }else callback('Unable to fetch weather');
  });
}

module.exports = {getWeather}
