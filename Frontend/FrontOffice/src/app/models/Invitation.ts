import { Equipe } from "./Equipe";
import { User } from "./User";


export class Invitation {

    idInvitation!:number;
    opened!:Boolean;
    accepted!:Boolean;
    dateEnvoi!:Date;
    sender!:User;
    receiver!:User;
    equipe!:Equipe;


}