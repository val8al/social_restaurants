import { queryAvailableRestaurants } from './model/queries/query_available_restaurants';
import { AvailabilityPresentation } from './model/types/availability_presentation';



export const getAvailability = async (dietaryRestrictions: string, time: string, amountOfPeople: string): Promise<AvailabilityPresentation> => {
  const restrictionsArray = dietaryRestrictions ? dietaryRestrictions.split(',') : [];
  const searchTime = new Date(time);
  const capacity = Number(amountOfPeople);
  const eligibleRestaurants = await queryAvailableRestaurants(restrictionsArray, capacity)
  
  let availabilityPresentation: AvailabilityPresentation= {};

  for (const restaurant of eligibleRestaurants) {
    for (const table of restaurant.tables) {
      if (table.capacity >= capacity) {
        let isAvailable = true;

        for (const reservation of table.reservations) {
          if (reservation && reservation.time.getTime() === searchTime.getTime()) {
            isAvailable = false;
            break;
          }
        }

        if (isAvailable) {
          if (!availabilityPresentation[restaurant.id]) {
            availabilityPresentation[restaurant.id] = [];
          }
          availabilityPresentation[restaurant.id].push({
            tableNumber: table.number, 
            outdoors: table.outdoors, 
            capacity: table.capacity,
            restaurantName: restaurant.name
          });
        }
      }
    }
  }
  return availabilityPresentation
}