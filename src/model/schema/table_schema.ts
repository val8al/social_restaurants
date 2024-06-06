import { Schema, model } from "mongoose";
import { Table } from "../types/table";
import { reservationSchema } from "./reservation_schema";

export const tableSchema = new Schema<Table>({
    number: { type: Number, required: true },
    capacity: { type: Number, required: true },
    outdoors: { type: Boolean, required: true },
    reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }]
  });

  export const TableModel = model<Table>('Table', tableSchema);