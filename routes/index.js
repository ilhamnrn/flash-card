const express = require ('express')//manggil express js
const router = express.Router() //inisiasi expres ke router

//rute home
router.get('/',(req,res)=>{ //nampilin halaman home di browser
    res.locals.username=req.cookies.username //variabel username dilokal = variabel username di cookies
    if(req.cookies.username){ //jika username di cookies ada
        res.render("index") //buat/tampilkan halaman index
    }
    else  //kalo ga ada
    {
        //let errorya = new Error("Gada username") //buat nambahin pesan error kalau ga ada username
        //next(errorya) //nampilin errornya
        res.redirect("hello") //arahin ke halaman hello
    }
})

//rute get hello
router.get('/hello',(req,res)=>{  //kalau manggil /hello di browser
   if(req.cookies.username){  //kalau username di cookies ada
        res.redirect('/')  //arahin ke halaman home
     }
    else{
        res.render("hello") //kalau ga ada buat halaman hello
    }
})

//rute post hello
router.post('/hello',(req,res)=>{ //kalau post ke /hello
    res.locals = req.body  //varibel local di isi sama variabel yg di post
    res.cookie("username",req.body.username) //isi username di cookie pake username yg ada di body
    res.redirect('/') //arahin ke halaman home
    
})

//rute logout
router.post('/goodbye',(req,res)=>{ //kalau ngepost ke /goodbye
    res.clearCookie("username") //bersihin username di cookie
    res.redirect("/hello") // arahin ke halaman home
})



module.exports = router //dijadin module biar bisa dipanggil diluar file