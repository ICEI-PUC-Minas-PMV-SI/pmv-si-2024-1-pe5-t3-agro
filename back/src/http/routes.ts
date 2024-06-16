import { FastifyInstance } from 'fastify';
import { register } from './controller/register';
import { authenticate } from './controller/authenticate';
import { getWorker } from './controller/getWorker';
import { registerAnimals } from './controller/registerAnimal';
import { getAnimal } from './controller/getAnimals';
import { getBranch } from './controller/getBranch';

export async function appRoutes(app: FastifyInstance) {
	app.post('/users', register);
	app.post('/sessions', authenticate);
	app.get('/users', getWorker);
	app.post('/animal', registerAnimals);
	app.get('/animal', getAnimal);
	app.get('branches', getBranch);
}
