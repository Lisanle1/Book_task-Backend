const {getDB} = require('../dbConfig/db');
const {ObjectId} = require('mongodb')
const jwt = require('jsonwebtoken');

// adding books 
exports.addBooks= async(req,res)=>{

try {
    
const {title, author, genre, publishedYear} = req.body;
const {id} = req.user;
    const db = getDB();
    //checking same books already exist with same title and author

    const existBooks = await db.collection('books').findOne({title:title, author:author});

    if(existBooks){
        return res.json({
            statusCode:'400',
            message:"Books already added in the lists"
        })
    }
    
    const payload ={
        title:title,
        author:author,
        genre:genre,
        publishedYear:publishedYear,
        createdAt: new Date(),
        userId: id,
    }

    await db.collection('books').insertOne(payload);

    res.json({
        statusCode:201,
        message:"Book added Successfully....",
        Book:payload
    })
} catch (error) {
    res.json({
        statusCode:500,
        message:"Internal Server Error",
    })
}
}

// update the books in the list

exports.updateBooks = async(req,res)=>{
    try {
    //checking book exist or not
    const id= req.params.id
    const db = getDB();

    const existBooks = await db.collection('books').findOne({_id: new ObjectId(id)});
    if(!existBooks){
        return res.json({
            statusCode:400,
        message:"Book doesn't exist in the list"
        })
    }
    const updatedBooksDetails=req.body
    await db.collection('books').updateOne({_id:id},{$set:updatedBooksDetails})

    res.json({
        statusCode:200,
        message:"Book Updated Successfully...."
    })
} catch (error) {
    res.json({
        statusCode:500,
        message:"Internal Server Error",
    })
}
}


// delete books by id

exports.deleteBooks= async(req,res)=>{
    try {
    const id=req.params.id;

    // checking id is exist or not before delete
    const db = getDB();

    const existBooks = await db.collection('books').findOne({_id: new ObjectId(id)});
    if(!existBooks){
        return res.json({
            statusCode:400,
        message:"Book doesn't exist in the list"
        })
    }
    await db.collection('books').deleteOne({_id : new ObjectId(id)});

    res.json({
        statusCode:200,
        message:"Book Deleted Successfully...."
    })
} catch (error) {
    res.json({
        statusCode:500,
        message:"Internal Server Error",
    })
}
}


// getting list of books

exports.getBooks= async(req,res)=>{
    try {
    const id=req.user.id;

    // checking id is exist or not before delete
    const db = getDB();

    const existBooks =  await db.collection('books').find({userId:id}).toArray();

    if(!existBooks){
        return res.json({
            statusCode:400,
        message:"User doesn't exist"
        })
    }
    res.json({
       bookLists:existBooks
    })

} catch (error) {
    res.json({
        statusCode:500,
        message:"Internal Server Error",
    })
}

}