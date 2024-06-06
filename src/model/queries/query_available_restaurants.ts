import { ReservationModel } from "../schema/reservation_schema";
import { RestaurantModel } from "../schema/restaurant_schema";

export const queryAvailableRestaurants = async (restrictions: String[], amountOfPeople: Number) => {
    return await RestaurantModel.find({
        endorsements: { $all: restrictions },
        tables: {
          $elemMatch: {
            capacity: { $gte: amountOfPeople }
          }
        }
      }).populate({path: 'tables.reservations', model: ReservationModel});
    } 