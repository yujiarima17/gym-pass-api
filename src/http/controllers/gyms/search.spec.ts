import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate";

describe("Search Gyms (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to search gyms by title", async () => {
		const { token } = await createAndAuthenticateUser(app, true);

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "JavaScript Gym",
				description: "Javascript Description.",
				phone: "119999999",
				latitude: -27.2092052,
				longitude: -49.6401091,
			});

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "Typescript Gym",
				description: "Typescript Description.",
				phone: "119999999",
				latitude: -27.2092052,
				longitude: -49.6401091,
			});

		const response = await request(app.server)
			.get("/gyms/search")
			.query({
				q: "JavaScript",
			})
			.set("Authorization", `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.gyms).toHaveLength(1);
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: "JavaScript Gym",
			}),
		]);
	});
});
