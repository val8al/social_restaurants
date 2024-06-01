import { Dinner } from './collections/types/dinner';
import { Reservation } from './collections/types/reservation';
import { Restaurant } from './collections/types/restaurant';
import { mockPaths } from './consts';
import { matchEndorsements } from './match_endorsements';
import { readJsonFile } from './util/readJsonFile';

export const checkAvailability = async (dietaryRestrictions: string, time: string): Promise<string> => {
    const restrictionsArray = dietaryRestrictions ? dietaryRestrictions.split(',') : [];
    const searchTime = new Date(time);
    let dinners: Dinner[], reservations: Reservation[], restaurants: Restaurant[];

    if (process.env.NODE_ENV == "test"){
        [dinners, reservations, restaurants] = await Promise.all(
            [readJsonFile(`${__dirname}/${mockPaths.dinners}`),
            readJsonFile(`${__dirname}/${mockPaths.reservations}`),
            readJsonFile(`${__dirname}/${mockPaths.restaurants}`)]
        )
    } else {
        restaurants = []
    }

    let eligibleReservations = matchEndorsements(restaurants, restrictionsArray);
    
    console.log(eligibleReservations)
    return JSON.stringify(eligibleReservations)
}