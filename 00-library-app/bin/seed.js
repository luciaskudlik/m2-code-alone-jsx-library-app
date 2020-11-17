const mongoose = require("mongoose");
const Book = require("./../models/Book.model");
const Author = require("./../models/Author.model");

const books = require("./books-mock-data");
const authors = require("./authors-mock-data");

const DB_NAME = "library";

// SEED SEQUENCE

// 0. ESTABLISH CONNECTION TO MONGO DATABASE

mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((x) => {
    // 1. DROP THE DATABASE
    const pr = x.connection.dropDatabase();

    return pr;
  })
  .then(() => {
    // 2.  CREATE THE DOCUMENTS FROM ARRAY OF authors
    const pr = Author.create(authors);
    return pr; //forwards the promise to next `then`
  })
  .then((createdAuthors) => {
    console.log(`Created ${createdAuthors.length} authors`);

    // 3. WHEN .create() OPERATION IS DONE
    // UPDATE THE OBJECTS IN THE ARRAY OF books

    const updatedBooks = books.map((bookObj, i) => {
      // Update the bookObj and set the corresponding author id
      // to create the reference
      const author = createdAuthors[i];
      bookObj.authors = [author._id];

      return bookObj; //return the updated bookObj
    });

    const pr = Book.create(updatedBooks);
    return pr; // forwards the promise to next `then`
  })
  .then((createdBooks) => {
    // 4. WHEN .create() OPERATION IS DONE, CLOSE DB CONNECTION
    console.log(`Inserted ${createdBooks.length} books`);

    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
