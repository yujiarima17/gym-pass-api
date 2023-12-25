import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchNearByGymsUseCase } from "@/use-cases/factorires/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
	const nearbyGymsQuerySchema = z.object({
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90;
		}),
		longitude: z.number().refine((value) => {
			return Math.abs(value) <= 180;
		}),
	});

	const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body);

	const fetchNearbyGymUseCase = makeFetchNearByGymsUseCase();

	const { gyms } = await fetchNearbyGymUseCase.execute({
		userlatitude: latitude,
		userlongitude: longitude,
	});

	return reply.status(201).send({
		gyms,
	});
}
