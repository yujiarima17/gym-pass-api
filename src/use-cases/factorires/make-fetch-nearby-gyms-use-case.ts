import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyns-repository";
import { FetchNearByGymsUseCase } from "../fetch-nearby-gyms";

export function makeFetchNearByGymsUseCase() {
	const prismaGymsRepository = new PrismaGymsRepository();

	const fetchNearByGymsUseCase = new FetchNearByGymsUseCase(
		prismaGymsRepository
	);

	return fetchNearByGymsUseCase;
}
