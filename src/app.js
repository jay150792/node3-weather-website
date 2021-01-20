const express = require('express')
const geoCode = require('./Utils/geoCode')
const forecast = require('./Utils/forecast')
const path = require('path')
const hbs = require('hbs')
const app = express()

const port = process.env.PORT || 3000
// setup path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup handle by views and locations
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title : 'weather app',
        name : 'Jay Govani'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name: 'Jay Govani'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        name:'Jay Govani'
    })
})
app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!req.query.address){
    return res.send({
        error : 'Please provide address query'    
    })
    }
    geoCode(address,(error,{longitude,latitude,location}={})=>{
        if (error){
            return res.send(error);
            
        }
       forecast(longitude,latitude, (error, forecastData) => {
           if(error){
            return res.send(error);
           }
           res.send({
               addressQuery : req.query.address,
               location : location,
               forecast : forecastData.data
           })
        //    console.log(location)
        //    console.log(forecastData.data)
         })
   })       
    // res.send({
    //     addressQuery : req.query.address,
    //     location : 'Ahemdabad',
    //     forecast : 'it is 25 degrees here'
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : ' please provide query to search'
        })           
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMsg: 'Help article not found',
        title:'404',
        name: 'Jay Govani'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        errorMsg: 'Page not found',
        title:'404',
        name: 'Jay Govani'
    })
})
app.listen(port, ()=>{
    console.log('server is up on port '+ port)
})
