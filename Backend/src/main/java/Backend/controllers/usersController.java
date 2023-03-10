package Backend.controllers;

import java.util.List;

import Backend.DAO.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import Backend.services.interfaces.IUserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/users")
public class usersController {

	@Autowired(required=false)
	IUserService IUser;

	@GetMapping("/Get")
	public List<User> GetAll() {
		return IUser.getAll();
	}

	@GetMapping("/Get/{id}")
	public User Get(@PathVariable int id) {
		return IUser.getUserById(id);
	}

	@PostMapping("/Post")
	public User Post(@RequestBody User u) {
		return IUser.addUser(u);
	}

	@PutMapping("/Update")
	public User Update(@RequestBody User u) {
		return IUser.updateUser(u);
	}

	@DeleteMapping("/Delete/{id}")
	public void Delete(@PathVariable int id) {
		IUser.deleteUser(id);
		
	}


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
