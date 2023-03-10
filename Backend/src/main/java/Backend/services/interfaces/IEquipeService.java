package Backend.services.interfaces;

import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.User;

import java.util.List;

public interface IEquipeService {



    public Equipe getEquipeByLeader(User user);


	public List<Equipe> getAll();
	public Equipe getEquipeById(Integer id);
	public Equipe addEquipe(Equipe e);
	public Equipe updateEquipe(Equipe e);
	public void deleteEquipe(Integer id);
	
}
