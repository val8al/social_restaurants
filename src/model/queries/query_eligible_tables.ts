import { RestaurantModel } from "../schema/restaurant_schema";

export const queryEligibleTables = async (numberOfPeople: number) => {
    return await RestaurantModel.find({
        tables: {
            $elemMatch: {
              capacity: { $gte: numberOfPeople }
            }
          }
      });
}
