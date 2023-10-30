# Market Place MERN Web App README

## Project Name

**Buy Sell paradise**

## Project Description

My Buy Sell paradise is a full-stack web application that allows users to register and put products on sale and also purchase products.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Frontend](#frontend)
- [Backend](#backend)
- [Database](#database)
- [Authentication](#authentication)


## Features

- User registration and authentication using JWT
- Create, read, update, and delete through Mongoose ORM 
- Users can put/delete their products and view their own products 
- Password encryption using bcrypt

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- JWT

## Prerequisites

- Node.js [Installation Guide](https://nodejs.org/)
- MongoDB [Installation Guide](https://docs.mongodb.com/manual/installation/)

## Installation

1. Clone the repository:

git clone 

2. Navigate to the project directory:

cd mern-setyl

3. Install dependencies for the server (backend):

npm install 

4. Navigate to the client directory (frontedn):

cd frontend

5. Install dependencies for the client:

npm install 

7. Set up your environment variables (a .env file is needed for this web app, instructions provided in `Configuration`).

8. Start the development server:

In backend directory:
npm start 

In frontend directory:
npm start



## Configuration

Create a `.env` file in the backend directory with the following content:

PORT=4000
MONGO_URI=your_mongodb_uri (for example: `mongodb://127.0.0.1:27017/mern-setyl`)
SECRET_KEY=your_secret_key (any string)


## Usage 
Login/ Signup in the web app with username, email id and password
Put Products using the available form 
Search through the form using Search keyword

## API Routes

### Users

- **POST /api/user/login**
  - Description: To login the user.

- **POST /api/user/login**
  - Description: To login the user.

### Products

- **GET /api/products/**
  - Description: To get all the products

- **GET /api/products/myproducts**
  - Description: To get all the products of a particular user

- **POST /api/products/**
  - Description: To create a new product

- **DELETE /api/products/**
  - Description: To delete a single product

- **PATCH /api/products/**
  - Description: To update a single product

## Frontend 
Contexts and Hooks are used to provide state management to this web app. The whole structure is divided into components and pages part

## Backend 
Router are created for authentication and products services. Controllers are created for handling routes of these routers. Authentication middleware is created for verifying the JWT token and finding the associated user. 
Mongoose static methods are used for login and signup logic (creating JWT tokens and signing them).

## Database
Mongodb is used as a primary database for this wep application along with Mongoose as an ORM 
Two mongoose models are created for 'user' and 'product' documents 
Local host is used currently for the database services.

## Authentication
Json Web Tokens are used for authentication for accessing some protected routes of the server 
The tokens are stored in the localStorage on the client side, which expires in 10 hr

