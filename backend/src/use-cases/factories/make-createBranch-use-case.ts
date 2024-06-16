import { PrismaBranchRepository } from '@/repositories/prisma/primas-branch-repositories';
import { CreateBranchUseCase } from '../createBranch';

export function makeCreateBranchUseCase() {
	const branchRepository = new PrismaBranchRepository();
	const createBrancUseCase = new CreateBranchUseCase(branchRepository);
	return createBrancUseCase;
}
