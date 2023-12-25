import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearByGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearByGymsUseCase;
describe("fetch Nearby Gyms  Use Case", () => {
	beforeEach(async () => {
		gymsRepository = new InMemoryGymsRepository();
		sut = new FetchNearByGymsUseCase(gymsRepository);
	});

	it("should be able to fetch nearby gyms", async () => {
		await gymsRepository.create({
			title: "Near Gym",
			description: null,
			phone: null,
			latitude: -23.534443,
			longitude: -46.6395357,
		});

		await gymsRepository.create({
			title: "Far Gym",
			description: null,
			phone: null,
			latitude: -23.4792817,
			longitude: -46.5458546,
		});

		const { gyms } = await sut.execute({
			userlatitude: -23.534443,
			userlongitude: -46.6395357,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
	});
});
