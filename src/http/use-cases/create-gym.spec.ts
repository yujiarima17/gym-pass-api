import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;
describe("Register Use Case", () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository();
		sut = new CreateGymUseCase(gymsRepository);
	});

	it("should be able to create a gym", async () => {
		const { gym } = await sut.execute({
			title: "Javascript Gym",
			description: null,
			phone: null,
			latitude: -23.534443,
			longitude: -46.6395357,
		});
		expect(gym.id).toEqual(expect.any(String));
	});
});
