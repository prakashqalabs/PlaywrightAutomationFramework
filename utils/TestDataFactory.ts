import { Booking } from '../models/api/BookingModel.ts';

export class TestDataFactory {

    static createBooking(overrides: Partial<Booking> = {}): Booking {
        return {
            firstname:       'James',
            lastname:        'Brown',
            totalprice:      150,
            depositpaid:     true,
            bookingdates: {
                checkin:  '2024-01-01',
                checkout: '2024-01-10',
            },
            additionalneeds: 'Breakfast',
            ...overrides,
        };
    }

    static updatedBooking(): Booking {
        return {
            firstname:       'John',
            lastname:        'Smith',
            totalprice:      250,
            depositpaid:     false,
            bookingdates: {
                checkin:  '2024-06-01',
                checkout: '2024-06-10',
            },
            additionalneeds: 'Lunch',
        };
    }
}