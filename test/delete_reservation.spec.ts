
import { Types } from 'mongoose';
import { describe } from 'node:test';
import { deleteReservation } from '../src/delete_reservation';
import { ReservationModel } from '../src/model/schema/reservation_schema';
import { RestaurantModel } from '../src/model/schema/restaurant_schema';
import { UserModel } from '../src/model/schema/user_schema';

jest.mock('../src/model/schema/reservation_schema');
jest.mock('../src/model/schema/restaurant_schema');
jest.mock('../src/model/schema/user_schema');

describe('deleteReservation', () => {
  const mockReservationId = new Types.ObjectId().toString();
  const mockUserId = new Types.ObjectId().toString();
  const mockRestaurantId = new Types.ObjectId().toString();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockReservation = {
    _id: mockReservationId,
    restaurant: mockRestaurantId,
    userId: mockUserId,
  };

  const mockRestaurant = {
    _id: mockRestaurantId,
    tables: [
      { reservations: [mockReservationId] },
      { reservations: [] }
    ],
    save: jest.fn(),
  };

  const mockUser = {
    _id: mockUserId,
    reservations: [mockReservationId],
    save: jest.fn(),
  };

  it('should delete a reservation successfully', async () => {
    (ReservationModel.findById as jest.Mock).mockResolvedValue(mockReservation);
    (RestaurantModel.findById as jest.Mock).mockResolvedValue(mockRestaurant);
    (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);
    (ReservationModel.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

    const result = await deleteReservation(mockReservationId);

    expect(result).toBe(true);
    expect(mockRestaurant.save).toHaveBeenCalled();
    expect(mockUser.save).toHaveBeenCalled();
    expect(ReservationModel.findByIdAndDelete).toHaveBeenCalledWith(new Types.ObjectId(mockReservationId));
  });


  it('should handle errors and return false', async () => {
    (ReservationModel.findById as jest.Mock).mockImplementation(() => null);

    const result = await deleteReservation(mockReservationId);

    expect(result).toBe(false);
    expect(mockRestaurant.save).not.toHaveBeenCalled();
    expect(mockUser.save).not.toHaveBeenCalled();
    expect(ReservationModel.findByIdAndDelete).not.toHaveBeenCalled();
  });
});
