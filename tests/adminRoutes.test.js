// tests/adminRoutes.test.js
const app = require('../index'); 
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Admin Routes', () => {
  it('GET /admin/dashboard should return status 200 and render admin dashboard page', async () => {
    // Make a request to the route
    const res = await chai.request(app).get('/admin/dashboard');
    // Assert the status code
    expect(res).to.have.status(200);
    expect(res.text).to.include('Admin Dashboard'); 
  });

  it('GET /admin/books should return status 200 and render book management page', async () => {
    const res = await chai.request(app).get('/admin/books');
    expect(res).to.have.status(200);
    expect(res.text).to.include('Book Management'); 
  });

  it('POST /admin/books/add should add a new book', async () => {
    const newBook = {
      title: 'New Book',
      description: 'Description of the new book',
      releaseDate: '2023-01-01',
      author: 'John Doe',
      genre: 'Fiction',
      image: 'https://example.com/image.jpg',
      price: 19.99,
      rating: 4.5,
    };

    const res = await chai.request(app).post('/admin/books/add').send(newBook);
    expect(res).to.have.status(200);

  });
});