import supertest from "supertest";
import server from "./server";
import { gql } from "apollo-server-express";

describe("root path test", () => {
  it("should check the root path of the server", async () => {
    const res = await supertest(server).get("/");
    //Does return an expected status code
    expect(res.status).toBe(200);
  });
});

describe("Auth Mutations", () => {
  test("should test signup mutation", async () => {
    const createUser = gql`
      mutation {
        signup(
          username: "raytesting"
          first_name: "raytest"
          last_name: "somethingtesty"
          email: "ray@test.com"
          password: "test"
        ) {
          token
        }
      }
    `;

    const res = await supertest(server)
      .post("/")
      .query(createUser);

    expect(res.status).toBe(200);
  });

  test("should test login mutation", async () => {
    const loginUser = gql`
      mutation {
        login(email: "ray@test.com", password: "test") {
          token
        }
      }
    `;

    const res = await supertest(server)
      .post("/")
      .query(loginUser);

    expect(res.status).toBe(200);
  });
});
