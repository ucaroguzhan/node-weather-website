const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for express config
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')

//setup handlebars engine views and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directoriy to serve 
app.use(express.static(path.join(__dirname, '../public')));


//
app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name:'Oguzhan Ucar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name:'Oguzhan Ucar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'The help you need will be provided',
        title:'Help',
        title:'Oguzhan Ucar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})





app.get('/products', (req, res) => {

    //we can not send two responses for one request!!!
    //cannot set headers after they are sent to the client
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
     res.render('404', {
         errorMessage:'Help not found'
     })
})
app.get('*', (req, res) => {
   res.render('404',{
       errorMessage:"Page not found error code 404"
   })
})

app.listen(3000, () => {
    console.log('server is up on port 3000.')
});

