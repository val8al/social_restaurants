import express from 'express';
import { getAvailability } from './get_availability';
import { connectToDatabase } from './util/mongo/connectToDatabase';
import { infoMessage } from './consts';
import { reserveTimeslot } from './reserve';
import { deleteReservation } from './delete_reservation';
import { getAllReservations } from './get_all_reservations';

const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
});

app.get('/', (req, res) => {
  res.send(infoMessage);
});

app.get('/check-availability/', async (req, res) => {
    res.send(
        await getAvailability(
            req.query.dietaryRestrictions as string,
            req.query.time as string,
            req.query.people as string,
        ))
});

app.post('/reserve/', async (req, res) => {
  const {userId, restaurantId, dateTime, numberOfPeople} = req.body
  const reservationSuccessful = 
    await reserveTimeslot(userId, restaurantId, dateTime, numberOfPeople)
  res.send(reservationSuccessful ? "success" : "failure")
});

app.get('/all-reservations/', async (req, res) => {
  res.send(await getAllReservations())
});

app.delete('/cancel-reservation/', async (req,res) => {
  const deleteSuccesful = await deleteReservation(req.query.reservationId as string)
  res.send(deleteSuccesful ? "success" : "failure")
})