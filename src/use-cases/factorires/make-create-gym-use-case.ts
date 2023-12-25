import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyns-repository";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymUseCase() {
	const prismaGymsRepository = new PrismaGymsRepository();

	const createGymUseCase = new CreateGymUseCase(prismaGymsRepository);

	return createGymUseCase;
}
