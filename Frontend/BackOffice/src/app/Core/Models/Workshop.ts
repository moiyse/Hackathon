import { Reservation } from "./Reservation";

export class Workshop{
    idWorkshop: number;
    nom: string;
    dateDebut: Date;
    dateFin: Date;
    dateCreation: Date;
    thematique: string; 
    nbrMaxParticipants: number;
    reservations: Reservation[];
}