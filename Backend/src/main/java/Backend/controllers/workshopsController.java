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

import Backend.DAO.entities.Workshop;
import Backend.services.interfaces.IWorkshopService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/workshops")
public class workshopsController {

	@Autowired(required=false)
	IWorkshopService IWorkshop;
	
	@GetMapping("/Get")
	public List<Workshop> GetAll() {
		return IWorkshop.getAll();
	}

	@GetMapping("/Get/{id}")
	public Workshop Get(@PathVariable int id) {
		return IWorkshop.getWorkshopById(id);
	}

	@PostMapping("/Post")
	public Workshop Post(@RequestBody Workshop e) {
		return IWorkshop.addWorkshop(e);
	}

	@PutMapping("/Update")
	public Workshop Update(@RequestBody Workshop e) {
		return IWorkshop.updateWorkshop(e);
	}

	@DeleteMapping("/Delete/{id}")
	public void Delete(@PathVariable int id) {
		IWorkshop.deleteWorkshop(id);
		
	}
	
}
