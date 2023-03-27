package Backend.services.classes;

import java.util.List;
import javax.transaction.Transactional;
import Backend.DAO.entities.Sponsor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import Backend.DAO.Repositories.sponsorRepository;
import Backend.services.interfaces.ISponsorService;


@Service
@Transactional
public class sponsorService implements ISponsorService{

	@Autowired
	sponsorRepository sponsorRep;

	@Override
	public List<Sponsor> getAll() {
		return sponsorRep.findAll();
	}

	@Override
	public Sponsor getSponsorById(Integer id) {
		return sponsorRep.findById(id).get();
	}

	@Override
	public Sponsor addSponsor(Sponsor e) {
		return sponsorRep.save(e);
	}

	@Override
	public Sponsor updateSponsor(Sponsor e) {
		return sponsorRep.save(e);
	}

	@Override
	public void deleteSponsor(Integer id) {
		sponsorRep.deleteById(id);
	}

}



