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

import Backend.DAO.entities.Sponsor;
import Backend.services.interfaces.ISponsorService;

@RestController
@RequestMapping("oauth/sponsors")
@CrossOrigin(origins = {"http://localhost:4200" , "http://localhost:4201", "http://localhost:3000"})
public class sponsorsController {

	@Autowired(required=false)
	ISponsorService ISponsor;
	
	
	@GetMapping("/Get")
	public List<Sponsor> GetAll() {
		return ISponsor.getAll();
	}

	@GetMapping("/Get/{id}")
	public Sponsor Get(@PathVariable Integer id) {
		return ISponsor.getSponsorById(id);
	}

	@PostMapping("/Post")
	public Sponsor Post(@RequestBody Sponsor e) {
		return ISponsor.addSponsor(e);
	}

	@PutMapping("/Update")
	public Sponsor Update(@RequestBody Sponsor e) {
		return ISponsor.updateSponsor(e);
	}

	@DeleteMapping("/Delete/{id}")
	public void Delete(@PathVariable Integer id) {
		ISponsor.deleteSponsor(id);
		
	}
	
}
