var express = require('express');
var router = express.Router();
//csrf nous servira pour les tokens

//passport authentif
var passport=require('passport');
var User= require('../models/user').User;

//on initialise l'utilisation de csurf
var csrf = require('csurf');
var csrfProtection =csrf();
router.use(csrfProtection);

router.get('/profile',isLoggedIn, function(req,res,next){
  User.findOne({_id: req.user._id}, function(err,user){
    if(err){
      return res.write('Erreur !');
    }
    res.render('user/profile',{user: user});
  });
});

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
         successRedirect: '/messagerie',
         failureRedirect: '/login'
      }));

router.get('/logout',isLoggedIn,function(req,res,next){
  User.findOne({_id: req.user._id},function(err,user){
    if(err){
      return res.write('Erreur !');
    }
    user.isConnected = false;
    user.save(function(err,result){
      if(err){
        return done(err);
      }
    });
  });
  req.logout();
  res.redirect('/');
});

//Renvoi à la main page si on est logger pour les route suivante,
// l'ordre est important, tout ce qui est en dessous subit cette regle
router.use('/',notLoggedIn,function(req,res,next){
  next();
});
//affiche la page signup
router.get('/signup',function(req,res,next){
  var messages = req.flash('error');
  //renvoi sur signup avec le token et les erreurs eventuelles dues à l'authentif
  res.render('user/signup',{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length>0});
});
//passport.authenticate envoie vers le fichier gestionnaire de l'authentif

router.post('/signup',passport.authenticate('local.signup',{
  //lors de l'envoie du form de signup gestion de l'après authentif
  failureRedirect: '/user/signup',
  failureFlash: true
}),function(req,res,next){
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/messagerie');
  }
});

//affiche signin
router.get('/signin',function(req,res,next){
  var messages=req.flash('error');
  res.render('user/signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0});
});
//idem
router.post('/signin',passport.authenticate('local.signin',{
  failureRedirect: '/user/signin',
  failureFlash: true
}),function(req,res,next){
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/messagerie');
  }
});

module.exports = router;
//function déterminant si on est connecté
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('user/signin');
}
//function déterminant si on n'est pas connecté
function notLoggedIn(req,res,next){
  if (!req.isAuthenticated()){
    return next();
  }
  res.redirect('/messagerie');
}
