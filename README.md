Social Restaurants
This project is a backend service for managing restaurant reservations. Made by Valentin Ochoa as a challenge for Nelo.

You will need a MongoDB with some restaurants pre-set up

Endpoints
Check Availability
Endpoint: GET /check-availability

Query Parameters:

dietaryRestrictions (string): Comma-separated list of dietary restrictions (e.g., "Vegan,Gluten-Free").
time (string): Desired reservation time in ISO format (e.g., "2024-10-24T19:30:00.000Z").
people (string): Number of people for the reservation.
Example:

sh
Copy code
curl "http://localhost:8080/check-availability?dietaryRestrictions=Vegan,Gluten-Free&time=2024-10-24T19:30:00.000Z&people=4"
Make a Reservation
Endpoint: POST /reserve

Request Body:

json
Copy code
{
  "userId": "60d5f9f7c2a0a0c2c8f1e1af",
  "restaurantId": "60d5f9f7c2a0a0c2c8f1e1b1",
  "dateTime": "2024-12-24T19:30:00.000+00:00",
  "numberOfPeople": 4
}
Example:

sh
Copy code
curl -X POST -H "Content-Type: application/json" -d '{
  "userId": "60d5f9f7c2a0a0c2c8f1e1af",
  "restaurantId": "60d5f9f7c2a0a0c2c8f1e1b1",
  "dateTime": "2024-10-24T19:30:00.000Z",
  "numberOfPeople": 4
}' "http://localhost:8080/reserve"
Get All Reservations
Endpoint: GET /all-reservations

Example:

sh
Copy code
curl "http://localhost:8080/all-reservations"
Cancel a Reservation
Endpoint: DELETE /cancel-reservation

Query Parameters:

reservationId (string): The ID of the reservation to delete.
Example:

sh
Copy code
curl -X DELETE "http://localhost:8080/cancel-reservation?reservationId=60d5f9f7c2a0a0c2c8f1e1bb"
