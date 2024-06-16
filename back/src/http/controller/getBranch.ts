import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exits-error';
import { makeGetAllBranches } from '@/use-cases/factories/make-get-all-branchs-use-case';

export async function getBranch(
	request: FastifyRequest,
	reply: FastifyReply
): Promise<void> {
	const registerUseCase = makeGetAllBranches();

	try {
		const branches = await registerUseCase.execute();
		return reply.status(201).send({ branches });
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}
		throw error;
	}
}
