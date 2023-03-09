package Backend.services.classes;

import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.User;
import org.springframework.beans.factory.annotation.Autowired;

import Backend.DAO.Repositories.equipeRepository;
import Backend.DAO.Repositories.userRepository;
import Backend.services.interfaces.IEquipeService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class equipeService implements IEquipeService{

	@Autowired
	equipeRepository equipeRep;

	@Autowired
	userRepository userRep;


	@Override
	public Equipe getEquipeByLeader(User user) {
		Optional<User> userObject = userRep.getByEmail(user.getEmail());
		if(userObject !=null){
			Optional<Equipe> equipeObject =  equipeRep.getEquipeByLeader(userObject.get());
			if(equipeObject != null)
				return equipeObject.get();
			else
				return null;
		}
		else {
			System.out.println("problem in the getEquipeByLeader user not found !!");
			return null;
		}
	}
}
