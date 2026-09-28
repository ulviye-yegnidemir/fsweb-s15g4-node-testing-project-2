const request = require('supertest');
const server =require('../server');
const db = require('../data/db-config');
beforeAll(async () => {
await db.migrate.rollback();
await db.migrate.latest();
await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});
describe('Books API testleri', () => {
  test('GET /api/books 200 durum kodu döndürür', async () => {
    const response = await request(server).get('/api/books');

    expect(response.status).toBe(200);
  });
  test('GET /api/books bir dizi döndürür', async () => {
  const response = await request(server).get('/api/books');

  expect(Array.isArray(response.body)).toBe(true);
});

test('GET /api/books/1 mevcut kitabı getirir', async () => {
  const response = await request(server).get('/api/books/1');

  expect(response.status).toBe(200);
  expect(response.body.id).toBe(1);
});
test('GET /api/books/999 olmayan kitap için 404 döndürür', async () => {
  const response = await request(server).get('/api/books/999');

  expect(response.status).toBe(404);
  expect(response.body.message).toBe('Kitap bulunamadı');
});
test('POST /api/books yeni kitap ekler', async () => {
  const newBook = {
    title: 'Kürk Mantolu Madonna',
    author: 'Sabahattin Ali',
    year: 1943,
  };

  const response = await request(server)
    .post('/api/books')
    .send(newBook);

  expect(response.status).toBe(201);
  expect(response.body.title).toBe('Kürk Mantolu Madonna');
});
test('POST /api/books title eksikse 400 döndürür', async () => {
  const incompleteBook = {
    author: 'Sabahattin Ali',
    year: 1943,
  };

  const response = await request(server)
    .post('/api/books')
    .send(incompleteBook);

  expect(response.status).toBe(400);
});
test('POST /api/books author eksikse 400 döndürür', async () => {
  const incompleteBook = {
    title: 'Kürk Mantolu Madonna',
    year: 1943,
  };

  const response = await request(server)
    .post('/api/books')
    .send(incompleteBook);

  expect(response.status).toBe(400);
});
test('POST /api/books year eksikse 400 döndürür', async () => {
  const incompleteBook = {
    title: 'Kürk Mantolu Madonna',
    author: 'Sabahattin Ali',
  };

  const response = await request(server)
    .post('/api/books')
    .send(incompleteBook);

  expect(response.status).toBe(400);
});
test('DELETE /api/books/2 mevcut kitabı siler', async () => {
  const response = await request(server).delete('/api/books/2');

  expect(response.status).toBe(200);
  expect(response.body.message).toBe('Kitap silindi');
});
test('DELETE /api/books/999 olmayan kitap için 404 döndürür', async () => {
  const response = await request(server).delete('/api/books/999');

  expect(response.status).toBe(404);
  expect(response.body.message).toBe('Kitap bulunamadı');
});
});