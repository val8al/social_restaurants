import mongoose, { model } from "mongoose";
import { Restaurant } from "../types/restaurant";
import { tableSchema } from "./table_schema";

const Schema = mongoose.Schema

export const restaurantSchema = new Schema<Restaurant>({
    name: {
        type: String,
        required: true
    },
    endorsements: {
        type: [String],
        required: true
    },
    tables: {
        type: [tableSchema], required: true
    }
});

export const RestaurantModel = model<Restaurant>('restaurants', restaurantSchema, 'restaurants');