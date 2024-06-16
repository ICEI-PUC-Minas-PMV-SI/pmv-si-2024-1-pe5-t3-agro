import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import BranchRepository from '../branch-repository';

export class PrismaBranchRepository implements BranchRepository {
	async create(data: Prisma.BranchCreateInput) {
		const worker = await prisma.branch.create({
			data,
		});
		return worker;
	}

	async findByName(name: string) {
		return prisma.branch.findMany({
			where: {
				name: { contains: name },
			},
		});
	}

	async findById(id: string) {
		return prisma.branch.findUnique({
			where: {
				id,
			},
		});
	}
	async getAll() {
		return prisma.branch.findMany();
	}
}
