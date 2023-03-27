import { Reservation } from "./Reservation";
import { WorkshopThematic } from "./WorkshopThematic";

export class Workshop{
    idWorkshop: number;
    nom: string;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
    thematic: WorkshopThematic; 
    nbrMaxParticipants: number;
    reservations: Reservation[];
}