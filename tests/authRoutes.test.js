// tests/authRoutes.test.js
const app = require("../index");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);


describe("Auth Routes", () => {
  it("GET /auth/adminLogin should return status 200 and render adminLogin page", async () => {
    // Make a request to the route
    const res = await chai.request(app).get("/auth/adminLogin");
    // Assert the status code
    expect(res).to.have.status(200);
    expect(res.text).to.include("Admin Login");
  });

  chai.use(chaiHttp);
  
});
