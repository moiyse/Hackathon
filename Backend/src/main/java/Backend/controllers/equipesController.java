package Backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.DAO.entities.Equipe;
import Backend.services.interfaces.IEquipeService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/teams")
public class equipesController {

	@Autowired(required=false)
	IEquipeService IEquipe;
		
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
