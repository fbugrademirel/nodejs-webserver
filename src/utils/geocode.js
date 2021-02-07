const request = require('postman-request')

const  getGeocode = (nameOfLocation, callback) => {

    const urlForGeolocation = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(nameOfLocation) + '.json?access_token=pk.eyJ1IjoiYmV0cHJvZiIsImEiOiJja2t1M21vc2UxZTFnMnFwZnJ3eXIydWJpIn0.U_b8KPt23y0amA7a4r3Beg&limit=1'

    request( { url: urlForGeolocation, json: true}, (error, response) => {
        if(error) {
            console.log('Error occured')
            callback('Error occured. Unable to connect!', undefined)
        } else if(response.body.features.length === 0) {
            console.log('unable to find the location')
            callback('Unable to find the location. Try another search!', undefined)
        } else {
            const body = response.body
            const location = body.features[0].center
            const placeName = body.features[0].place_name
            const long = location[0]
            const lat = location[1]
            callback(undefined, {lat: lat, long: long, placeName: placeName})
        }
    })
}

module.exports = getGeocode