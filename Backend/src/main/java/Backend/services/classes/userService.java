package Backend.services.classes;

import org.springframework.beans.factory.annotation.Autowired;

import Backend.DAO.Repositories.userRepository;
import Backend.services.interfaces.IUserService;

public class userService implements IUserService{

	@Autowired
	userRepository userRep;
}
