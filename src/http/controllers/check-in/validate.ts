import { makeValidateCheckInUseCase } from "@/use-cases/factorires/make-validate-check-in-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
	const validateCheckInsParamsSchema = z.object({
		checkInId: z.string().uuid(),
	});
	const { checkInId } = validateCheckInsParamsSchema.parse(request.params);

	const validateCheckInUseCase = makeValidateCheckInUseCase();

	await validateCheckInUseCase.execute({
		checkInId,
	});

	return reply.status(204).send();
}
