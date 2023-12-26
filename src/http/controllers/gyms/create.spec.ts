import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate";

describe("Create Gym (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create gym ", async () => {
		const { token } = await createAndAuthenticateUser(app);

		const response = await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "Javascript Gym",
				description: "Javascript Description.",
				phone: "119999999",
				latitude: -27.2092052,
				longitude: -49.6401091,
			});

		expect(response.statusCode).toEqual(201);
	});
});
