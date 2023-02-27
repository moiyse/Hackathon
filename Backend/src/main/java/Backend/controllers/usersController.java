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

import Backend.DAO.entities.User;
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
	
}
