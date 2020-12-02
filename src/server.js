import app from './App';


const porta = 3336;

app.listen(porta, '0.0.0.0').on('listening', () => {
  console.log(`API rodando no localhost: ${porta}`);
});

