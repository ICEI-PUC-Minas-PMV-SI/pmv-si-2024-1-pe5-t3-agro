import WorkersRepository from '@/repositories/worker-repository';
import { Worker } from '@prisma/client';

export interface GetAnimalByBranchIdRequest {
	branchId: string;
}

export interface GetAnimalByBranchIdResponse {
	workers: Worker[];
}

export class GetWorkerByBranchIdUseCase {
	constructor(private workerRepository: WorkersRepository) {}
	async execute({
		branchId,
	}: GetAnimalByBranchIdRequest): Promise<GetAnimalByBranchIdResponse> {
		const workers = await this.workerRepository.getWorkersByBranchId(branchId);
		if (!workers) {
			throw new Error('no animals found');
		}

		return { workers };
	}
}
