package Backend.services.classes;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.hackathonRepository;
import Backend.DAO.entities.Hackathon;
import Backend.services.interfaces.IHackathonService;


@Service
@Transactional
public class hackathonService implements IHackathonService{

	@Autowired
	hackathonRepository hackathonRep;

	@Override
	public List<Hackathon> getAll() {
		return hackathonRep.findAll();
	}

	@Override
	public Hackathon getHackathonById(Integer id) {
		return hackathonRep.findById(id).get();
	}

	@Override
	public Hackathon addHackathon(Hackathon h) {
		return hackathonRep.save(h);
	}

	@Override
	public Hackathon updateHackathon(Hackathon h) {
		return hackathonRep.save(h);
	}

	@Override
	public void deleteHackathon(Integer id) {
		hackathonRep.deleteById(id);
	}
	
}
