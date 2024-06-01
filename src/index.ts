import express from 'express';
import { checkAvailability } from './check_availability';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/check-availability/', async (req, res) => {

    res.send(
        await checkAvailability(
            req.query.dietaryRestrictions as string,
            req.query.time as string
        )
    )
  });
  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});