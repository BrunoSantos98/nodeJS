const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

//definindo template engine
app.set('view engine','ejs')



//definindo arquivos estaticos
/*const staticFolder = path.join(__dirname, 'views')
const expressStatic = express.static(staticFolder)
app.use(expressStatic)*/

//forma diferente de definir arquivo, nesse caso public
app.use(express.static(path.join(__dirname, 'public')))

//habilita server para receber dados via post de um formulario
app.use(express.urlencoded({extended: true}))

//rotas
app.get('/',(req, res) => {
    res.render('index', {
        title: "Pagina inicial | home"
    }) 
})

app.get('/posts',(req, res) => {
    res.render("posts", {
        title: "Pagina de posts | posts",
        posts: [
            {
                title: 'Titulo 01',
                text: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
                stars: 3
            },

            {
                title: 'Titulo 03',
                text: "lorem ipsum dolor sit amet, consectetur adipiscing elit"
            },

            {
                title: 'Titulo 02',
                text: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
                stars:5
            },
        ]
    })
})

app.get('/cadastrar-posts',(req,res) => {
    const {c} = req.query

    res.render("cadastro-de-posts",{
        title: "cadastrar posts",
        cadastrado: c
    })
})

app.post('/salvar-post',(req,res) =>{
    const {titulo, texto} = req.body

    const data = fs.readFileSync('./store/posts.json')
    const posts = JSON.parse(data)

    posts.push({
        titulo, texto
    })

    const postsString = JSON.stringify(posts)
    fs.writeFileSync('./store/posts.json',postsString)

    res.redirect("/cadastrar-posts?c=1")
})

//404 error, not found
app.use((req, res) => {
    res.send("PÁgina nao encontrada")
})

//executando o servidor
const port = process.env.PORT || 8080
app.listen(port,() => console.log(`Server is listen on port ${port}`))