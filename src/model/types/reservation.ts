import { Dinner } from "./dinner";

export interface Reservation{
    _id: String,
    restaurant: String,
    userId: String,
    time: Date,
    dinners?: Dinner[]
}