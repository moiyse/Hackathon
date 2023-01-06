package Backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.services.interfaces.IUserService;

@RestController
@RequestMapping("/Users")
public class usersController {

	@Autowired(required=false)
	IUserService IUser;
	
	
}
