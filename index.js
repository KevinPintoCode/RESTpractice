import * as url from 'url'; 
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url)); 
import express from "express";
const app = express();
import path from "path";

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

const comments = [
    {
        username :"Kevin",
        comment : "Te amo Engi",
    },
    {
        username: "Engiber",
        comment: "Te amo Max",
    },
    {
        username: "Max",
        comment: "No me caes bien, Zeus",
    },
    {
        username: "Hemera",
        comment: "Estoy loquisima",
    },
    {
        username: "Zeus",
        comment: "Si cuadra",
    }
];

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.listen(3000, () => {
    console.log('Port 3000 active')
});