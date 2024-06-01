import { Dinner } from "./dinner";
import { Restaurant } from "./restaurant";

export interface Reservation{
    _id: string,
    dinners: Dinner[],
    restaurant: Restaurant,
    time: Date
}