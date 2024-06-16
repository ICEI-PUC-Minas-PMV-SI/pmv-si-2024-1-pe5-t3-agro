import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exits-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';

export async function register(
	request: FastifyRequest,
	reply: FastifyReply
): Promise<void> {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(8),
		branchId: z.string(),
	});
	const { name, email, password, branchId } = registerBodySchema.parse(
		request.body
	);

	const registerUseCase = makeRegisterUseCase();

	try {
		await registerUseCase.execute({ name, email, password, branchId });
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}
		throw error;
	}
	return reply.status(201).send();
}
