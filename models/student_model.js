// IMPORT MONGOOSE 
const model_mongoose = require('mongoose');

//CREATE MODEL 
let StudentModel = model_mongoose.model('student-collection', 
{
    candidate: {
        name : {type : String},
        email : {type : String}
    },
    test_score: {
        first_round : {type : Number},
        second_round : {type : Number},
        third_round : {type : Number},
        total : {type :Number}
    },
	regdatetime: { type: Date, default: Date.now }
});

//EXPORT MODULE Student using BINDING
module.exports = StudentModel ;
