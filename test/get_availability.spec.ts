import { getAvailability } from '../src/get_availability';
import { queryAvailableRestaurants } from '../src/model/queries/query_available_restaurants';
import { AvailabilityPresentation } from '../src/model/types/availability_presentation';
import { mockAvailableRestaurants, mockRestaurants, allReservedRestaurant } from './mock/mock_restaurants';

jest.mock('../src/model/queries/query_available_restaurants');

describe('getAvailability', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a set of matching restaurants', async () => {
    (queryAvailableRestaurants as jest.Mock).mockResolvedValue(mockRestaurants);
    const result: AvailabilityPresentation = await getAvailability('Vegan,Gluten-Free', '2024-07-24T19:30:00.000Z', '2');

    expect(result).toEqual(mockAvailableRestaurants);
    expect(queryAvailableRestaurants).toHaveBeenCalledWith(['Vegan', 'Gluten-Free'], 2);
  });

  it('should return an empty object if no restaurants match', async () => {
    (queryAvailableRestaurants as jest.Mock).mockResolvedValue([]);
    const result: AvailabilityPresentation 
        = await getAvailability('Carnibore', '2024-07-24T19:30:00.000Z', '2');

    expect(result).toEqual({});
  });

  it('should return an empty object if all tables are reserved at the given time', async () => {
    (queryAvailableRestaurants as jest.Mock).mockResolvedValue(allReservedRestaurant);
    const result: AvailabilityPresentation 
        = await getAvailability('Vegan', '2024-07-24T19:30:00.000Z', '2');

    expect(result).toEqual({});
  });
});
