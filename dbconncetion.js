// STEP-1 : IMPORT MONGOOSE PACKAGE
//Mongoose is an Object Document Mapper (ODM)
const mongoose = require('mongoose');

// Database Connection URL
const url =`mongodb+srv://test:test@cluster0.xtdyd.mongodb.net/Shopping?retryWrites=true&w=majority`;

// STEP-2 : ESTABLISH CONNECTION WITH MONGODB DATABASE THROUGH MONGOOSE
// err is callback function Parameter. ARROW OPERATOR.
// JSON.stringify convert Object to String. 2 means Indentation of Two space Character 
mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false })
      .then( () => 
             {
               console.log('NODEJS TO MongoDB Connection ESTABLISH.....');
             })
      .catch( err => 
              {
               console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
               process.exit();
              }); 
    
// STEP-3 : EXPORT MODULE mongoose because we need it in other JS file
module.exports = mongoose;
