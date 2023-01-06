import { Hackathon } from "./Hackathon";
import { User } from "./User";

export class Team{
    idEquipe: number;
    nom: string;
    dateCreation: Date;
    hackathon: Hackathon;
    membres: User[];
}