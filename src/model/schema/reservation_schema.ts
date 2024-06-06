import { Schema, model } from "mongoose";
import { Reservation } from "../types/reservation";

export const reservationSchema = new Schema<Reservation>({
  dinners: [{ type: Schema.Types.ObjectId, ref: 'Dinner' }],
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  time: { type: Date, required: true }
});

export const ReservationModel = model<Reservation>('Reservation', reservationSchema);