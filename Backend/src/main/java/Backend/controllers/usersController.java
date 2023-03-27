package Backend.controllers;

import java.util.List;

import Backend.DAO.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import Backend.services.interfaces.IUserService;

@CrossOrigin(origins = {"http://localhost:4200" , "http://localhost:4201"})
@RestController
//@RequestMapping("oauth/users")
public class usersController {

	@Autowired(required=false)
	IUserService IUser;

	//@GetMapping("/Get")
	@GetMapping("/user/Get")
	public List<User> GetAll() {
		return IUser.getAll();
	}

	//@GetMapping("/Get/{id}")
	@GetMapping("user/Get/{id}")
	public User Get(@PathVariable int id) {
		return IUser.getUserById(id);
	}

	//@PostMapping("/Post")
	@PostMapping("/user/Post")
	public User Post(@RequestBody User u) {
		return IUser.addUser(u);
	}

	//@PutMapping("/Update")
	@PutMapping("/user/Update")
	public User Update(@RequestBody User u) {
		return IUser.updateUser(u);
	}

	//@DeleteMapping("/Delete/{id}")
	@DeleteMapping("/user/Delete/{id}")
	public void Delete(@PathVariable int id) {
		IUser.deleteUser(id);
		
	}

	//@GetMapping("/getUserByEmail/{email}")
	@GetMapping("/getUserByEmail/{email}")
	public User getUserByEmail(@PathVariable("email") String email ){
		return this.IUser.getUserByEmail(email);
	}
	
	//@PutMapping("/user/affectUserToTeamOnInvivationAcceptation/{idEquipe}")
	@PutMapping("/user/affectUserToTeamOnInvivationAcceptation/{idEquipe}")
	public void affectUserToTeamOnInvivationAcceptation(@RequestBody User user,@PathVariable("idEquipe") int idEquipe){
		System.out.println("id_user"+user.getIdUser());
		System.out.println("id_equipe "+idEquipe);
		IUser.affectUserToTeamOnInvivationAcceptation(user,idEquipe);
	}

	
	@GetMapping("/user/getReceiverOfInvitation/{idInvitation}")
	public User getReceiverOfInvitation(@PathVariable("idInvitation") int idInvitation){
		return IUser.getReceiverOfInvitation(idInvitation);
	}

	@GetMapping("/user/getMembersOfEquipe/{idEquipe}")
	public List<User> getMembersOfEquipe(@PathVariable("idEquipe") int idEquipe){
		return IUser.getMembersOfEquipe(idEquipe);
	}

	@GetMapping("/user/getLeaderOfEquipe/{idEquipe}")
	public User getLeaderOfEquipe(@PathVariable("idEquipe") int idEquipe) { return IUser.getLeaderOfEquipe(idEquipe); }

	@PutMapping("/user/leaveTeam")
	public Boolean leaveTeam(@RequestBody User user)
	{
		return IUser.leaveTeam(user);
	}

	@PostMapping("/user/checkSateOfUser/{idEquipe}")
	public Integer checkSateOfUser(@RequestBody User user,@PathVariable("idEquipe") Integer idEquipe){
		System.out.println("value of the service check user : "+IUser.checkSateOfUser(user,idEquipe));
		return IUser.checkSateOfUser(user,idEquipe);
	}
}
