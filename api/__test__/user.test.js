const request = require("supertest");
const app = require("../server");

// Test User Functionalities and Auth
describe("Test User Functionalities", () => {
  //Test Case : TA001
  describe("Register User Account", () => {
    test("should give 200 status", async () => {
      const response = await request(app)
        .post("/ticketnow/api/v1/user/sign-up")
        .send({
          userID: "TEST0001",
          email: "najexog233@hoxds.com",
          password: "1234",
          type: "passenger",
          name: "Test_User",
          mobileNo: "0714454235",
        });
      expect(response.statusCode).toBe(200);
      expect(response.data.code).toEqual("01");
    });
  });

  //Test Case : TA002
  describe("Check valid OTP", () => {
    test("should give 200 status", async () => {
      let userid = "admin";
      const response = await request(app)
        .post("/ticketnow/api/v1/user/check-otp")
        .send({
          userID: userid,
          otp: 9151,
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.code).toEqual("01");
      expect(response.body.result.status).toEqual("1");
      expect(response.body.result.userID).toEqual(userid);
    });
  });

  //Test Case : TA003
  describe("Check Invalid OTP", () => {
    test("should give 200 status", async () => {
      let userid = "admin";
      const response = await request(app)
        .post("/ticketnow/api/v1/user/check-otp")
        .send({
          userID: userid,
          otp: 9121,
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toEqual("02");
      expect(response.body.message).toEqual("Invalid OTP");
    });
  });
});
