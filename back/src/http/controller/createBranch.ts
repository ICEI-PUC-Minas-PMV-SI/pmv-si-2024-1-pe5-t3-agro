import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exits-error';
import { makeCreateBranchUseCase } from '@/use-cases/factories/make-createBranch-use-case';

export async function createBranch(
	request: FastifyRequest,
	reply: FastifyReply
): Promise<void> {
	const createBranchBodySchema = z.object({
		name: z.string(),
		address: z.string(),
	});
	const { name, address } = createBranchBodySchema.parse(request.body);

	const createBranchUseCase = makeCreateBranchUseCase();

	try {
		await createBranchUseCase.execute({ name, address });
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}
		throw error;
	}
	return reply.status(201).send();
}
