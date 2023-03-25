import { Hackathon } from "./Hackathon";
import { Invitation } from "./Invitation";
import { User } from "./User";

export class Equipe {

    idEquipe!:number;
    nom!:String;
    dateCreation!:Date;
    idHackathon!:number;
    members!:User[];
    invitations!:Invitation[];
    leader!:User;

}