import { ReservationModel } from "./model/schema/reservation_schema"

export const getAllReservations = async () => {
    return await ReservationModel.find({})
}