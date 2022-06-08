

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    name: {
        type : String,
        
    }, 
    author_id:{
        type : String,
        required : true
    } ,
    prices : Number,
    ratings : Number
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //Books
