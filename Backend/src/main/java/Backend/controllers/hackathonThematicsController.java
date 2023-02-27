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

import Backend.DAO.entities.hackathonThematic;
import Backend.services.interfaces.IHackathonThematicService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/hackathonThematics")
public class hackathonThematicsController {

	@Autowired(required=false)
	IHackathonThematicService IhackathonThematic;
	
	@GetMapping("/Get")
	public List<hackathonThematic> GetAll() {
		return IhackathonThematic.getAll();
	}

	@GetMapping("/Get/{id}")
	public hackathonThematic Get(@PathVariable int id) {
		return IhackathonThematic.getHackathonThematicById(id);
	}

	@PostMapping("/Post")
	public hackathonThematic Post(@RequestBody hackathonThematic u) {
		return IhackathonThematic.addHackathonThematic(u);
	}

	@PutMapping("/Update")
	public hackathonThematic Update(@RequestBody hackathonThematic u) {
		return IhackathonThematic.updateHackathonThematic(u);
	}

	@DeleteMapping("/Delete/{id}")
	public void Delete(@PathVariable int id) {
		IhackathonThematic.deleteHackathonThematic(id);
		
	}
	
}