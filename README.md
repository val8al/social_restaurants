# Social Restaurants

This project provides a backend service for managing restaurant reservations. It allows users to search for available restaurants that match their dietary restrictions and book tables.

## Installation

- You will need NodeJS https://www.python.org/downloads/

## Config

- This project uses MongoDB and requires a predefined set of restaurants and users. Please contact the developer to request access to the remote database on Mongo Atlas. 

## Usage
Clone for git and start the application.
```bash
npm install;
npm start
```
## Endpoints
Using Postman, curl or a browser use the following endpoints, please note the format inputs.

# GET /check-availability/
```bash
curl "http://localhost:8080/check-availability?dietaryRestrictions=Vegan,Gluten-Free&time=2024-10-24T19:30:00.000Z&people=4"
```

# POST /reserve/
R
Request body:
```bash
{
  "userId": "60d5f9f7c2a0a0c2c8f1e1af",
  "restaurantId": "60d5f9f7c2a0a0c2c8f1e1b1",
  "dateTime": "2024-10-24T19:30:00.000Z",
  "numberOfPeople": 4
}
```
# DELETE /cancel-reservation/
```bash
curl "http://localhost:8080/cancel-reservation?reservationId=60d5f9f7c2a0a0c2c8f1e1bb"
```

# GET /all-reservations/
```bash
curl "http://localhost:8080/all-reservations/
```
