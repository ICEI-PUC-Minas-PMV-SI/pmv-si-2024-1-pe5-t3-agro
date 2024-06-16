import { PrismaBranchRepository } from '@/repositories/prisma/primas-branch-repositories';
import { RegisterUseCase } from '../register';
import { PrismaWorkerRepository } from '@/repositories/prisma/prisma-worker-repositories';
export function makeRegisterUseCase() {
	const workerRepository = new PrismaWorkerRepository();
	const branchRepository = new PrismaBranchRepository();
	const registerUseCase = new RegisterUseCase(
		workerRepository,
		branchRepository
	);
	return registerUseCase;
}
