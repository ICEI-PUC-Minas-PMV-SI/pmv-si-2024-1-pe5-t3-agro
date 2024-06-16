import AnimalsRepository from '@/repositories/animals-repository';
import BranchRepository from '@/repositories/branch-repository';
import { Animals, AnimalType } from '@prisma/client';

export interface RegisterAnimalRequest {
	name: string;
	branchId: string;
}

export interface RegisterAnimalResponse {
	animal: Animals;
}

export class RegisterAnimalUseCase {
	constructor(
		private animalRepository: AnimalsRepository,
		private branchRepository: BranchRepository
	) {}
	async execute({
		name,
		branchId,
	}: RegisterAnimalRequest): Promise<RegisterAnimalResponse> {
		const branch = await this.branchRepository.findById(branchId);
		if (!branch) {
			throw new Error('Branch not found');
		}

		const animal = await this.animalRepository.create({
			name,
			type: AnimalType.CHICKEN,
			price: 0, // Add the price property with a default value
			Branch: { connect: { id: branchId } },
		});

		return { animal };
	}
}
