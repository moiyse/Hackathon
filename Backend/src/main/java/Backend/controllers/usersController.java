package Backend.controllers;

import Backend.DAO.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import Backend.services.interfaces.IUserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class usersController {

	@Autowired(required=false)
	IUserService IUser;



	@GetMapping("/getUserByEmail/{email}")
	public User getUserByEmail(@PathVariable("email") String email ){
		return this.IUser.getUserByEmail(email);
	}
	
	
}
