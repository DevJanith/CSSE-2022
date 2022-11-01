const request = require("supertest");
const app = require("../server");

// Test User Functionalities and Auth
describe("Test User Functionalities", () => {
  //Test Case : TA001
  describe("Register User Account for existing user ID", () => {
    test("should give 200 status", async () => {
      const response = await request(app)
        .post("/ticketnow/api/v1/user/sign-up")
        .send({
          userID: "200033904226",
          email: "test@gmail.com",
          password: "1234",
          type: "passenger",
          name: "Test_User",
          mobileNo: "0714454235",
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toEqual("02");
      expect(response.body.message).toEqual("User already exist");
    });
  });

  //Test Case : TA002

  describe("Register User Account for existing user ID", () => {
    test("should give 200 status", async () => {
      const response = await request(app)
        .post("/ticketnow/api/v1/user/sign-up")
        .send({
          userID: "200033904226s",
          email: "test@gmail.com",
          password: "1234",
          type: "passenger",
          name: "Test_User",
          mobileNo: "0714454235",
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.code).toEqual("01");
      expect(response.body.result).toBeDefined();
    });
  });

  //Test Case : TA003
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

  //Test Case : TA004
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

  //Test Case : TA005

  // Use ID is used to add credit to user account
  describe("Add Credit to Existing User with User ID", () => {
    test("should give 200 status and the result message with resonse", async () => {
      let userid = "200033904226";
      const response = await request(app)
        .post("/ticketnow/api/v1/user/add-credit")
        .send({
          userID: userid,
          amount: 100,
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.code).toEqual("01");
      expect(response.body.result).toEqual("credit added");
    });
  });

  //Test Case : TA006
  describe("Add Credit for Non existing User ID", () => {
    test("should give 200 status and the error message with resonse", async () => {
      let userid = "11111111";
      const response = await request(app)
        .post("/ticketnow/api/v1/user/add-credit")
        .send({
          userID: userid,
          amount: 100,
        });

      expect(response.statusCode).toBe(404);
      expect(response.body.code).toEqual("02");
      expect(response.body.message).toEqual("User doesn't exist");
    });
  });
});
