import { Equipe } from "./Equipe"
import { HackathonThematic } from "./HackathonThematic"

export class Hackathon {
    idHackathon!:number
	nom!:String
	description!:String
	nbrMaxEquipe!:number
	dateDebut!:Date
	dateFin!:Date
    createdAt!:Date
	updatedAt!:Date
	equipes!:Equipe[]
	thematic!:HackathonThematic

}