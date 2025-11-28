import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitforAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

async function clearDatabase() {}

test("POST to api/v1/migration should return 200", async () => {
  const responseBeforeMigrations = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );
  expect(responseBeforeMigrations.status).toBe(201);

  const responseBodyBeforeMigrations = await responseBeforeMigrations.json();
  expect(Array.isArray(responseBodyBeforeMigrations)).toBe(true);

  const responseAfterMigrations = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );
  expect(responseAfterMigrations.status).toBe(200);

  const responseBodyAfterMigrations = await responseAfterMigrations.json();
  expect(responseBodyAfterMigrations.length).toEqual(0);
});
