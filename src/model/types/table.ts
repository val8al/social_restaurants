import { Reservation } from "./reservation";

export interface Table {
    number: number;
    capacity: number;
    outdoors: boolean;
    restaurantId: String;
    restaurantName: String;
    reservations: Reservation[];
  }
  