import { Hackathon } from "./Hackathon";
import { Invitation } from "./Invitation";
import { User } from "./User";

export class Equipe {

    idEquipe!:number;
    nom!:String;
    dateCreation!:Date;
    hackathon!:Hackathon;
    members!:User[];
    invitations!:Invitation[];
    leader!:User;

}