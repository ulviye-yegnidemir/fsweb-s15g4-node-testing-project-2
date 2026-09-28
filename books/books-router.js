const router = require('express').Router();
const Books = require('./books-model');

router.get('/', async (req, res, next) => {
  try {
    const books = await Books.getAll();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const book = await Books.getById(req.params.id);

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({
        message: 'Kitap bulunamadı',
      });
    }
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
      return res.status(400).json({
        message: 'title, author ve year alanları zorunludur',
      });
    }

    const newBook = await Books.add({
      title,
      author,
      year,
    });

    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedCount = await Books.remove(req.params.id);

    if (deletedCount) {
      res.status(200).json({
        message: 'Kitap silindi',
      });
    } else {
      res.status(404).json({
        message: 'Kitap bulunamadı',
      });
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;