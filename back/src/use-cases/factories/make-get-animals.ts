import { PrismaAnimalsRepository } from '@/repositories/prisma/prisma-animal-repositories';
import { GetAnimalByBranchIdUseCase } from '../getAnimalsByBranchId';

export function makeGetAnimalUseCase() {
	const animalRepository = new PrismaAnimalsRepository();
	const registerUseCase = new GetAnimalByBranchIdUseCase(animalRepository);
	return registerUseCase;
}
