var express = require('express');
// permet de récupere le chemin des fichiers
var path = require('path');
// permet de mettre une icone dans l'onglet
var favicon = require('serve-favicon');
var logger = require('morgan');
// permet l'utilisation des cookies
var cookieParser = require('cookie-parser');
// permet de parser
var bodyParser = require('body-parser');
//permet l'utilisation du format hbs
var expressHbs = require('express-handlebars');
// orm de mongodb
var mongoose = require('mongoose');
//permet de gérer l'authentif
var passport = require('passport');
//affiche des messages type alert
var flash=require('connect-flash');
//permet de gérer les tokens
var session = require('express-session');
//permet de valider les champ spéciaux : email, password ...
var validator = require('express-validator');
//pour stocker les tokens et session correctement en base mongo
var MongoStore=require('connect-mongo')(session);
var cors = require('cors')

var index = require('./routes/index');
var userRoutes = require('./routes/users');
var messagerieRoutes = require('./routes/messagerie');

var app = express();


mongoose.connect('mongodb://192.168.1.192:27017/messagerieAgile', { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/messagerieAgile', { useNewUrlParser: true });
// on charge notre fichier passport pour l'authentif
require('./config/passport');

//on défini l'utilisation du format hbs
app.engine('.hbs',expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(cors())
//utilisation d'une icone
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

//on défini notre body parser au format json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//on déféni l'usage de validator (email, password)
app.use(validator());
app.use(cookieParser());
//on défini notre mot de passe pour la création des tokens, et déactive le ré enregistrement et la sauvergade des token qui n'ont pas était initialisé
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  //gestion de l'enregistrement des cookies
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie:{maxAge: 180 * 60 * 1000} //180 minutes * 60 seconde * 1000 millisecondes
}));
//on peut utilisé flash
app.use(flash());
//on crée un token
app.use(passport.initialize());
app.use(passport.session());
//on met à disposition le contenu du dossier public)
app.use(express.static(path.join(__dirname, 'public')));

//on défini la variable locals avec un booléen d'authentif et le token de session
app.use(function(req,res,next){
  res.locals.login = req.isAuthenticated();
  res.locals.session=req.session;
  next();
});
//on défini l'utilisation des routes
//on place les routes les plus "précises" en premier
app.use('/user', userRoutes);
app.use('/', index);
app.use('/messagerie',messagerieRoutes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
