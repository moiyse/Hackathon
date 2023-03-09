package Backend.controllers;

import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import Backend.services.interfaces.IEquipeService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class equipesController {

	@Autowired(required=false)
	IEquipeService IEquipe;

	@PostMapping("/equipe/getEquipeByLeader")
	public Equipe getEquipeByLeader(@RequestBody User user){
		return IEquipe.getEquipeByLeader(user);
	}
	
	
}
