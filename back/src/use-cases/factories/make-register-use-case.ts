import { RegisterUseCase } from '../register';
import { PrismaWorkerRepository } from '@/repositories/prisma/prisma-worker-repositories';
export function makeRegisterUseCase() {
	const workerRepository = new PrismaWorkerRepository();
	const registerUseCase = new RegisterUseCase(workerRepository);
	return registerUseCase;
}
