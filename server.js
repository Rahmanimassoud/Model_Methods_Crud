const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
const Book = require('./models/Book.js');
require('dotenv').config();
require('./config/db.js');
const PORT = 3000;


const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //

// ============================START ROUTES BASIC CRUD METHODS======================================//

// Create
app.post('/books', async (req, res) => {
    // in the request there should be an array of books objects.
    let books = req.body.books;
    let dbResponse =  await  Book.insertMany(books);
    res.send(dbResponse);
})

// findOne
app.get('/books/title/:title', async (req, res)=> {
    let title = req.params.title;
    let oneBookFromDB = await Book.findOne({title: title});
    console.log(oneBookFromDB);
    res.send(oneBookFromDB)
})

// findByID
app.get('/books/:bookId', async (req, res) => {
      const id = req.params.bookId;
      const response = await Book.findById(id);
      res.send(response);
  });

// .find()
app.get('/books', async (req, res)=> {
    let booksFromDb = await Book.find()
    res.send(booksFromDb)
})

// find byId and update
app.put('/books/:idOfBook', async (req, res)=> {
    let id = req.params.idOfBook;
    let response = await Book.findByIdAndUpdate(id, req.body, {new: true});
    res.send(response)
})

// UpdateOne
app.put('/books/updateOne/:bookId', async (req, res)=> {
    let id = req.params.bookId;
    const response = await Book.updateOne({ _id: id }, req.body);
    res.send(response)
})

// Delete One using findByIdAndDelete
app.delete('/books/deleteOne/:boodId', async (req, res)=> {
    let id = req.params.boodId;
    const result = await Book.findByIdAndDelete(id);
    res.send(result)
})


// DeleteMany 
app.delete('/books/deleteMany',  async (req, res)=> {
    const result  = await Book.deleteMany({pages: {$gte: 100}});
    res.send(result)
})



// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});


