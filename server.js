import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const users = [];

app.post('/usuarios', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        nome: req.body.nome,
        email: req.body.email,
        age: req.body.age,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao criar o usuário.' });
  }
});

app.get('/usuarios', (req, res) => {
  res.status(200).json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});