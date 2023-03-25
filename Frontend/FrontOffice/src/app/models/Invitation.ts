import { Equipe } from "./Equipe";
import { User } from "./User";


export class Invitation {

    idInvitation!:number;
    dateEnvoi!:Date;
    status!:String;
    sender!:User;
    receiver!:User;
    equipe!:Equipe;


}