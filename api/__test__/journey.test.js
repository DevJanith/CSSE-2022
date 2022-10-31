const request = require("supertest");
const app = require("../server");

// Test User Functionalities and Auth
describe("Test Journey Functionalities", () => {
  //Test Case : TA001
  describe("Add Journey of a passenger", () => {
    test("should give 200 status", async () => {
      const response = await request(app)
        .post("/ticketnow/api/v1/journey/add-journey")
        .send({
          busNo: "TEST0001",
          passenger: "635b575b4ce6b9c9153484ec",
          startLocation: "Malabe",
          endLocation: "Kegalle",
          fare: 500,
          date: "2022-10-02",
        });
      expect(response.statusCode).toBe(200);
      //   expect(response.data.code).toEqual("01");
    });
  });
});
