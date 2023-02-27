package Backend.controllers;

import Backend.DAO.entities.User;
import Backend.DAO.entities.Workshop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.services.interfaces.IWorkshopService;

import java.util.List;

@RestController
@RequestMapping("/workshops")
public class workshopsController {

	@Autowired(required=false)
	IWorkshopService IWorkshop;

	@GetMapping("/reservedWorkshops/{idUser}")
	public List<Workshop> listReservedWorkshops(@PathVariable("idUser") int idUser){
		return IWorkshop.listReservedWorkshops(idUser);
	}
	
	
	
}
