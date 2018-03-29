const express = require ('express')//manggil express.js
const app = express() //masang express js di aplikasi
const bodyParser = require('body-parser') //manggil library bodyparser
const cookieParser = require('cookie-parser') //manggil library cookie parser
const mainRoute = require('./routes/index.js') //manggil rute di index.js
const cardRoutes = require('./routes/cards.js') //manggil rute cards.js

const port = 15402 //port yg dipake

//masang bodyparser ke aplikasi
app.use(bodyParser.urlencoded({extended:false}))  //buat middleware, extended:false kalau string atau array, true selain array dan string
app.use(cookieParser())//masang cookieparser ke aplikasi
app.use('/public', express.static('public')) //bikin folder /public static biar bisa baca static file kaya css
//pasang mesin template,pug
app.set('view engine','pug')

//nyari rute sesuai inputan users
app.use(mainRoute)  //gunakan mainroute untuk mencari rute utama
app.use('/cards', cardRoutes) //gunakan cardroutes untuk masuk ke rute cards

//bikin error, kalau ga ada rute yg cocok
app.use((req, res, next)=>{
    let errornya = new Error("ERROR CUY")
    errornya.status = 404
    next(errornya) //untuk nyari fungsi berikutnya
})

//error middleware
app.use((err, req, res, next) =>{ //nambahin kalau halaman engga ada yg sesuai, middleware 4 parameter benda diantara request sampai jadi respon
    res.locals.status = err.status //masukin status di lokal ke status error
    res.locals.errorMessage = err.message //tampilin message errornya
    res.render("error") //tampilin halaman error
})

app.listen(port,()=> {  //bikin server dengan port diatas=14042
    console.log("Server Hurung")
})