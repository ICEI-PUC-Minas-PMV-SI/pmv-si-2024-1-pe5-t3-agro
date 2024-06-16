import { hash } from 'bcryptjs';
import WorkersRepository from '../repositories/worker-repository';
import { UserAlreadyExistsError } from './errors/user-already-exits-error';
import { Worker, Branch } from '@prisma/client';
import BranchRepository from '@/repositories/branch-repository';

export class GetAllBranchsUseCase {
	constructor(private branchRepository: BranchRepository) {}

	async execute(): Promise<{ branch: Branch[] }> {
		const branch = await this.branchRepository.getAll();
		return { branch };
	}
}
