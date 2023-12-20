import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./checkin";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;
let gymsRepository: InMemoryGymsRepository;
describe("Check-in Use Case", () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository();
		gymsRepository = new InMemoryGymsRepository();
		sut = new CheckInUseCase(checkInsRepository, gymsRepository);

		gymsRepository.create({
			id: "gym-01",
			title: "Javascript Gym",
			description: null,
			phone: null,
			latitude: -23.534443,
			longitude: -46.6395357,
		});

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should be able to check in", async () => {
		const { checkIn } = await sut.execute({
			gymId: "gym-01",
			userId: "user-01",
			userLatitude: -23.534443,
			userLongitude: -46.6395357,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it("should not be able to check in twice on the same day", async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

		await sut.execute({
			gymId: "gym-01",
			userId: "user-01",
			userLatitude: -23.534443,
			userLongitude: -46.6395357,
		});

		await expect(() =>
			sut.execute({
				gymId: "gym-01",
				userId: "user-01",
				userLatitude: -23.534443,
				userLongitude: -46.6395357,
			})
		).rejects.toBeInstanceOf(MaxNumberCheckInsError);
	});

	it("should  be able to check in twice but on different days", async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

		await sut.execute({
			gymId: "gym-01",
			userId: "user-01",
			userLatitude: -23.534443,
			userLongitude: -46.6395357,
		});

		vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

		const { checkIn } = await sut.execute({
			gymId: "gym-01",
			userId: "user-01",
			userLatitude: -23.534443,
			userLongitude: -46.6395357,
		});
		expect(checkIn.id).toEqual(expect.any(String));
	});

	it("should not be able to check at a distant gym ", async () => {
		gymsRepository.items.push({
			id: "gym-02",
			title: "Javascript Gym",
			description: "",
			phone: "",
			latitude: new Decimal(-23.534443),
			longitude: new Decimal(-46.6395357),
		});

		await expect(() =>
			sut.execute({
				gymId: "gym-02",
				userId: "user-01",
				userLatitude: -23.4239405,
				userLongitude: -46.4395357,
			})
		).rejects.toBeInstanceOf(MaxDistanceError);
	});
});
