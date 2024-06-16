import { PrismaWorkerRepository } from '@/repositories/prisma/prisma-worker-repositories';
import { AuthenticateUseCase } from '../authenticate';
export function makeAuthenticateUseCase() {
	const workerRepository = new PrismaWorkerRepository();
	const authenticateUseCase = new AuthenticateUseCase(workerRepository);
	return authenticateUseCase;
}
