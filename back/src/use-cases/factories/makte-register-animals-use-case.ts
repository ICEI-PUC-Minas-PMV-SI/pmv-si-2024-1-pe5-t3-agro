import { PrismaBranchRepository } from '@/repositories/prisma/primas-branch-repositories';
import { PrismaAnimalsRepository } from '@/repositories/prisma/prisma-animal-repositories';
import { RegisterAnimalUseCase } from '../registerAnimal';
export function makeRegisterAnimalUseCase() {
	const animalRepository = new PrismaAnimalsRepository();
	const branchRepository = new PrismaBranchRepository();
	const registerUseCase = new RegisterAnimalUseCase(
		animalRepository,
		branchRepository
	);
	return registerUseCase;
}
