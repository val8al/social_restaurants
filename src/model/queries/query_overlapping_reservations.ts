import { Types } from "mongoose";
import { ReservationModel } from "../schema/reservation_schema";

export const queryOverlappingReservations = async (userId: string, time: Date) => {
    const startTime = new Date(time.getTime() - 2 * 60 * 60 * 1000);
    const endTime = new Date(time.getTime() + 2 * 60 * 60 * 1000);
    const userObjectId = new Types.ObjectId(userId);
    
    return await ReservationModel.find({
        user: userObjectId,
        time: { $gte: startTime, $lte: endTime }
      });
}