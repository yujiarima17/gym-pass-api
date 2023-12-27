import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate";

describe("Nearby Gyms (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to list nearby gyms ", async () => {
		const { token } = await createAndAuthenticateUser(app,true);

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "Javascript Gym",
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
				latitude: -27.8610928,
				longitude: -49.5229501,
			});

		const response = await request(app.server)
			.get("/gyms/nearby")
			.query({
				latitude: -27.2092053,
				longitude: -49.6401092,
			})
			.set("Authorization", `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.gyms).toHaveLength(1);
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: "Javascript Gym",
			}),
		]);
	});
});
