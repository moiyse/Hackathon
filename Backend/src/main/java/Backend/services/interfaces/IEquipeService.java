package Backend.services.interfaces;

import java.util.List;

import Backend.DAO.entities.Equipe;

public interface IEquipeService {

	public List<Equipe> getAll();
	public Equipe getEquipeById(Integer id);
	public Equipe addEquipe(Equipe e);
	public Equipe updateEquipe(Equipe e);
	public void deleteEquipe(Integer id);
	
}
