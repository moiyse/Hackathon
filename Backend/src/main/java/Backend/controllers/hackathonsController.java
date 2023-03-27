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
//@RequestMapping("oauth/hackathons")
@CrossOrigin(origins = {"http://localhost:4200" , "http://localhost:4201"})
public class hackathonsController {

	@Autowired(required=false)
	IHackathonService IHackathon;
	
	
	@GetMapping("/hackathons/Get")
	public List<Hackathon> GetAll() {
		return IHackathon.getAll();
	}

	@GetMapping("/hackathons/Get/{id}")
	public Hackathon Get(@PathVariable Integer id) {
		return IHackathon.getHackathonById(id);
	}

	@PostMapping("/hackathons/Post")
	public Hackathon Post(@RequestBody Hackathon e) {
		return IHackathon.addHackathon(e);
	}

	@PutMapping("/hackathons/Update")
	public Hackathon Update(@RequestBody Hackathon e) {
		return IHackathon.updateHackathon(e);
	}

	@DeleteMapping("/hackathons/Delete/{id}")
	public void Delete(@PathVariable Integer id) {
		IHackathon.deleteHackathon(id);
		
	}

	@GetMapping("/hackathons/findCommingHackathon")
	public Hackathon findCommingHackathon(){
		return IHackathon.findCommingHackathon();
	}
	
}
