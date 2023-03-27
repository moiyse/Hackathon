import { Team } from "./Team";
import { HackathonThematic } from "./HackathonThematic";

export class Hackathon{
    idHackathon: number;
    nom: string;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
    nbrMaxEquipe: number;
    thematic: HackathonThematic;
    equipes: Team[];
}