import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import AnimalsRepository from '../animals-repository';

export class PrismaAnimalsRepository implements AnimalsRepository {
	async create(data: Prisma.AnimalsCreateInput) {
		const worker = await prisma.animals.create({
			data,
		});
		return worker;
	}
	async getAnimalsByBranchId(branchId: string) {
		return prisma.animals.findMany({
			where: {
				branchId,
			},
		});
	}
}
