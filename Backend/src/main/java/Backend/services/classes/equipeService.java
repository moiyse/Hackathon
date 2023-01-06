package Backend.services.classes;

import org.springframework.beans.factory.annotation.Autowired;

import Backend.DAO.Repositories.equipeRepository;
import Backend.services.interfaces.IEquipeService;

public class equipeService implements IEquipeService{

	@Autowired
	equipeRepository equipeRep;
}
