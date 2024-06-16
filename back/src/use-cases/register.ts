import { hash } from 'bcryptjs';
import WorkersRepository from '../repositories/worker-repository';
import { UserAlreadyExistsError } from './errors/user-already-exits-error';
import { Worker } from '@prisma/client';
import BranchRepository from '@/repositories/branch-repository';

interface RegisterUseCaseDTO {
	name: string;
	email: string;
	password: string;
	branchId: string;
}

export class RegisterUseCase {
	constructor(
		private workerRepository: WorkersRepository,
		private branchRepository: BranchRepository
	) {}

	async execute({
		email,
		name,
		password,
		branchId,
	}: RegisterUseCaseDTO): Promise<{ worker: Worker }> {
		const branch = await this.branchRepository.findById(branchId);
		if (!branch) throw new Error('Branch not found');
		const password_hash = await hash(password, 6);

		const userWithSameEmail = await this.workerRepository.findByEmail(email);

		if (userWithSameEmail) throw new UserAlreadyExistsError();

		const worker = await this.workerRepository.create({
			name,
			email,
			password_hash,
			Branch: { connect: { id: branchId } },
		});

		return { worker };
	}
}
