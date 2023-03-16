package Backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import Backend.DAO.entities.Workshop;
import Backend.services.interfaces.IWorkshopService;


@RestController
@RequestMapping("oauth/workshops")
@CrossOrigin(origins = {"http://localhost:4200" , "http://localhost:4201"})
public class workshopsController {

	@Autowired(required=false)
	IWorkshopService IWorkshop;

	@GetMapping("/reservedWorkshops/{idUser}")
	public List<Workshop> listReservedWorkshops(@PathVariable("idUser") int idUser){
		return IWorkshop.listReservedWorkshops(idUser);
	}
	
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
