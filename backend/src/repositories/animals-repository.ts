import { Prisma, Animals } from '@prisma/client';

interface AnimalsRepository {
	create(data: Prisma.AnimalsCreateInput): Promise<Animals>;
	getAnimalsByBranchId(branchId: string): Promise<Animals[]>; // Replace 'any' with the appropriate return type
}

export default AnimalsRepository;
