import { compare } from 'bcryptjs';
import { Worker } from '@prisma/client';
import WorkersRepository from '@/repositories/worker-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface AuthenticateRequest {
	email: string;
	password: string;
}
interface AuthenticateResponse {
	worker: Worker;
}

export class AuthenticateUseCase {
	constructor(private workerRepository: WorkersRepository) {}
	async execute({
		email,
		password,
	}: AuthenticateRequest): Promise<AuthenticateResponse> {
		const worker = await this.workerRepository.findByEmail(email);
		if (!worker) throw new InvalidCredentialsError();

		const doesPasswordMatch = await compare(password, worker.password_hash);

		if (!doesPasswordMatch) throw new InvalidCredentialsError();
		return { worker };
	}
}
