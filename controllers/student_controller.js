// IMPORT EXPRESS SERVER
const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT STUDENT MODEL AND BIND IT
const StudentModel = require('../models/student_model');
// post is used to INSERT DOCUMENT/RECORD
// CALLBACK using lambda

router.post('/register', (req, res) => {

    const studobj = new StudentModel({
        candidate : {
            name :  req.body.name,
            email : req.body.email
        },
        test_score: {
            first_round : req.body.first_round,
            second_round : req.body.second_round,
            third_round : req.body.third_round,
            total : first_round + second_round + third_round
        }
    }); 
    
    studobj.save().then(inserteddocument => {
        res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE' +'<br\>'+ inserteddocument );  
    }).catch(err =>{
        res.status(500).send({ message: err.message || 'Error in Student Save '})
   });

});

// Find High Scoring Candidate

router.get('/maxcandidate', (req, res) => {
    StudentModel.find().sort({"test_score.total": -1}).limit(1).then(inserteddocument => {
        res.status(200).send('The High Scoring Candidate is : ' +'<br\>'+ inserteddocument );  
    }).catch(err =>{
        res.status(500).send({ message: err.message || 'Error in Finding Candidate '})
   });
})

// Find Average First Round Score

router.get('/firstaveragescore', (req,res) => {
    StudentModel.aggregate(
        [
            {
                $group:
                {
                  _id : "candidate.email",
                  Average_First_Round_Score : {$avg: "test_score.first_round"}
                }
            }
        ]
    ).then(inserteddocument => {
        res.status(200).send('Average First Round Score is ' +'<br\>'+ inserteddocument );  
    }).catch(err =>{
        res.status(500).send({ message: err.message || 'Error in Finding Score '})
   });
})


// Find Average Second Round Score

router.get('/secondaveragescore', (req,res) => {
    StudentModel.aggregate(
        [
            {
                $group:
                {
                  _id : "candidate.email",
                  Average_Second_Round_Score : {$avg: "test_score.second_round"}
                }
            }
        ]
    ).then(inserteddocument => {
        res.status(200).send('Average Second Round Score is ' +'<br\>'+ inserteddocument );  
    }).catch(err =>{
        res.status(500).send({ message: err.message || 'Error in Finding Score '})
   });
})


// Find Average Third Round Score

router.get('/thirdaveragescore', (req,res) => {
    StudentModel.aggregate(
        [
            {
                $group:
                {
                  _id : "candidate.email",
                  Average_Third_Round_Score : {$avg: "test_score.third_round"}
                }
            }
        ]
    ).then(inserteddocument => {
        res.status(200).send('Average Third Round Score is ' +'<br\>'+ inserteddocument );  
    }).catch(err =>{
        res.status(500).send({ message: err.message || 'Error in Finding Score '})
   });
})


//SHOULD BE EXPORTED
module.exports = router;