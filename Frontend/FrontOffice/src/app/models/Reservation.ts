import { User } from "./User";
import { Workshop } from "./Workshop";

export class Reservation{
    idReservation: number;
    dateReservation: Date;
    user: User;
    workshop: Workshop;
}