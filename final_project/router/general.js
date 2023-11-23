const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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
