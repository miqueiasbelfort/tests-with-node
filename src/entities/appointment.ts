export interface AppointmentProps {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

export class Appointment {
    
   private props: AppointmentProps;

   get Customer() {
    return this.props.customer;
   }

   get StartsAt() {
    return this.props.startsAt;
   }

   get EndsAt() {
    return this.props.endsAt;
   }

   constructor(props: AppointmentProps){

        const {startsAt, endsAt} = props;

        if(startsAt <= new Date()){
            throw new Error("Invalid start Date");
        }

        if(endsAt <= startsAt){
            throw new Error("Invalid end Date");
        }

        this.props = props;
   }

}