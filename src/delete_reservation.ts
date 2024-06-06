import { ReservationModel } from "./model/schema/reservation_schema";
import { RestaurantModel } from "./model/schema/restaurant_schema";
import { UserModel } from "./model/schema/user_schema";
import { Types } from 'mongoose';

export const deleteReservation = async (reservationId: string): Promise<boolean> => {
  const reservationObjectId = new Types.ObjectId(reservationId);

  const reservation = await ReservationModel.findById(reservationObjectId);
  if (!reservation){
    console.error('Reservation not found');
    return false; 
  }
  const restaurantId = new Types.ObjectId(reservation.restaurant as string);
  const userId = new Types.ObjectId(reservation.userId as string);
  const restaurant = await RestaurantModel.findById(restaurantId);
  const user = await UserModel.findById(userId);

  if (!restaurant || !user){
    console.error('restaurant or user not found');
    console.log(reservation.userId)
    return false;
  }

  try {
    restaurant.tables.forEach(table =>{
      const index = table.reservations.findIndex(
        reservation => new Types.ObjectId(reservation._id as string) === reservationObjectId)
      if (index !== -1) {
        table.reservations.splice(index, 1);
      }
    });

    await restaurant.save();

    const userReservationIndex = user.reservations.findIndex(
        reservation => new Types.ObjectId(reservation as string) === reservationObjectId
    )
    if (userReservationIndex !== -1) {
      user.reservations.splice(userReservationIndex, 1);
    }
    await user.save();
    await ReservationModel.findByIdAndDelete(reservationObjectId);

    return true;
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return false;
  }
};