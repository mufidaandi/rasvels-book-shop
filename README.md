# Rasvel's Book Shop and Management System

This Node.js project is a comprehensive solution designed for managing a bookshop's inventory and operations, viewing and placing orders for books.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Admin](#admin)
  - [User](#user)

## Features

- **Inventory Management:** Keep track of your book inventory efficiently with features for adding, updating, and removing books.
- **User-Friendly Interface:** Enjoy a sleek and intuitive user interface for easy navigation and interaction.
- **Customer Interaction:** Users can log in as customers to view available books and place orders.

## Getting Started

To set up Rasvel's Book Shop and Management System locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/try/download/compass) database

### Installation

1. **Install Dependencies:**

    ```bash
    npm install
    npm install bcrypt ejs passport passport-local express-session mongoose
    ```

2. **Run the Application:**

    ```bash
    node index.js
    ```

For the user page, visit `http://localhost:9000/home` in your browser to access the user application.
For the admin page, visit `http://localhost:9000/admin/dashboard` in your browser to access the admin application.

## Usage

### Admin

Admins can log in to the system to manage books effectively. Admin functionalities include:

- Add, update, and delete books.
- Manage book stocks.

### User

Users can log in to the system to view available books and place orders. User functionalities include:

- View the list of available books.
- Place orders for desired books.
