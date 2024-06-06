import { Types } from "mongoose";
import { ReservationModel } from "./model/schema/reservation_schema";
import { RestaurantModel } from "./model/schema/restaurant_schema";
import { UserModel } from "./model/schema/user_schema";
import { queryEligibleTables } from "./model/queries/query_eligible_tables";
import { queryOverlappingReservations } from "./model/queries/query_overlapping_reservations";

export const reserveTimeslot = async (userId: string, restaurantId: string, dateTime: string, numberOfPeople: number): Promise<boolean> => {
  const restaurantObjectId = new Types.ObjectId(restaurantId);
  const time = new Date(dateTime)
  const userObjectId = new Types.ObjectId(userId);
  const overlappingReservations = await queryOverlappingReservations(userId,time)
  const tablesAvailable = await queryEligibleTables(numberOfPeople)

  if (overlappingReservations.length > 0  || !tablesAvailable) {
    return false;
  }

  const restaurant = await RestaurantModel.findById(restaurantObjectId);
  const user = await UserModel.findById(userObjectId);

  if (!restaurant || !user) {
    console.log("Invalid user/restaurant")
    return false;
  }
  
  const newReservation = new ReservationModel({
    restaurant: restaurantId,
    userId: userId,
    time: new Date(time)
  });

  try {
    const savedReservation = await newReservation.save();

    const assignedTable = restaurant.tables.find(table => table.capacity >= numberOfPeople)
    if(assignedTable){
        assignedTable.reservations.push(savedReservation.id);
        await restaurant.save();
    }else{
        console.log("no tables available!")
        return false
    }
    user.reservations.push(savedReservation.id);
    await user.save();
    return true;
  }catch (error) {
    console.error('Error saving reservation:', error);
    return false;
  }
};
