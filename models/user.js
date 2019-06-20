var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');

var userSchema = new Schema({
  email:{type: String, require: true},
  password: {type: String, require: true},
  nom: {type: String},
  prenom: {type: String},
  pays: {type: String},
  langue: {type: String},
  dateNaissance: {type: Date},
  pseudo: {type: String},
  dateInscription: {type: Date, default: Date.now},
  relations:{type: [{type: Schema.Types.ObjectId,ref: 'User'}]},
  compteFacebook: {type: String},
  avatar: {type: String},
  isAnonyme: {type:Boolean,default: false},
  isConnected : {type:Boolean,default: false}
});

userSchema.methods.encryptPassword=function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

var messageSchema = new Schema({
    contenu : String,
    date:  {type: Date, default: Date.now},
    auteur: {type:Schema.Types.ObjectId,ref : 'User'},
    isLu:{type:Boolean,default: false}
});
var conversationSchema = new Schema({
    users: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 10']
    },
    messages:[messageSchema],
    dateDebut:  {type: Date, default: Date.now},
    nouveauMessage:{type:Boolean,default: false},
    nbNouveauMessage: {type:Number,default: 0},
    dernierMessage : String,
    dateDernierMessage : {type: Date, default: Date.now}

});

function arrayLimit(val) {
    return val.length <= 2;
}
Conversation = mongoose.model('Conversation', conversationSchema)
User = mongoose.model('User', userSchema)
Message = mongoose.model('Message', messageSchema)
module.exports = {Conversation:Conversation,User:User,Message:Message}