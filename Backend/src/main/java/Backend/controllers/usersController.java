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
	
	@PutMapping("/user/affectUserToTeamOnInvivationAcceptation/{idEquipe}")
	public void affectUserToTeamOnInvivationAcceptation(@RequestBody User user,@PathVariable("idEquipe") int idEquipe){
		System.out.println("id_user"+user.getIdUser());
		System.out.println("id_equipe "+idEquipe);
		IUser.affectUserToTeamOnInvivationAcceptation(user,idEquipe);
	}
}
