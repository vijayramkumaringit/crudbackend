import fastify from 'fastify';
import auth from './plugins/auth';
import itemRoutes from './routes/items';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors'
import registerRoutes from './routes/register';

const app = fastify({ logger: true });

app.register(fastifyCors, {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  preflightContinue: false,
  credentials: true 
})

app.register (fastifyJwt,{secret:'supersecretkey'})
app.register(auth)
app.register(itemRoutes);
app.register(registerRoutes)
const PORT = 5000;

const start = async () => {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();