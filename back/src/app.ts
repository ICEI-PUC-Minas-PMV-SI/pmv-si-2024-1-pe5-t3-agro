import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env/index,';
import { appRoutes } from './http/routes';

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, request, reply) => {
	if (error instanceof ZodError) {
		reply
			.status(400)
			.send({ message: 'validation error', issues: error.format() });
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error);
	}
	return reply.status(500).send({ message: 'Internal server error' });
});
