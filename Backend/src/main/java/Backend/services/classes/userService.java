package Backend.services.classes;

import java.util.List;

import javax.transaction.Transactional;



import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.userRepository;
import Backend.DAO.Repositories.equipeRepository;
import Backend.services.interfaces.IUserService;

import java.util.Optional;


@Service
@Transactional
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
