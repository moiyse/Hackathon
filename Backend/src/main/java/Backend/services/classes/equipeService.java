package Backend.services.classes;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.equipeRepository;
import Backend.DAO.entities.Equipe;
import Backend.services.interfaces.IEquipeService;

@Service
@Transactional
public class equipeService implements IEquipeService{

	@Autowired
	equipeRepository equipeRep;

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



