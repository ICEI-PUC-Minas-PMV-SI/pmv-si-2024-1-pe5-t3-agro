import { Prisma } from '@prisma/client';
import WorkersRepository from '../worker-repository';
import { prisma } from '../../lib/prisma';

export class PrismaWorkerRepository implements WorkersRepository {
	async create(data: Prisma.WorkerCreateInput) {
		const worker = await prisma.worker.create({
			data,
		});
		return worker;
	}

	async findByEmail(email: string) {
		return prisma.worker.findUnique({
			where: {
				email,
			},
		});
	}

	async findById(id: string) {
		return prisma.worker.findUnique({
			where: {
				id,
			},
		});
	}
}
