import { Equipe } from "./Equipe";
import { Je } from "./Je";
import { Reservation } from "./Reservation";


export class User {
    id!: number;
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
    je!:Je;
}