const request = require('request')

const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamF5MTUwNzkyIiwiYSI6ImNranppNjRiZjA3dGIydW4ycmVvMnV2Z2MifQ.RpG8BJpk97tPHqOi7O4QBw&limit=1'
    request({url , json : true}, (error, {body})=> {
        if(error){
            callback('not able to connect to mapbox api', undefined)
        } else if (body.features.length === 0){
            callback('result not found for the given address, Please try with different input', undefined)
        } else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode