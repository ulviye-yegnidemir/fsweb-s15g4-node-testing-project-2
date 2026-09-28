

const express = require('express');
const booksRouter = require('./books/books-router');

const server = express();

server.use(express.json());
server.use('/api/books', booksRouter);

server.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    message: 'Sunucu hatası oluştu',
  });
});

module.exports = server;