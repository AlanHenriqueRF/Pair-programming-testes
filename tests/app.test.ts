import supertest from "supertest";

import app from "../src/app";
import { FruitInput } from "services/fruits-service";
import fruits from "data/fruits";
import { Fruit } from "repositories/fruits-repository";

const api = supertest(app);

describe("Post/ fruits", () => {
  it("should return 201 when inserting a fruit", async () => {
    const fruit: FruitInput = { name: 'Maça', price: 5.99 }
    const { statusCode } = await api.post('/fruits').send(fruit);

    expect(statusCode).toBe(201);
  })
  it("should return 409 when inserting a fruit that is already registered", async () => {
    const fruit: FruitInput = { name: 'Maça', price: 5.99 }
    fruits.push({ ...fruit, id: 1 })

    const { statusCode } = await api.post('/fruits').send(fruit)
    expect(statusCode).toBe(409);
  })
  it("should return 422 when inserting a fruit with data missing", async () => {
    const fruit: FruitInput = { name: '', price: 5 }

    const { statusCode } = await api.post('/fruits').send(fruit)
    expect(statusCode).toBe(422);
  })
});

describe("Get/ Fruits", () => {
  it("shoud return 404 when trying to get a fruit by an id that doesn't exist", async () => {
    const { statusCode } = await api.get('/fruits/1234')
    expect(statusCode).toBe(404);
  })
  it("should return 400 when id param is present but not valid", async () => {
    const id = 'a'
    const { statusCode } = await api.get(`/fruits/${id}`)
    expect(statusCode).toBe(400);
  })
  it("should return one fruit when given a valid and existing id", async () => {
    const fruit: FruitInput = { name: 'Maça', price: 5.99 }
    fruits.push({ ...fruit, id: 1 })

    const { body,statusCode } = await api.get('/fruits/1')
    expect(statusCode).toBe(200);
    expect(body).toEqual(expect.objectContaining({ id: expect.any(Number), name: expect.any(String), price: expect.any(Number) }))
  })
  it("should return all fruits if no id is present",async ()=>{
    const { body, statusCode } = await api.get('/fruits')
    expect(statusCode).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining({ id: expect.any(Number), name: expect.any(String), price: expect.any(Number) })]));
  })
})


