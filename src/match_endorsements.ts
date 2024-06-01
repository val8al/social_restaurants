import { Restaurant } from "./collections/types/restaurant";

export const matchEndorsements
    = (restaurants: Restaurant[], dietaryRestrictions: string[]) => {
        return restaurants.filter((restaurant) => {
            return dietaryRestrictions.every(restriction =>
                restaurant.endorsements.includes(restriction)
            );
        });
    }