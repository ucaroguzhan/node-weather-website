const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=b1d9bf78a4fd85d0a4e31316db25cfbd&query=' + latitude + ',' + longitude

    request({
        url,
        json: true
    }, ( error, { body } ) => {

        if (error) {
            console.log('Something went wrong', undefined)
        } else if (body.error) {
            console.log('Something is still wrong')


        } else {
             const weather = body.current;
            callback(undefined, `it is currently ${weather.temperature} C. There is a ${weather.precip}% chance of rain.`)
        }
    })


}

module.exports = forecast