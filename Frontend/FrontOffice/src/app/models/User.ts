import { Equipe } from "./Equipe";
import { Invitation } from "./Invitation";
import { Je } from "./Je";
import { Reservation } from "./Reservation";


export class User {
    idUser!: number;
    nom!: String;
    prenom!: String;
    email!: String;
    password!:String;
    etablissement!:String;
    imagePath!:String;
    cin!:String;
    role!: String;
    dateInscription!: String;
    equipe!:Equipe
    reservations!:Reservation[];
    invitationSent!:Invitation[];
    invitationReceived!:Invitation[];
    je!:Je;
}