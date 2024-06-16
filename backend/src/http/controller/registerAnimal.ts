import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exits-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';
import { makeRegisterAnimalUseCase } from '@/use-cases/factories/makte-register-animals-use-case';

export async function registerAnimals(
	request: FastifyRequest,
	reply: FastifyReply
): Promise<void> {
	const registerBodySchema = z.object({
		name: z.string(),
		branchId: z.string(),
	});
	const { name, branchId } = registerBodySchema.parse(request.body);

	const registerUseCase = makeRegisterAnimalUseCase();

	try {
		await registerUseCase.execute({ name, branchId });
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}
		throw error;
	}
	return reply.status(201).send();
}
