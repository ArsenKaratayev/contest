var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    surname : {
        type : String,
        require : true
    },
    patronymic : {
        type : String
    },
    gender : {
      type : String
    },
    photo : {
        type : String
    },
    position : {
      type : String
    },
    subdivision : {
      type : String
    },
    accesses : [{
        type : String
    }]
    // arrObj : [{
    //   type : Schema.Types.ObjectId,
    //   ref : 'Player'
    // }]
});

module.exports = mongoose.model('User', userSchema);
