import {expect, test} from 'vitest';
import { Appointment } from './appointment';
import {getFutureDate} from '../tests/utils/get-future-date';

test('create an appointement', () => {

    const startsAt = getFutureDate('2023-09-03');
    const endsAt = getFutureDate('2023-09-04');

    const appointement = new Appointment({
        customer: "John Doe",
        startsAt,
        endsAt
    });

    expect(appointement).toBeInstanceOf(Appointment);
    expect(appointement.Customer).toEqual("John Doe")
})

test('cannot create an appointemnt with end date before start date', () => {
    
    const startsAt = getFutureDate('2023-09-03');
    const endsAt = getFutureDate('2023-09-02');

    expect(() => {
        return new Appointment({
            customer: "John Doe",
            startsAt,
            endsAt,
        });
    }).toThrow();
    
})

test('cannot create an appointemnt with start date before now', () => {
    
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() - 1);
    endsAt.setDate(endsAt.getDate() + 3);

    expect(() => {
        return new Appointment({
            customer: "John Doe",
            startsAt,
            endsAt,
        });
    }).toThrow();
    
})