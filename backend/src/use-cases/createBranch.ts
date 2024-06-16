import { hash } from 'bcryptjs';
import WorkersRepository from '../repositories/worker-repository';
import { UserAlreadyExistsError } from './errors/user-already-exits-error';
import { Worker, Branch } from '@prisma/client';
import BranchRepository from '@/repositories/branch-repository';

interface CreateBranchUseCaseDTO {
	name: string;
	address: string;
}

export class CreateBranchUseCase {
	constructor(private branchRepository: BranchRepository) {}

	async execute({
		name,
		address,
	}: CreateBranchUseCaseDTO): Promise<{ branch: Branch }> {
		const branchWIthSameName = await this.branchRepository.findByName(name);

		if (branchWIthSameName && branchWIthSameName.length > 0)
			throw new UserAlreadyExistsError();

		const branch = await this.branchRepository.create({
			name,
			address,
		});

		return { branch };
	}
}
