import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";
import { makeCreateGymUseCase } from "@/use-cases/factorires/make-create-gym-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createGymBodySchema = z.object({
		title: z.string(),
		description: z.string().nullable(),
		phone: z.string().nullable(),
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90;
		}),
		longitude: z.number().refine((value) => {
			return Math.abs(value) <= 180;
		}),
	});

	const { description, latitude, longitude, phone, title } =
		createGymBodySchema.parse(request.body);

	const createGymUseCase = makeCreateGymUseCase();

	await createGymUseCase.execute({
		description,
		latitude,
		longitude,
		phone,
		title,
	});

	return reply.status(201).send();
}
