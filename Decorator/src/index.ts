import express from 'express';
import HelloWorldRoute from './routes/HelloWorldRoute';

const app = express();

// Middleware global (opcional para parse de JSON)
app.use(express.json());

// Rotas
app.use(HelloWorldRoute);

app.get('/', (req, res) => { res.send('Hello World!'); });

// Inicializar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
