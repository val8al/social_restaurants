export interface AvailabilityPresentation {
    [restaurantId: string]: RestaurantAvPresentationInfo[]
}

interface RestaurantAvPresentationInfo {
    tableNumber: number, 
    capacity: number, 
    outdoors: boolean,
    restaurantName: string,
};