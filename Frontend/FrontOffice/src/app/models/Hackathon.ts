import { Equipe } from "./Equipe"
import { Thematique } from "./Thematique"

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
	thematic!:Thematique

}