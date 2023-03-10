package Backend.services.classes;

import java.util.List;

import javax.transaction.Transactional;



import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.equipeRepository;
import Backend.DAO.Repositories.userRepository;
import Backend.services.interfaces.IEquipeService;

import java.util.Optional;


@Service
@Transactional
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

	@Override
	public List<Equipe> getAll() {
		return equipeRep.findAll();
	}

	@Override
	public Equipe getEquipeById(Integer id) {
		return equipeRep.findById(id).get();
	}

	@Override
	public Equipe addEquipe(Equipe e) {
		return equipeRep.save(e);
	}

	@Override
	public Equipe updateEquipe(Equipe e) {
		return equipeRep.save(e);
	}

	@Override
	public void deleteEquipe(Integer id) {
		equipeRep.deleteById(id);
	}
	

}



