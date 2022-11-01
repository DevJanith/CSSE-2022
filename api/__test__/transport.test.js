const request = require("supertest");
const app = require("../server");

// Test User Functionalities and Auth
describe("Test Transport Functionalities", () => {
  //Test Case : TA001
  describe("Add Transport Timetable", () => {
    test("should give 200 status", async () => {
      const response = await request(app)
        .post("/ticketnow/api/v1/transport/add-transport")
        .send({
            busNO: "NA-4525",
            dateTime: "6.00pm",
            location: "Rajagiriya",
            travelingRoot: "144 Bus root",
            startLocation: "Fort",
            endLocation : "Rajagiriya",
            createdAt : "2022-06-14",
            updatedAt : "2022-09-30",
        });
      expect(response.statusCode).toBe(200);
        // expect(response.data.code).toEqual("01");
    });
  });
});