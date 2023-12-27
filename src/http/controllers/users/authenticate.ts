import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import fastifyCookie from "@fastify/cookie";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "../../../use-cases/factorires/make-authenticate-use-case";
export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, password } = authenticateBodySchema.parse(request.body);

	try {
		const authenticateUseCase = makeAuthenticateUseCase();

		const { user } = await authenticateUseCase.execute({
			email,
			password,
		});

		const token = await reply.jwtSign(
			{ role: user.role },
			{
				sign: {
					sub: user.id,
				},
			}
		);

		const refreshToken = await reply.jwtSign(
			{
				role: user.role,
			},
			{
				sign: {
					sub: user.id,
					expiresIn: "7d",
				},
			}
		);
		return reply
			.setCookie("refreshToken", refreshToken, {
				path: "/",
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(200)
			.send({
				token,
			});
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: error.message });
		}

		throw error;
	}

	return reply.status(200).send();
}
