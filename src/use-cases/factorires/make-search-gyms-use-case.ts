import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { SearchGymsUseCase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyns-repository";

export function makeSearchGymsUseCase() {
	const prismaGymsRepository = new PrismaGymsRepository();

	const searchGymsUseCase = new SearchGymsUseCase(prismaGymsRepository);

	return searchGymsUseCase;
}
