import { Dinner } from "../types/dinner"
import { Schema, model } from "mongoose";

export const dinnerSchema = new Schema<Dinner>({
    name: {type: String, required: true},
    dietary_restrictions: {type: [String], required: true}
});

export const DinnerModel = model<Dinner>('Dinner', dinnerSchema);