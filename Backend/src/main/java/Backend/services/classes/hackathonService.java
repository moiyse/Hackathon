package Backend.services.classes;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

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

	@Override
	public Hackathon findCommingHackathon() {
		LocalDateTime now = LocalDateTime.now();
		List<Hackathon> hackathons = hackathonRep.findAll();
		hackathons = hackathons.stream()
				.filter(h -> h.getDateDebut().isAfter(now))
				.sorted(Comparator.comparing(Hackathon::getDateDebut))
				.collect(Collectors.toList());
		System.out.println("hackathons found : "+hackathons);
		return hackathons.get(0);
	}

}
