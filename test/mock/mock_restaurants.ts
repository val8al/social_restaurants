export const mockRestaurants = [
    {
      id: 'restaurant1',
      name: 'Restaurant 1',
      tables: [
        {
          number: 1,
          capacity: 4,
          outdoors: false,
          reservations: [
            { time: new Date('2024-07-24T19:30:00.000Z') }
          ]
        },
        {
          number: 2,
          capacity: 4,
          outdoors: true,
          reservations: []
        }
      ]
    },
    {
      id: 'restaurant2',
      name: 'Restaurant 2',
      tables: [
        {
          number: 3,
          capacity: 2,
          outdoors: false,
          reservations: []
        }
      ]
    }
  ];

  export const mockAvailableRestaurants = {
    restaurant1: [
      {
        tableNumber: 2,
        outdoors: true,
        capacity: 4,
        restaurantName: 'Restaurant 1'
      }
    ],
    restaurant2: [
      {
        tableNumber: 3,
        outdoors: false,
        capacity: 2,
        restaurantName: 'Restaurant 2'
      }
    ]
  }
  export const allReservedRestaurant = [
    {
      id: 'restaurant1',
      name: 'Restaurant 1',
      tables: [
        {
          number: 1,
          capacity: 4,
          outdoors: false,
          reservations: [
            { time: new Date('2024-07-24T19:30:00.000Z') }
          ]
        }
      ]
    }
  ]