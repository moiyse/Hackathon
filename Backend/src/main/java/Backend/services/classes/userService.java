package Backend.services.classes;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.userRepository;
import Backend.DAO.entities.User;
import Backend.services.interfaces.IUserService;


@Service
@Transactional
public class userService implements IUserService{

	@Autowired
	userRepository userRep;

	@Override
	public List<User> getAll() {
		return userRep.findAll();
	}

	@Override
	public User getUserById(int id) {
		return userRep.findById(id).get();
	}

	@Override
	public User addUser(User e) {
		return userRep.save(e);
	}

	@Override
	public User updateUser(User e) {
		return userRep.save(e);
	}

	@Override
	public void deleteUser(int id) {
		userRep.deleteById(id);
		
	}
}
