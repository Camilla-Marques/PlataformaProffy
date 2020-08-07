//Dados
const proffys = [
    {
    name: "Diego Fernandes", 
    avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
    whatsapp: "21 987567123", 
    bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    subject: "Química", 
    cost: "20", 
    weekday: [0],
    time_from: [720],
    time_to: [1220]
    },
    {
    name: "Mayk Brito", 
    avatar:"https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4", 
    whatsapp: " 21 987567645", 
    bio: "Instrutor de Educação Física para iniciantes, minha missão de vida é levar saúde e contribuir para o crescimento de quem se interessar. Comecei a minha jornada profissional em 2001, quando meu pai me deu dois alteres de 32kg com a seguinte condição: 'Aprenda a fazer dinheiro com isso!'",
    subject: "Educação Física", 
    cost: "40", 
    weekday: [0],
    time_from: [720],
    time_to: [1220]
    },
    {
    name: "Tiago Luchtenberg", 
    avatar:"https://mir-s3-cdn-cf.behance.net/user/115/4713a37191453.5f14e9ebb5e58.jpg", 
    whatsapp: " 21 987567789", 
    bio: "As vezes não sei nem onde eu tô, mas consigo me localizar facilmente em qualquer lugar. Tenho memória fotográfica e nunca fico perdido. Eu ensino a galera como não se perder na vida, com lições geográficas simples pra você nunca mais precisar de mapa na sua bela vida.", 
    subject: "Química", 
    cost: "360", 
    weekday: [0],
    time_from: [720],
    time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

//Funcionalidades

function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req, res) {
    const dados = req.query

    const isNotEmpty = Object.keys(dados).length > 0
    // se tiver dados
    if(isNotEmpty) {

        dados.subject = getSubject(dados.subject)
        //adicionar dados a lista de proffys
        proffys.push(dados)
    
        return res.redirect("/study")
    }

    // se não, mostrar a página
    return res.render("give-classes.html", { subjects, weekdays })
}

//Servidor
const express = require ('express')
const server = express()

//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
const { query } = require('express')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//Início e configuração do servidor
server
// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
//rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
// Start do servidor
.listen(5500)