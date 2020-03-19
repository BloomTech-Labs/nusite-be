//const request = require('supertest');
//const server = require('./server');

describe("root path test", () => {
  it("should check the root path of the server", async () => {
    const res = await request(server).get("/");
    //Does return an expected status code
    expect(res.status).toBe(200);
  });
});
