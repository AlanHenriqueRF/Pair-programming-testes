import supertest from "supertest";

import app from "../src/app";
import { FruitInput } from "services/fruits-service";
import fruits from "data/fruits";

const api = supertest(app);

describe("Post/ fruits", () => {
  it("should return 201 when inserting a fruit",async()=>{
    const fruit: FruitInput = {name:'Maça',price: 5.99}
    const {statusCode} = await api.post('/fruits').send(fruit);

    expect(statusCode).toBe(201);
  })
  it("should return 409 when inserting a fruit that is already registered",async ()=>{
    const fruit: FruitInput = {name:'Maça',price: 5.99}
    fruits.push({...fruit,id:1})

    const {statusCode} = await api.post('/fruits').send(fruit)
    expect(statusCode).toBe(409);
  })
});


