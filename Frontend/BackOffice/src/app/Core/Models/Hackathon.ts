import { Team } from "./Team";
export class Hackathon{
    idHackathon: number;
    nom: string;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    dateCreation: Date;
    nbrMaxEquipe: number;
    thematique: string;
    equipes: Team[];
}