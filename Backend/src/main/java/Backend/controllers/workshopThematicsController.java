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

import Backend.DAO.entities.workshopThematic;
import Backend.services.interfaces.IWorkshopThematicService;

@CrossOrigin(origins = {"http://localhost:4200" , "http://localhost:4201"})
@RestController
@RequestMapping("oauth/workshopThematics")
public class workshopThematicsController {

	@Autowired(required=false)
	IWorkshopThematicService IWorkshopThematic;
	
	@GetMapping("/Get")
	public List<workshopThematic> GetAll() {
		return IWorkshopThematic.getAll();
	}

	@GetMapping("/Get/{id}")
	public workshopThematic Get(@PathVariable int id) {
		return IWorkshopThematic.getWorkshopThematicById(id);
	}

	@PostMapping("/Post")
	public workshopThematic Post(@RequestBody workshopThematic u) {
		return IWorkshopThematic.addWorkshopThematic(u);
	}

	@PutMapping("/Update")
	public workshopThematic Update(@RequestBody workshopThematic u) {
		return IWorkshopThematic.updateWorkshopThematic(u);
	}

	@DeleteMapping("/Delete/{id}")
	public void Delete(@PathVariable int id) {
		IWorkshopThematic.deleteWorkshopThematic(id);
		
	}
	
}