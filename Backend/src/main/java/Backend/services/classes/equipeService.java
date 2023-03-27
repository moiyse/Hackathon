package Backend.services.classes;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;



import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.Hackathon;
import Backend.DAO.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.equipeRepository;
import Backend.DAO.Repositories.hackathonRepository;
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

	@Autowired
	hackathonRepository hackathonRep;


	@Override
	public Boolean getEquipeByLeader(User user) {
		Optional<User> userObject = userRep.getByEmail(user.getEmail());
		if(userObject.isPresent()){
			int leaderCheck =  equipeRep.getEquipeByLeader(userObject.get());
			if(leaderCheck > 0)
				return true;
			else
				return false;
		}
		else {
			System.out.println("problem in the getEquipeByLeader user not found !!");
			return false;
		}
	}

    @Override
    public Equipe getEquipeByUser(User user) {
        Optional<User> userObject = userRep.findById(user.getIdUser());
        if(userObject !=null && userObject.get().getEquipe() != null){
            Optional<Equipe> equipeObject = equipeRep.findById(userObject.get().getEquipe().getIdEquipe());
            if(equipeObject !=null ) {
                return equipeObject.get();
            }
            else{
                return null;}
        }
        return null;
    }

	@Override
	public Equipe createEquipêOfHackathon(User user, String equipeName, int idHackathon) {
		Equipe equipe = new Equipe();
		Optional<Hackathon> hackathonObject = hackathonRep.findById(idHackathon);
		if(hackathonObject != null){
			equipe.setNom(equipeName);
			equipe.setLeader(user);
			equipe.setIdHackathon(hackathonObject.get().getIdHackathon());
			if (equipe.getMembres() == null) {
				equipe.setMembres(new ArrayList<>());
			}
			equipe.getMembres().add(user);
			Equipe equipeCreated = equipeRep.save(equipe);
			user.setEquipe(equipeCreated);
			userRep.save(user);
			return equipeCreated;
		}

		return null;
	}

	@Override
	public Equipe deleteEquipeWithRemovingUserKey(Integer idEquipe) {
		Optional<Equipe> equipeObject = equipeRep.findById(idEquipe);
		if(equipeObject != null)
		{
			List<User> usersOfEquipe = userRep.getByEquipe(equipeObject.get());
			usersOfEquipe.forEach(member -> {
				member.setEquipe(null);
				userRep.save(member);
			});
			equipeRep.delete(equipeObject.get());
			return equipeObject.get();
		}
		return null;
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



