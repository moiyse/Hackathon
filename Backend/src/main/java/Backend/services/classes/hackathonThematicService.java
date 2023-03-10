package Backend.services.classes;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.hackathonThematicRepository;
import Backend.DAO.entities.hackathonThematic;
import Backend.services.interfaces.IHackathonThematicService;

@Service
@Transactional
public class hackathonThematicService implements IHackathonThematicService{

	@Autowired
	hackathonThematicRepository hackathonThematicRep;

	@Override
	public List<hackathonThematic> getAll() {
		return hackathonThematicRep.findAll();
	}

	@Override
	public hackathonThematic getHackathonThematicById(int id) {
		return hackathonThematicRep.findById(id).get();
	}

	@Override
	public hackathonThematic addHackathonThematic(hackathonThematic w) {
		return hackathonThematicRep.save(w);
	}

	@Override
	public hackathonThematic updateHackathonThematic(hackathonThematic w) {
		return hackathonThematicRep.save(w);
	}

	@Override
	public void deleteHackathonThematic(int id) {
		hackathonThematicRep.deleteById(id);
	}
	
}