package Backend.services.classes;

import java.util.List;
import javax.transaction.Transactional;
import Backend.DAO.entities.Partner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import Backend.DAO.Repositories.partnerRepository;
import Backend.services.interfaces.IPartnerService;


@Service
@Transactional
public class partnerService implements IPartnerService{

	@Autowired
	partnerRepository partnerRep;

	@Override
	public List<Partner> getAll() {
		return partnerRep.findAll();
	}

	@Override
	public Partner getPartnerById(Integer id) {
		return partnerRep.findById(id).get();
	}

	@Override
	public Partner addPartner(Partner e) {
		return partnerRep.save(e);
	}

	@Override
	public Partner updatePartner(Partner e) {
		return partnerRep.save(e);
	}

	@Override
	public void deletePartner(Integer id) {
		partnerRep.deleteById(id);
	}

}



