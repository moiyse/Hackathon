package Backend.controllers;

import Backend.DAO.entities.User;
import Backend.DAO.entities.Workshop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import Backend.services.interfaces.IWorkshopService;

import java.util.List;

@RestController
@RequestMapping("/workshops")
@CrossOrigin(origins = "http://localhost:4200")
public class workshopsController {

	@Autowired(required=false)
	IWorkshopService IWorkshop;

	@GetMapping("/reservedWorkshops/{idUser}")
	public List<Workshop> listReservedWorkshops(@PathVariable("idUser") int idUser){
		return IWorkshop.listReservedWorkshops(idUser);
	}
	
	
	
}
