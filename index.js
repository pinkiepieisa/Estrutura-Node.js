//Servidor 

const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const { where } = require("sequelize");
//Variáveis que fazem a requisição das determinadas funcionalidades 

//Carregando o cabeçalho do html em outras páginas 

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
//Define a página principal onde as demais serão carregadas

app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas

//Rota Principal
app.get('/', function(req, res) {
    //O then passa os posts para nossa view
    Post.findAll().then(function(posts){
        //var nposts = JSON.parse(JSON.stringify(posts))
        //res.render('home', {posts: nposts})
        posts =posts.map((post)=>{return post.toJSON()});
        res.render('home', {posts: posts})
    });
});

//Rota para o cadastro
app.get('/cad', function(req, res) {
    res.render('formulario');
});

//Fazendo a inserção no banco
app.post('/add', function(req, res) {

    Post.create({

        titulo: req.body.titulo,
        conteudo: req.body.conteudo

    }).then(function() {

        //redirecionamento para home com a barra
        res.redirect('/')

    }).catch(function(erro) {

        res.send(' Houve um erro: ' + erro);
        
    });

});

//Exclusão de dados
app.get('/deletar/:id', function(req, res) {

    Post.destroy({where: {'id': req.params.id}}).then(function() {
        res.redirect('/');
    }).catch(function(erro) { //Só será acionado caso haja um erro
        res.send("Esta postagem não existe!");
    });
});

//Alteração dos dados
app.get('/alterar/:id', function(req, res) {
    Post.findAll({where: {'id': req.params.id}}).then(function(posts){
        //var nposts = JSON.parse(JSON.stringify(posts))
        //res.render('home', {posts: nposts})
        posts = posts.map((post) => {return post.toJSON()});
        res.render('alterar', {posts: posts});
    });
});

app.post('/update', function(req, res) {
    Post.update({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo},
        {where: {id: req.body.id}
    }).then(function() {
        res.redirect('/');
    }).catch(function(erro) {
        res.send("Esta postagem não existe " + erro);
    });
});

app.listen(8081, function() {
    console.log("Servidor rodando na porta 8081!")
});