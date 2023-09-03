import { Appointment } from "../entities/appointment"
import { AppointmentsRepository } from "../repositories/appointment-repository";

interface CreateAppointementRequest {
    customer: string,
    startsAt: Date,
    endsAt: Date
}

type CreateAppointementResponse  = Appointment;

export class CreateAppointement {

    constructor(
        private appointmentRepository: AppointmentsRepository
    ){}

    async execute({customer, startsAt, endsAt}: CreateAppointementRequest): Promise<CreateAppointementResponse>{
        
        const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointment(
            startsAt,
            endsAt
        );

        if(overlappingAppointment){
            throw new Error("Another appointment overlaps this appointment dates");
        }

        const appointement = new Appointment({
            customer,
            startsAt,
            endsAt
        });

        await this.appointmentRepository.create(appointement);

        return appointement;
    }
}