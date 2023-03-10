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

import Backend.DAO.entities.Hackathon;
import Backend.services.interfaces.IHackathonService;

@RestController
@RequestMapping("/hackathons")
@CrossOrigin(origins = "http://localhost:4200")
public class hackathonsController {

	@Autowired(required=false)
	IHackathonService IHackathon;
	
	
	@GetMapping("/Get")
	public List<Hackathon> GetAll() {
		return IHackathon.getAll();
	}

	@GetMapping("/Get/{id}")
	public Hackathon Get(@PathVariable Integer id) {
		return IHackathon.getHackathonById(id);
	}

	@PostMapping("/Post")
	public Hackathon Post(@RequestBody Hackathon e) {
		return IHackathon.addHackathon(e);
	}

	@PutMapping("/Update")
	public Hackathon Update(@RequestBody Hackathon e) {
		return IHackathon.updateHackathon(e);
	}

	@DeleteMapping("/Delete/{id}")
	public void Delete(@PathVariable Integer id) {
		IHackathon.deleteHackathon(id);
		
	}
	
}
