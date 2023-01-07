package Backend.services.classes;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.userRepository;
import Backend.services.interfaces.IUserService;


@Service
@Transactional
public class userService implements IUserService{

	@Autowired
	userRepository userRep;
}
