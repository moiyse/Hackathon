package Backend.services.classes;

import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.User;
import org.springframework.beans.factory.annotation.Autowired;

import Backend.DAO.Repositories.userRepository;
import Backend.DAO.Repositories.equipeRepository;
import Backend.services.interfaces.IUserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class userService implements IUserService{

	@Autowired
	userRepository userRep;

	@Autowired
	equipeRepository equipeRep;

	public User getUserByEmail(String email){
		Optional<User> user = userRep.getByEmail(email);
		if(user !=null)
		{
			return user.get();
		}
		else
		return null;
	}


	@Override
	public void affectUserToTeamOnInvivationAcceptation(User user, int id_equipe) {
		Optional<Equipe> equipe = equipeRep.findById(id_equipe);
		Optional<User> userObject = userRep.findById(user.getIdUser());
		if (equipe != null && userObject != null) {
			userObject.get().setEquipe(equipe.get());
			userRep.save(userObject.get());
		}else
			System.out.println("Error of null pointer excepetion in affectUserToTeamOnInvivationAcceptation methode");
	}

}
