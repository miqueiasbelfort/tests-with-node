import {describe, expect, it} from 'vitest';
import { CreateAppointement } from './create-appointement';
import { Appointment } from '../entities/appointment';
import {getFutureDate} from '../tests/utils/get-future-date';
import { InMemoryAppointmentRepository } from '../repositories/in-memory/in-memory-repository';

describe('Create Appointment', () => { 
    it('Should be able to create a appointment', () => {
        
        const appointementRepository = new InMemoryAppointmentRepository();
        const createAppointment = new CreateAppointement(appointementRepository);
        
        const startsAt = getFutureDate('2023-09-03');
        const endsAt = getFutureDate('2023-09-04');
        
        expect(createAppointment.execute({
            customer: 'Jhon Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment);

    })

    it('Should not be able to create an appointment with overlapping dates', async () => {
        
        const appointementRepository = new InMemoryAppointmentRepository();
        const createAppointment = new CreateAppointement(appointementRepository);
        
        const startsAt = getFutureDate('2023-09-10');
        const endsAt = getFutureDate('2023-09-15');
        
        await createAppointment.execute({
            customer: 'Jhon Doe',
            startsAt,
            endsAt
        })

        expect(createAppointment.execute({
            customer: 'Jhon Doe',
            startsAt : getFutureDate('2023-09-14'),
            endsAt: getFutureDate('2023-09-18')
        })).rejects.toBeInstanceOf(Error);

        expect(createAppointment.execute({
            customer: 'Jhon Doe',
            startsAt : getFutureDate('2023-09-08'),
            endsAt: getFutureDate('2023-09-12')
        })).rejects.toBeInstanceOf(Error);

        expect(createAppointment.execute({
            customer: 'Jhon Doe',
            startsAt : getFutureDate('2023-09-08'),
            endsAt: getFutureDate('2023-09-17')
        })).rejects.toBeInstanceOf(Error);

        expect(createAppointment.execute({
            customer: 'Jhon Doe',
            startsAt : getFutureDate('2023-09-11'),
            endsAt: getFutureDate('2023-09-12')
        })).rejects.toBeInstanceOf(Error);

    })
})