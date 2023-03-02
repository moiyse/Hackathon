package Backend.services.classes;

import Backend.DAO.entities.User;
import org.springframework.beans.factory.annotation.Autowired;

import Backend.DAO.Repositories.userRepository;
import Backend.services.interfaces.IUserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class userService implements IUserService{

	@Autowired
	userRepository userRep;

	public User getUserByEmail(String email){
		Optional<User> user = userRep.getByEmail(email);
		if(user !=null)
		{
			return user.get();
		}
		else
		return null;
	}

}
