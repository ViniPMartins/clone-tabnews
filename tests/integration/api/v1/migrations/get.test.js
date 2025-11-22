import database from "infra/database";

beforeAll(clearDatabase);

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

clearDatabase();

test("GET to api/v1/migration should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
