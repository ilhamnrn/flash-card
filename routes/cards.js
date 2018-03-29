const express = require ('express')//manggil express js
const router = express.Router()
//const data = require('../data/flashCardsData.json').data
const { data } = require('../data/flashCardsData.json')
//const cards = data.cards
const { cards } = data
//kalau ada yg buka /card bakal dikasih ke suatu id card secara random
router.get('/', (req,res)=>{  //kalau halaman home, ganti ke halaman /cards sesuai di app.js
    let totalCards = cards.length //ambil panjangnya
    let randomId = Math.floor(Math.random()*totalCards)//random id nya
    res.redirect(`/cards/${randomId}?side=soal`)//tampilin halaman card dengan id hasil random tadi
})

//rute cards
router.get('/:id',(req,res)=>{  //get halaman home berdasarkan id
    // res.locals.variabel = "siapa"
    // res.locals.hint = "kamu"
    const { id } = req.params  //biar idnya dinamis
    const { side } = req.query //biar sidenya dinamis, sesuai dengan querynya, pertanyaan / jawaban
    const text = cards[id][side] //nampilin id dan side yang dinamis sesuai querynya
    const { hint } = cards[id] //hint yg dikeluarkan sesuai dengan id nya, idnya yg dinamis tadi
    let templateData = { id, text, hint } //template data yg berisi id, text(jawaban atau soal) dan hintnya

    if(side=="jawaban"){  //kalu sidenya jawaban
        templateData = { id, text }  //tampilin id dan text(jawaban) jawabannya aja
        templateData.sidenya = "soal" //bikin variabel soal buat nampilin side soal di cards.pug
        templateData.sideToDisplay = "Lihat Soal" //tampilin tulisan lihat soal
    } else if(side=="soal"){  //kalau sidenya soal, tampilin semuanya, id, text(soal) dan hint
        templateData.sidenya = "jawaban" //bikin variabel jawaban, isinya sesuai soal diatas
        templateData.sideToDisplay = "Lihat jawaban" //tampilin tulisan lihat jawaban
    }else if(!side){  //kalau sidenya gada 
        res.redirect(`/cards/${id}?side=soal`) //tampilin halaman /cards dengan soal yg di random berdasarkan idnya
    }
    res.locals = templateData  //masukin semua yg ada di template data ke lokal
    //console.dir(data)
    // res.locals = {  //variabel local yg digabung jadi satu objek
    //     text: text,
    //     hint: hint
    // }
    res.render("cards")//nge render/buat/nampilin halaman cards
})

module.exports = router  //dijadin module biar bisa dipanggil diluar file