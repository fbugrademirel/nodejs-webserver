const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getWeather = require('./utils/weather')
const getGeocode = require('./utils/geocode')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory 
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'bugra',
        info: 'here you will find information about weather'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'bugra',
        info: 'Here you can find help about this webpage'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'bugra',
        info: 'This is me'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.location) {
        return res.send({
            error: "You must provide a location name"
        })
    }

    getGeocode(req.query.location, (error, result) => {
        if(error) {
            res.send({
                error: 'Cannot retreive geolocation'
            })
        } else {
            getWeather(result, (error, result) => {
                if(error) {
                    res.send({
                        error: 'Cannot retreive weather'
                    })
                } else {
                    res.send(result)
                }
            })
        }
    })  
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'The help page requested not found 404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'The page requested not found. 404'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})

