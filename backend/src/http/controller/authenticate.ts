import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply
): Promise<void> {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
	});
	const { email, password } = authenticateBodySchema.parse(request.body);

	const authenticateUseCase = makeAuthenticateUseCase();

	try {
		const worker = await authenticateUseCase.execute({ email, password });
		return reply.status(200).send({ worker });
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: error.message });
		}
		throw error;
	}
}
