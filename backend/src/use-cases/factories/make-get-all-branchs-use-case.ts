import { PrismaBranchRepository } from '@/repositories/prisma/primas-branch-repositories';
import { GetAllBranchsUseCase } from '../getAllBranches';

export function makeGetAllBranches() {
	const branchRepository = new PrismaBranchRepository();
	const registerUseCase = new GetAllBranchsUseCase(branchRepository);
	return registerUseCase;
}
