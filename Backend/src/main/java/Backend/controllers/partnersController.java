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

import Backend.DAO.entities.Partner;
import Backend.services.interfaces.IPartnerService;

@RestController
@RequestMapping("oauth/partners")
@CrossOrigin(origins = {"http://localhost:4200" , "http://localhost:4201", "http://localhost:3000"})
public class partnersController {

	@Autowired(required=false)
	IPartnerService IPartner;
	
	
	@GetMapping("/Get")
	public List<Partner> GetAll() {
		return IPartner.getAll();
	}

	@GetMapping("/Get/{id}")
	public Partner Get(@PathVariable Integer id) {
		return IPartner.getPartnerById(id);
	}

	@PostMapping("/Post")
	public Partner Post(@RequestBody Partner e) {
		return IPartner.addPartner(e);
	}

	@PutMapping("/Update")
	public Partner Update(@RequestBody Partner e) {
		return IPartner.updatePartner(e);
	}

	@DeleteMapping("/Delete/{id}")
	public void Delete(@PathVariable Integer id) {
		IPartner.deletePartner(id);
		
	}
	
}
