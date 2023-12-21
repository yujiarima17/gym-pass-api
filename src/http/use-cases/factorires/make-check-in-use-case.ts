import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyns-repository";
import { CheckInUseCase } from "../checkin";
import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckInUseCase() {
	const prismaCheckInsRepository = new PrismaCheckInsRepository();
	
	const prismaGymsRepository = new PrismaGymsRepository();

	const checkInUseCase = new CheckInUseCase(
		prismaCheckInsRepository,
		prismaGymsRepository
	);

	return checkInUseCase;
}
