import { Reservation } from "./Reservation";
import { Team } from "./Team";

export class User{
    idUser: number;
    nom: string;
    prenom: string;
    CIN: string;
    num_phone: number;
    email: string;
    password: string;
    etablissement: string;
    Role: string;
    dateInscription: Date;
    imagePath: string;
    reservations: Reservation[];
    equipe: Team;
}