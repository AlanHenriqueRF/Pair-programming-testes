import supertest from "supertest";

import app from "../src/app";

const api = supertest(app);

describe("Post/ fruits", () => {
  it("should return 201 when inserting a fruit",async()=>{
    const {statusCode, body} = await api.post('/fruits').send({name:'maça',price:5});

    expect(statusCode).toBe(201);
  })
});