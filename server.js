// server.js

// Import the Express framework to build the web application
const express = require('express');
// Import the UUID library for generating unique IDs
// To use this, you need to install it: npm install uuid
const { v4: uuidv4 } = require('uuid');

// Create an instance of the Express application
const app = express();
// Define the port on which the server will listen
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

// Middleware to parse JSON bodies from incoming requests.
// This allows you to send JSON data in the request body (e.g., for POST and PUT requests)
// and have it available in req.body.
app.use(express.json());

// In-memory array to store book objects.
// In a real application, this would be replaced with a database.
let books = [
  { id: uuidv4(), title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: uuidv4(), title: '1984', author: 'George Orwell' },
  { id: uuidv4(), title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// --- API Endpoints ---

// GET /books
// Returns all books in the collection.
app.get('/books', (req, res) => {
  // Respond with the entire books array as JSON.
  res.status(200).json({
    message: 'Successfully retrieved all books',
    data: books
  });
});

// GET /books/:id
// Returns a single book by its ID.
app.get('/books/:id', (req, res) => {
  // Extract the ID from the request parameters.
  const { id } = req.params;
  // Find the book with the matching ID.
  const book = books.find(b => b.id === id);

  // If no book is found, send a 404 Not Found response.
  if (!book) {
    return res.status(404).json({
      message: `Book with ID '${id}' not found.`
    });
  }

  // If the book is found, send it as a JSON response.
  res.status(200).json({
    message: `Successfully retrieved book with ID '${id}'`,
    data: book
  });
});

// POST /books
// Adds a new book to the collection.
app.post('/books', (req, res) => {
  // Destructure title and author from the request body.
  const { title, author } = req.body;

  // Basic input validation: ensure title and author are provided.
  if (!title || !author) {
    return res.status(400).json({
      message: 'Bad Request: Both "title" and "author" are required to add a new book.'
    });
  }

  // Create a new book object with a unique ID and the provided data.
  const newBook = {
    id: uuidv4(), // Generate a unique ID using uuidv4
    title: title.trim(), // Trim whitespace from title
    author: author.trim() // Trim whitespace from author
  };

  // Add the new book to the in-memory array.
  books.push(newBook);

  // Respond with a 201 Created status and the newly created book.
  res.status(201).json({
    message: 'Book added successfully',
    data: newBook
  });
});

// PUT /books/:id
// Updates an existing book by its ID.
app.put('/books/:id', (req, res) => {
  // Extract the ID from the request parameters.
  const { id } = req.params;
  // Destructure title and author from the request body.
  const { title, author } = req.body;

  // Find the index of the book with the matching ID.
  const bookIndex = books.findIndex(b => b.id === id);

  // If no book is found at the given ID, send a 404 Not Found response.
  if (bookIndex === -1) {
    return res.status(404).json({
      message: `Book with ID '${id}' not found.`
    });
  }

  // Get the existing book object.
  const existingBook = books[bookIndex];

  // Update book properties if new values are provided.
  // Use logical OR (||) to keep the old value if the new one is undefined or empty.
  existingBook.title = (title !== undefined && title !== null) ? String(title).trim() : existingBook.title;
  existingBook.author = (author !== undefined && author !== null) ? String(author).trim() : existingBook.author;

  // Respond with the updated book.
  res.status(200).json({
    message: `Book with ID '${id}' updated successfully`,
    data: existingBook
  });
});

// DELETE /books/:id
// Removes a book by its ID.
app.delete('/books/:id', (req, res) => {
  // Extract the ID from the request parameters.
  const { id } = req.params;

  // Find the index of the book to be deleted.
  const initialLength = books.length;
  books = books.filter(b => b.id !== id);

  // If the length of the array hasn't changed, it means no book was deleted (ID not found).
  if (books.length === initialLength) {
    return res.status(404).json({
      message: `Book with ID '${id}' not found. No book was deleted.`
    });
  }

  // Respond with a success message.
  res.status(200).json({
    message: `Book with ID '${id}' deleted successfully.`
  });
});

// Start the server and listen for incoming requests on the specified PORT.
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('API Endpoints:');
  console.log(`  GET    /books`);
  console.log(`  GET    /books/:id`);
  console.log(`  POST   /books`);
  console.log(`  PUT    /books/:id`);
  console.log(`  DELETE /books/:id`);
});