import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";
import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeFetchUserCheckInsHistoryUseCase() {
	const prismaCheckInsRepository = new PrismaCheckInsRepository();

	const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
		prismaCheckInsRepository
	);
    
	return fetchUserCheckInsHistoryUseCase;
}
