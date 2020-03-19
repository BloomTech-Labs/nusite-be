import supertest from 'supertest'
import server from './server'

describe("root path test", () => {
  it("should check the root path of the server", async () => {
    const res = await supertest(server).get("/");
    //Does return an expected status code
    expect(res.status).toBe(200);
  });
}); 
