import { app } from './app';
import { env } from './env/index,';

app
	.listen({
		port: env.PORT,
		host: '0.0.0.0',
	})
	.then(() => console.log('Server is running on http://localhost:3333 🚀'));
