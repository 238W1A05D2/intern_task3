📚 Simple Books API
This is a small project that lets you manage a list of books. It's built with Node.js and a tool called Express. Think of it like a simple online service where you can:
Get all books
Get one specific book
Add new books
Change details of existing books
Delete books
The books are just stored in the computer's memory, so there's no fancy database needed. This is great for learning how basic web services work!
✨ What It Does
Here's what you can do with this API:
Get all books: See every book you've added.
Get one book: Look up a book using its unique ID.
Add a new book: Send a new book's title and author.
Update a book: Change a book's title or author using its ID.
Delete a book: Remove a book using its ID.
💻 How to Get Started
Follow these steps to get this project running on your computer.
What you need:
Node.js: This is like the engine for our project.
npm: This comes with Node.js and helps install other tools.
Postman: A tool to test our API (like making requests to it).
Setup:
Create a folder for your project. Let's call it books-api.
Bash
mkdir books-api
cd books-api
Start a new Node.js project inside that folder:
npm init -y
Install the necessary tools:
npm install express uuid
Create a file named server.js in your books-api folder.
Copy and paste all the code from your server.js file into this new file.
Run the API:
Open your computer's terminal (or VS Code's terminal) in your books-api folder.
Start the server by typing:
node server.js
You'll see a message like Server running on http://localhost:3000. This means your API is ready!
🚀 How to Use the API (with Postman)
Once the server is running, you can use Postman to send requests to your API. The API is running on http://localhost:3000.

1. Get All Books (View all books)
What to do:
Set the request type to GET.
Enter the URL: http://localhost:3000/books
Click Send.
What you'll see: A list of all your books.
2. Get One Book (View a specific book)
What to do:
Set the request type to GET.
Get a book's ID (you can get this from the "Get All Books" list).
Enter the URL: http://localhost:3000/books/YOUR_BOOK_ID (replace YOUR_BOOK_ID with a real ID).
Click Send.
What you'll see: The details of that specific book, or a "not found" message if the ID is wrong.
3. Add a New Book
What to do:
Set the request type to POST.
Enter the URL: http://localhost:3000/books
Go to the Body tab.
Select raw and then JSON from the dropdown.
Type this in the text box:
JSON

{
  "title": "My Awesome Book",
  "author": "Me Myself"
}
Click Send.
What you'll see: The details of the new book you just added, including its new ID.
4. Update a Book (Change a book's details)
What to do:
Set the request type to PUT.
Get a book's ID that you want to change.
Enter the URL: http://localhost:3000/books/YOUR_BOOK_ID
Go to the Body tab.
Select raw and then JSON.
Type what you want to change (title, author, or both):
JSON

{
  "title": "My Updated Awesome Book"
}
Click Send.
What you'll see: The updated details of the book.
5. Delete a Book
What to do:
Set the request type to DELETE.
Get a book's ID that you want to remove.
Enter the URL: http://localhost:3000/books/YOUR_BOOK_ID
Click Send.
What you'll see: A message confirming the book was deleted, or a "not found" message if the ID was wrong.
