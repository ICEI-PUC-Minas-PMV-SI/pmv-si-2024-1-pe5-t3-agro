import { PrismaWorkerRepository } from '@/repositories/prisma/prisma-worker-repositories';
import { GetWorkerByBranchIdUseCase } from '../getWorkersByBranchid';

export function makeGetWorkerUseCase() {
	const workerRepository = new PrismaWorkerRepository();
	const registerUseCase = new GetWorkerByBranchIdUseCase(workerRepository);
	return registerUseCase;
}
