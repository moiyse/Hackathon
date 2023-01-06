package Backend.services.classes;

import org.springframework.beans.factory.annotation.Autowired;

import Backend.DAO.Repositories.hackathonRepository;
import Backend.services.interfaces.IHackathonService;

public class hackathonService implements IHackathonService{

	@Autowired
	hackathonRepository hackathonRep;
	
}
