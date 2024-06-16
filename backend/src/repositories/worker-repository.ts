import { Prisma, Worker } from '@prisma/client';

interface WorkersRepository {
	create(data: Prisma.WorkerCreateInput): Promise<Worker>;
	findByEmail(email: string): Promise<Worker | null>;
	findById(id: string): Promise<Worker | null>;
	getWorkersByBranchId(branchId: string): Promise<Worker[]>;
}

export default WorkersRepository;
