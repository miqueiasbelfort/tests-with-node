import {areIntervalsOverlapping} from 'date-fns';
import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../appointment-repository";

export class InMemoryAppointmentRepository implements AppointmentsRepository {
    
    public itens: Appointment[] = [];
    
    async create(Appointment: Appointment): Promise<void> {
        this.itens.push(Appointment);
    }

    async findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
        const overlappingAppointment = this.itens.find(appointment => {
            return areIntervalsOverlapping(
                {start: startsAt, end: endsAt},
                {start: appointment.StartsAt, end: appointment.EndsAt},
                {inclusive: true}
            );
        })
        if(!overlappingAppointment){
            return null;
        }
        return overlappingAppointment;
    }
}