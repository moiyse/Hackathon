package Backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import Backend.services.interfaces.IEquipeService;
import org.springframework.web.bind.annotation.*;
import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.User;


@RestController
@RequestMapping("oauth/teams")
@CrossOrigin(origins = {"http://localhost:4200" , "http://localhost:4201"})
public class equipesController {

	@Autowired(required=false)
	IEquipeService IEquipe;

	@PostMapping("/equipe/getEquipeByLeader")
	public Equipe getEquipeByLeader(@RequestBody User user){
		return IEquipe.getEquipeByLeader(user);
	}
		
	@GetMapping("/Get")
	public List<Equipe> GetAll() {
		return IEquipe.getAll();
	}

	@GetMapping("/Get/{id}")
	public Equipe Get(@PathVariable Integer id) {
		return IEquipe.getEquipeById(id);
	}

	@PostMapping("/Post")
	public Equipe Post(@RequestBody Equipe e) {
		return IEquipe.addEquipe(e);
	}

	@PutMapping("/Update")
	public Equipe Update(@RequestBody Equipe e) {
		return IEquipe.updateEquipe(e);
	}

	@DeleteMapping("/Delete/{id}")
	public void Delete(@PathVariable Integer id) {
		IEquipe.deleteEquipe(id);
		
	}
	
}
