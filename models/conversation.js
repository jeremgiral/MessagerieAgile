var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var messageSchema = new Schema({
    contenu : String,
    date:  {type: Date, default: Date.now},
    envoyeur: Schema.Types.ObjectId,
    isLu:{type:Boolean,default: false}
});
var conversationSchema = new Schema({
    users: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'userModel'
        }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 10']
    },
    messages:[messageSchema],
    dateDebut:  {type: Date, default: Date.now},
    nouveauMessage:{type:Boolean,default: false},
    nbNouveauMessage: Number

});

function arrayLimit(val) {
    return val.length <= 2;
}
module.exports = mongoose.model('Conversation', conversationSchema);
