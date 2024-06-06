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

### GET /check-availability/
Display the availability for a given datetime, party size and dietary restrictions
```bash
curl "http://localhost:8080/check-availability?dietaryRestrictions=Vegan,Gluten-Free&time=2024-10-24T19:30:00.000Z&people=4"
```
Response will contain a list of object whose key is the ID of the restaurant: 
```json
{
    "60d5f9f7c2a0a0c2c8f1e1aa": [
        {
            "tableNumber": 11,
            "outdoors": false,
            "capacity": 3,
            "restaurantName": "Yellow Monkey"
        },
        {
            "tableNumber": 2,
            "outdoors": true,
            "capacity": 2,
            "restaurantName": "Yellow Monkey"
        }
    ],
    "60d5f9f7c2a0a0c2c8f1e1ad": [
        {
            "tableNumber": 6,
            "outdoors": false,
            "capacity": 6,
            "restaurantName": "Panaderia Rosetta"
        }
    ]
}
```
### POST /reserve/
Request body:
```bash
{
  "userId": "60d5f9f7c2a0a0c2c8f1e1af",
  "restaurantId": "60d5f9f7c2a0a0c2c8f1e1b1",
  "dateTime": "2024-10-24T19:30:00.000Z",
  "numberOfPeople": 4
}
```
Response will be either "success" or "failure" depending of the result of the operation

### DELETE /cancel-reservation/
Cancel a reservation given a reservationId
```bash
curl "http://localhost:8080/cancel-reservation?reservationId=60d5f9f7c2a0a0c2c8f1e1bb"
```
Response will be either "success" or "failure" depending of the result of the operation

### GET /all-reservations/

Endpoint only for practical purposes, intended to bring visibility of the reservation IDs
```bash
curl "http://localhost:8080/all-reservations/
```
Response will be a list of all reservations in DB
```json
[
    {
        "_id": "60d5f9f7c2a0a0c2c8f1e1bc",
        "dinners": [
            "60d5f9f7c2a0a4c2c8f1e1a2",
            "60d5f9f7c2a0a4c2c8f1e1a4"
        ],
        "restaurant": "60d5f9f7c2a0a0c2c8f1e1ab",
        "time": "2024-07-24T19:30:00.000Z",
        "userId": "60d5f9f7c2a0a0c2c8f1e1af"
    }
]
```
