import AnimalsRepository from '@/repositories/animals-repository';
import { Animals } from '@prisma/client';

export interface GetAnimalByBranchIdRequest {
	branchId: string;
}

export interface GetAnimalByBranchIdResponse {
	animals: Animals[];
}

export class GetAnimalByBranchIdUseCase {
	constructor(private animalRepository: AnimalsRepository) {}
	async execute({
		branchId,
	}: GetAnimalByBranchIdRequest): Promise<GetAnimalByBranchIdResponse> {
		const animals = await this.animalRepository.getAnimalsByBranchId(branchId);
		if (!animals) {
			throw new Error('no animals found');
		}

		return { animals };
	}
}
