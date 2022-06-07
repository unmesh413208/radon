const { count } = require("console")
const bookModel = require("../models/bookModel")

const createBook = async function (req, res) {
    let data = req.body

    let savedData = await bookModel.create(data)
    res.send({ msg: savedData })
}

const bookList = async function (req, res) {
    let allBooks = await bookModel.find().select({ authorName: 1, bookName: 1, _id: 0 }) // AND

    res.send({ msg: allBooks })
}

const getBooksInYear = async function (req, res) {
    let Published = req.body.year
    let allBooks = await bookModel.find({ year: Published })

    res.send({ msg: allBooks })
}

const getParticularBooks = async function (req, res) {
    let condition = req.body
    let allBooks = await bookModel.find(condition)// AND

    res.send({ msg: allBooks })
}

const getXINRBooks = async function (req, res) {

    let allBooks = await bookModel.find({ $or: [{ "prices.indianPrice": { $eq: 200 }}, { "prices.indianPrice": { $eq: 400 }}, { "prices.indianPrice": { $eq: 500 } }] })

    res.send({ msg: allBooks })
}

const getRandomBooks = async function (req, res) {

    let allBooks = await bookModel.
    find({ $or: [{ "stockAvailable": { $eq: true }}, { "totalPages": { $gt: 100 }}] })

    res.send({ msg: allBooks })
}


module.exports.createBook = createBook
module.exports.bookList = bookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks




































// let allBooks= await bookModel.find( ).count() // COUNT


// let allBooks= await BookModel.find( { authorName : "Chetan Bhagat" , isPublished: true  } ) // AND

// let allBooks= await BookModel.find( { 
//     $or: [ {authorName : "Chetan Bhagat" } , { isPublished: true } , {  "year": 1991 }]
// } ).select( { bookName: 1, authorName: 1, _id: 0})n // SELECT keys that we want

// let allBooks= await BookModel.find().sort( { sales: -1 }) // SORT

// PAGINATION 
// let page= req.query.page
// let allBooks= await BookModel.find().skip(3 * (page-1)).limit(3)

// let allBooks= await BookModel.find().sort({ sales: -1 }).skip(3 * (page-1)).limit(3).select({ bookName: 1, authorName: 1, _id: 0} )


// let allBooks= await BookModel.find({ sales: { $eq:  137 }  }) 
// let allBooks= await BookModel.find({ sales: { $ne:  137 }  }) 
// let allBooks= await BookModel.find({ sales: { $gt:  50 }  }) 
// let allBooks= await BookModel.find({ sales: { $lt:  50 }  }) 
// let allBooks= await BookModel.find({ sales: { $lte:  50 }  }) 
// let allBooks= await BookModel.find({ sales: { $gte:  50 }  }) 

// let allBooks= await BookModel.find({     sales : { $in: [10, 17, 82] }     }).count() 
// sales : { $in: [10, 17, 82] }

// let allBooks= await BookModel.find({     sales : { $nin: [ 17, 82, 137] }     }).select({ sales: 1, _id:0})

//  let allBooks= await BookModel.find({     $and: [{sales : {$gt: 20}} , [sales:  {$lt: 100}]]    })  //sales is between 20 and 100.... sales > 20 AND sales <100
//  let allBooks= await BookModel.find({     sales : {$gt: 20, $lt: 100}   })  //sales is between 20 and 100.... sales > 20 AND sales <100


//  let allBooks= await BookModel.findById("621c60a6b16c9e6bf2736e33") 
//  let allBooks= await BookModel.findOne( {sales: 10}) 
//  let allBooks= await BookModel.find( {sales: 10}) 



// //  update (not covered: - findByIdAndUpdate | updateOne )
// let allBooks= await BookModel.update(   
//     {  sales: {$gt: 10}  }, //condition
//     { $set: { isPublished: true} } // the change that you want to make
//     ) 



// REGEX
// let allBooks= await BookModel.find( { bookName:  /^Int/  }) 
// let allBooks= await BookModel.find( { bookName:  /^INT/i  }) 
// let allBooks= await BookModel.find( { bookName:  /5$/  }) 
// let allBooks= await BookModel.find( { bookName:  /.*Programming.*/i  }) 

// ASYNC AWAIT

// let a= 2+4
// a= a + 10
// console.log(a)
// let allBooks= await BookModel.find( )  //normally this is an asynchronous call..but await makes it synchronous


// WHEN AWAIT IS USED: - database + axios
//  AWAIT can not be used inside forEach , map and many of the array functions..BE CAREFUL
//     console.log(allBooks)
//     let b = 14
//     b= b+ 10
//     console.log(b)
//     res.send({msg: allBooks})
// }






// updateMany and findOneAndUpdate
//   let books = await BookModel.updateMany (  {isPublished: false } ,  {author : "PK"}   );  // first json is the query condition  || second condition is the required update or change
//   let books = await BookModel.findOneAndUpdate(  {isPublished: true } ,  {author : "Sabiha"}   );  // it updates only the first matching doc
//   let books = await BookModel.findOneAndUpdate(  {isPublished: true } ,  {author : "Sabiha 3"} , { new: true}  );  // third param : new: true - will give you the updated document
  
// // upsert: true - it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document
// let books = await BookModel.findOneAndUpdate(  {bookName : "Hi Pritesh2" } ,  {bookName : "Hi My New Book" , ISBN : "basd87g8h7a88b"} , { upsert: true}  );  
