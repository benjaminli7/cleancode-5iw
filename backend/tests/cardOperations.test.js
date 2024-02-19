const request = require("supertest");
const app = require("../index.js");

describe("GET /cards", () => {
  it("should fetch all cards", async () => {
    const response = await request(app).get("/cards");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // it("should fetch cards filtered by tags", async () => {
  //   const tag = "Teamwork";
  //   const response = await request(app).get(`/cards?tags=${tag}`);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toEqual(
  //     expect.arrayContaining([expect.objectContaining({ tag })])
  //   );
  // });
});
describe("POST /cards", () => {
  it("should create a new card", async () => {
    const newCard = {
      question: "What is pair programming?",
      answer: "A practice to work in pair on the same computer.",
      tag: "Teamwork",
    };
    const response = await request(app).post("/cards").send(newCard);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(newCard));
  });
});

describe("GET /cards/quizz", () => {
  it("should fetch all cards for today's quiz", async () => {
    const response = await request(app).get("/cards/quizz");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
describe("PATCH /cards/{cardId}/answer", () => {
  it("should accept an answer for a card", async () => {
    const cardId = "some-card-id"; // Assume this exists
    const response = await request(app)
      .patch(`/cards/${cardId}/answer`)
      .send({ isValid: true });
    expect(response.statusCode).toBe(204);
  });
});
