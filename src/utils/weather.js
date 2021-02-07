const request = require('postman-request')

const getWeather = (location, callback) => {
    const urlForWeather = 'https://api.openweathermap.org/data/2.5/weather?appid=0a4f004ec035e586cf9fa1bff7bb191d&units=metric&lat='+ location.lat +'&lon='+ location.long 

    request({url: urlForWeather, json: true}, (error, { body }) => {

        if(error) {
            console.log('Unable to connect!')
            callback('Error! Unable to connect', undefined)
        } else if(body.code === '404') {
            console.log(body.message)
        } else {
            const temperature = body.main.temp
            const description = body.weather[0].description
            callback(undefined, {temp: temperature, desc: description})
        }
    })
}

module.exports = getWeather