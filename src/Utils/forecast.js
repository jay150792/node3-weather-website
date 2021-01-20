const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ea011d3c0548f8663077bedee95882aa&query=' + latitude + ','+ longitude
    request({url, json: true}, (error,{ body })=>{
        if(error){
            callback('not able to connect to weather api', undefined)
        } else if(body.error){
            callback('did not find any data for the given input, please try with correct data', undefined)
        }else{
            callback(undefined,{
                data : body.location.name +' weather: '+ body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out there.'
            })
        }
    })
}

module.exports = forecast