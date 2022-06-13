const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema( {
    userId : {
        type: ObjectId,
        ref : "Userdocument"
    },
    productId: {
        type : ObjectId,
        ref : "Productdocument"
    },
    amount: Number,
    isFreeAppUser : Boolean,
    date : String


}, { timestamps: true });

module.exports = mongoose.model('Orderdocument', orderSchema)
