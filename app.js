const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./models/Post");
const { sequelize, Sequelize } = require("./models/Db");

//Config
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

app.get('/', function (req, res) {
  /*let dataFormatada;
  var dataAntes = req.body.dataAntes
  dataFormatada = new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(dataAntes)*/

//Createdat where id = req.body.nome10

  //Post.findAll({attributes})

  Post.findAll({
    order: [['id', 'DESC']]//,
    //attributes: ['createdAt']
  
  })
.then(function (posts) {
      res.render('home', {posts: posts});
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});

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

app.get('/deletar/:id', function (req, res) {
  Post.destroy({ where: { 'id': req.params.id } }).then(function () {
    res.redirect('/')
  })
    .catch(function (erro) {
      console.log('Esta postagem não exite ' + erro)
    })
}
)
// Rota GET para renderizar a página de edição
app.get('/editar/:id', function (req, res) {
  Post.findAll({ where: { id: req.params.id } })
    .then(function (posts) {
      res.render('editar', { posts: posts });
    })
    .catch(function (error) {
      console.log('ixi deu erro;', error)
    });
});


app.get("/teste", function (req, res) {
  const id = sequelize.query('select id from postagens', { type: Sequelize.QueryTypes.SELECT })
  sequelize
    .query(
      'SELECT DATE_FORMAT(createdAt, "%d/%m/%Y") as data_formatada FROM postagens where id = 32',
      { type: Sequelize.QueryTypes.SELECT }
    ).then()
    .then(function (results) {
      const dataFormatadaArray = results.map(result => result.data_formatada);
      res.render("teste", { dataFormatadaArray: dataFormatadaArray, id: id });
    })
    .catch(function (error) {
      console.log("Ocorreu o seguinte erro: " + error);
      res.status(500).send("Erro interno do servidor");
    });
});

// Rota POST para processar a edição
app.post('/editar/:id', function (req, res) {
  Post.update(
    {
      titulo: req.body.titulo1,
      conteudo: req.body.conteudo1,
      updatedAt: sequelize.literal('CURRENT_TIMESTAMP')
    },
    { where: { id: req.params.id } }
  )
    .then(function () {
      res.redirect('/')
    })
    .catch(function (error) {
      console.log('deu erro: ', error)
    });
});

app.listen(8081, function () {
  console.log("Servidor rodando na porta 8081");
});
