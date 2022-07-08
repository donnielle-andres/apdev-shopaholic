var mongoose = require('mongoose');

/*
    SCHEMA: Product Information
    Desc: Information needed to list a product
*/

var ProdSchema = new mongoose.Schema({
    sellername : {
        type : String,
    },

    prodname: {
        type: String,
        required: true
    },  

    prodpric: {
        type: Number,
        required: true,
        min: 0
    },

    prodcate: {
        type: String
        
    },  

    proddesc: {
        type: String
  
    },  

    prodcond: {
        type: String
        
    },      

    prodvers: {
        type: String
        
    },      
 
    prodimg: {
        type: String,
        default : "../public/img/defprod.png"
    },
    
    prodpaym: {
        type: String
    },

    prodship: {
        type: String
    },

    /*prodrevi: {
        //revby : mongoose.SchemaType.ObjectId,
        revby : String,
        revtxt : String
    }*/
});
 
module.exports = mongoose.model('Product', ProdSchema);