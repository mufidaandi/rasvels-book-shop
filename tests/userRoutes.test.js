// tests/authRoutes.test.js
const app = require("../index");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);


describe('User Routes', () => {
    it('GET /home should return status 200 and render user home page', async () => {
      // Make a request to the route
      const res = await chai.request(app).get('/home');
      // Assert the status code
      expect(res).to.have.status(200);
    });
  
    it('GET /book-list should return status 200 and render book list page', async () => {
      const res = await chai.request(app).get('/book-list');
      expect(res).to.have.status(200);
    });
  
  });