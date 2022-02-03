const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("it should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("content-type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "uss enterprise",
    rocket: "NCC 1701-D",
    target: "Keplor-186 f",
    launchDate: "January 4,2028",
  };
  //   excluding the date.
  //   to test separately

  const launchDataWithoutTheDate = {
    mission: "uss enterprise",
    rocket: "NCC 1701-D",
    target: "Keplor-186 f",
  };
  const launchDataWithInvalidTheDate = {
    mission: "uss enterprise",
    rocket: "NCC 1701-D",
    target: "Keplor-186 f",
    launchDate: "hello",
  };

  test("it should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("content-type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(requestDate).toBe(responseDate);

    expect(response.body).toMatchObject(launchDataWithoutTheDate);
  });

  test("it should catch missing properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutTheDate)
      .expect("content-type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "missing required mission property",
    });
  });

  test("it should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidTheDate)
      .expect("content-type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid Launch Date",
    });
  });
});
