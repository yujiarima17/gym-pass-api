import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearByGymsUseCaseRequest {
	userlatitude: number;
	userlongitude: number;
}
interface FetchNearByGymsUseCaseResponse {
	gyms: Gym[];
}
export class FetchNearByGymsUseCase {
	constructor(private gymsRepository: GymsRepository) {}

	async execute({
		userlatitude,
		userlongitude,
	}: FetchNearByGymsUseCaseRequest): Promise<FetchNearByGymsUseCaseResponse> {
		const gyms = await this.gymsRepository.findManyNearby({
			latitude: userlatitude,
			longitude: userlongitude,
		});
		return { gyms };
	}
}
