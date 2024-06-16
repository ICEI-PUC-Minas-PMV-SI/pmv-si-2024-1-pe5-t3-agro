import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exits-error';
import { makeGetAnimalUseCase } from '@/use-cases/factories/make-get-animals';

export async function getAnimal(
	request: FastifyRequest,
	reply: FastifyReply
): Promise<void> {
	const registerBodySchema = z.object({
		branchId: z.string(),
	});
	const { branchId } = registerBodySchema.parse(request.body);

	const registerUseCase = makeGetAnimalUseCase();

	try {
		const animals = await registerUseCase.execute({ branchId });
		return reply.status(201).send({ animals });
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}
		throw error;
	}
}
