const { count } = require("console")
const bookModel = require("../models/bookModel")
const authorModel = require("../models/authorModel")

let createAuthor = async(req,res)=>{
    let data = req.body
    let savedData = await authorModel.create(data)
    res.send({msg : savedData})
}

let createBook = async (req,res) => {
    let data = req.body
    let bookData = await bookModel.create(data)
    res.send({msg: bookData})

}


let getBooksByChetanBhagat = async (req,res) => {
    let data = await authorModel.find({author_name: "Chetan Bhagat"}).select("author_id")
    console.log(data)
    let bookData = await bookModel.find({author_id: data[0].author_id})
    res.send({msg : bookData})
}
//List out the books written by "Chetan Bhagat" ( this will need 2 DB queries one after another- first query will find the author_id for "Chetan Bhagat”. Then next query will get the list of books with that author_id )


let authorOfBook = async(req,res)=>{
    let data = await bookModel.findOneAndUpdate("name.Two States", {$set : {prices:100}},{new:true}).select({name:1,price:1,_id:0})
    // let authorData = await authorModel.find({author_id:data.author_id}).select("author_name")
    // console.log(authorData)
    // let price = data.prices
    res.send({msg: data})
}

//find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.  ( This will also need 2  queries- 1st will be a findOneAndUpdate. The second will be a find query aith author_id from previous query)


const bookbetween50_100 = async function(req,res){
    const bookData = await bookModel.find({price:{$gte:50,$lte:100}}).select("author_id")
    console.log(bookData)
    const id=bookData.map(inp=>inp.author_id)
    let a=[]
    for( let i=0 ; i<id.length;i++)
    {
        const x=id[i]
        const author = await authorModel.find({author_id:x}).select("author_name")
        a.push(author)
    }
    const authorName= a    
   res.send({msg:authorName})
}


//Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books.. 
// bookModel.find( { price : { $gte: 50}  ,  price: {$lte: 100} } ) // WRONG
// bookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1})..run a map(or forEach) loop and get all the authorName corresponding to the authorId’s ( by querying authorModel)





module.exports.createBook = createBook
module.exports.createAuthor = createAuthor
module.exports.getBooksByChetanBhagat = getBooksByChetanBhagat
module.exports.authorOfBook = authorOfBook
module.exports.bookbetween50_100 = bookbetween50_100
// module.exports.getXINRBooks = getXINRBooks
// module.exports.getRandomBooks = getRandomBooks