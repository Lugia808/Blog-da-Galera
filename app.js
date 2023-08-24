const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./models/Post");

//Template Engine - Handlebars
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//Rotas


app.get('/', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('home', {posts: posts})        
    })
})


app.get("/cadastro", function (req, res) {
  res.render("Formulario");
});

app.post("/postagem", function (req, res) {
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
  })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (erro) {
      res.send("Ocorreu o seguinte erro: " + erro);
    });
});

app.get('/deletar/:id', function(req, res){
  Post.destroy({where: {'id': req.params.id}}).then(function(){
    res.redirect('/')
  })
  .catch(function(erro){
    console.log('Esta postagem não exite ' + erro)
  })
    
  }
)

app.get('/editar/:id', function(req, res){
  Post.destroy({where: {'id': req.params.id}}).then(function(){
    res.redirect('/cadastro')
  })
  .catch(function(erro){
    console.log('Esta postagem não exite ' + erro)
  })
    
  }
)


app.listen(8081, function () {
  console.log("Servidor rodando na porta 8081");
});
