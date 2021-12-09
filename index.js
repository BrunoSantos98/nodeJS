const express = require('express')
const path = require('path')
const app = express()

//definindo template engine
app.set('view engine','ejs')



//definindo arquivos estaticos
/*const staticFolder = path.join(__dirname, 'views')
const expressStatic = express.static(staticFolder)
app.use(expressStatic)*/

//forma diferente de definir arquivo, nesse caso public
app.use(express.static(path.join(__dirname, 'public')))

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
                text: "lorem ipsum dolor sit amet, consectetur adipiscing elit"
            },

            {
                title: 'Titulo 03',
                text: "lorem ipsum dolor sit amet, consectetur adipiscing elit"
            },

            {
                title: 'Titulo 02',
                text: "lorem ipsum dolor sit amet, consectetur adipiscing elit"
            },
        ]
    })
})

//404 error, not found
app.use((req, res) => {
    res.send("PÁgina nao encontrada")
})

//executando o servidor
const port = process.env.PORT || 8080
app.listen(port,() => console.log(`Server is listen on port ${port}`))