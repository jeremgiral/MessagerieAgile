var passport=require('passport');
var User = require('../models/user').User;
var LocalStrategy = require('passport-local').Strategy;
var flash=require('connect-flash');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: 377205169796605,
    clientSecret: 'c746fb11a08b23cfb84c7ad768e1568d',
    callbackURL: "https://localhost:3000/user/auth/facebook/callback",
    profileFields: ['location','email', 'first_name','last_name','id','displayName','birthday','address','languages','picture.type(large)']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOne({"compteFacebook":profile.id}, function(err, user) {
      if (err) { return done(err); }
      if(user){
        console.log(user);
        return done(null,user)
      }else{
        var newUser=new User();
        newUser.email='';
        newUser.nom=profile.name.familyName;
        newUser.prenom=profile.name.givenName;
        newUser.langue='Fr';
        newUser.dateNaissance = profile.birtday ? profile.birtday : new Date("1994-07-26");
        newUser.pays = 'France';
        newUser.pseudo = profile.displayName;
        newUser.avatar = profile.photos[0].value;
        newUser.isConnected = true;
        newUser.compteFacebook = profile.id;
        newUser.save(function(err,result){
          if(err){
            return done(err);
          }
          return done(null, newUser);
        });
      }
    });
  }
));
passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    done(err,user);
  });
});

passport.use('local.signup',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  nomField: 'nom',
  prenomField: 'prenom',
  paysField: 'pays',
  langueField: 'langue',
  pseudoField: 'pseudo',
  dateNaissanceField: 'dateNaissance',
  avatarField: 'avatar',
  passReqToCallback: true
},function(req, email, password,done){
  req.checkBody('email', 'Adresse mail invalide').notEmpty().isEmail();
  req.checkBody('password', 'Mot de passe invalide').notEmpty().isLength({min:4});
  req.checkBody('pseudo', 'Nom vide').notEmpty();
  req.checkBody('pays', 'Nom vide').notEmpty();
  req.checkBody('langue', 'Nom vide').notEmpty();
  var nom = req.body.nom;
  var prenom = req.body.prenom;
  var pays = req.body.pays;
  var dateNaissance = req.body.dateNaissance;
  var langue = req.body.langue;
  var pseudo = req.body.pseudo;
  var password = req.body.password;
  var avatar = req.body.avatar;
  var errors=req.validationErrors();

  if(errors){
    var messages=[];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null,false,req.flash('error',messages));
  }
  User.findOne({$or: [{'email': email},{'pseudo':pseudo}]},function(err,user){
    if(err){
      return done(err);
    }
    if(user){
      return done(null,false,{message: 'Cet adresse mail ou ce pseudo est déjà utilisée.'});
    }
    var newUser=new User();
    newUser.email=email;
    newUser.password=newUser.encryptPassword(password);
    newUser.nom=nom;
    newUser.prenom=prenom;
    newUser.langue=langue;
    newUser.dateNaissance = dateNaissance;
    newUser.pays = pays;
    newUser.pseudo = pseudo;
    newUser.avatar = avatar;
    newUser.isConnected = true;
    newUser.save(function(err,result){
      if(err){
        return done(err);
      }
      return done(null, newUser);
    });
  });
}));

passport.use('local.signin',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req,email,password,done){
  req.checkBody('email', 'Adresse mail invalide').notEmpty();
  req.checkBody('password', 'Mot de passe invalide').notEmpty();
  var errors=req.validationErrors();
  if(errors){
    var messages=[];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null,false,req.flash('error',messages));
  }
  User.findOne({'email': email},function(err,user){
    if(err){
      return done(err);
    }
    if(!user){
      return done(null,false,{message: 'L\'utilisateur n\'a pas été trouvé.'});
    }
    var valide=user.validPassword(password);
    if(!valide) {
      return done(null,false,{message: 'Mot de passe incorrect.'});
    }
    user.isConnected = true;
    user.save(function(err,result){
      if(err){
        return done(err);
      }
      return done(null, user);
    });
    
  });
}));
