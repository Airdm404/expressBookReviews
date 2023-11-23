const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
}

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "Customer successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "Customer already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register customer."});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author
    let books_by_author = Object.entries(books)
                    .filter(([isbn, book]) => book.author === author)
                    .map(([isbn, book]) => {
                        return { isbn: isbn, title: book.title, reviews: book.reviews }
                    })
    let books_by_author_dict = {}
    books_by_author_dict["booksbyauthor"] = books_by_author
    res.send(books_by_author_dict)
});

// Get all books based on titles
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title
    let books_by_title = Object.entries(books)
                    .filter(([isbn, book]) => book.title === title)
                    .map(([isbn, book]) => {
                        return { isbn: isbn, author: book.author, reviews: book.reviews }
                    })
    let books_by_title_dict = {}
    books_by_title_dict["booksbytitle"] = books_by_title
    res.send(books_by_title_dict)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
