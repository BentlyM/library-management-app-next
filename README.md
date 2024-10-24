# SaaS Book Library Management System
=====================================

A full-stack SaaS application for managing book libraries, built using Next.js, React Query, and MUI

## Functionality
---------------

* User Registration
* User Login and Authentication
* User/Book details
* Book Management: create, update, delete
* User Chart Data
-----------------

### User Authentication

* `POST /register`: Register a new user.
* `POST /login`: Log in with a registered user.

### Book Management

* `GET /books/`: List of all available books.
* `GET /books/search?{title=?,summary=?,author=?}`: Update book details. 
* `POST /books/`: Add a new book.
* `PUT /books/`: Update book details.
* `DELETE /books/`: Delete a book from database.

## Technologies Used
--------------------
* Next.js
* useQuery
* supabase (mostly for auth)
* postgres/prisma

## Getting Started
---------------

[Link](https://library-management-app-tau.vercel.app/)
