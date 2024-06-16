import { Prisma, Branch, Animals } from '@prisma/client';

interface BranchRepository {
	create(data: Prisma.BranchCreateInput): Promise<Branch>;
	findById(id: string): Promise<Branch | null>;
	findByName(name: string): Promise<Branch[] | null>;
}

export default BranchRepository;
