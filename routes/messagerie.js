var express = require('express');
var router = express.Router();
var User= require('../models/user').User;
var Conversation = require('../models/user').Conversation;
var csrf = require('csurf');
var csrfProtection =csrf();

router.use(csrfProtection);


// io.on('connection', function(socket){
//   console.log('an user connected %s',socket);
//   io.emit('newConnection',socket);
//   socket.on('newMessage', function(data){
//     console.log(data);
//     io.emit('newMessage', data);
//   });
//   socket.on('newConversation',function(data){

//   });
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

// router.get('/createConversation',isLoggedIn, function(req,res,next){
//   Conversation.find({users:{ $all: [req.user._id,req.query.id] }},function(err,convs){
//     if(convs.length==0){
//       newConv = new Conversation()
//       newConv.users=[req.user._id,req.query.id]
//       newConv.save(function(err,conv){
//         if(err){
//           console.log(err);
//         }
//         io.emit('newConversation', conv);
//         // Goto Conv
//       });
//     } else {
//       res.send({success:true,id:req.query.id})
//     }
//   });
// });

// router.get('/sendMessage',isLoggedIn,function(req,res,next){
//   Conversation.findOne(data.conversation,function(err,conv){
//     if(err){
//       console.log(err);
//     }
//     newMessage = new Message();
//     newMessage.contenu=data.contenu;
//     newMessage.auteur=data.auteur;
//     conv.nbNouveauMessage++;
//     conv.nouveauMessage = true;
//     conv.messages.push(newMessage)
//     conv.save(function(err,conver){
//       if(err){
//         console.log(err);
//       }
//       console.log(conver);
//       console.log("sauvegardé");
//     });
//     io.emit('newMessage',conver);
//   });
// })


router.get('/',isLoggedIn, function(req,res,next){
  User.findOne({_id: req.user._id}, function(err,user){
    if(err){
      return res.write('Erreur User !');
    }
    Conversation.find({users:{ $all: [user._id] }}).populate({path: 'users',match: { _id: { $ne:req.user._id}}}).exec(function (err, conversations) {
      if(err){
        console.log(err)
        console.log('Erreur Conversation !');
      }
      Conversation.find({users:req.user._id}).select('users').distinct('users').exec(function(err,listeUserConv){
        User.find({$and: [{'isConnected': true},{'_id':{ $nin:listeUserConv,$ne: req.user._id}}]},{"_id": 1,"nom": 1,"prenom":1},function(err,listeConnected){
          res.render('messagerie',{csrfToken: req.csrfToken(),user:user,conversations : conversations,listeConnected : listeConnected,myid:req.user._id});
        });
      })
    });
  });
});

module.exports = router;

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
  