import { Schema, model } from "mongoose";
import { User } from "../types/user";
import { reservationSchema } from "./reservation_schema";

export const userSchema = new Schema<User>({
    username: { type: String, required: true },
    reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }]
  });

  export const UserModel = model<User>('User', userSchema);