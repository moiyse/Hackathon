package Backend.services.classes;

import java.util.List;


import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.workshopRepository;
import Backend.DAO.entities.Workshop;
import Backend.services.interfaces.IWorkshopService;


@Service
@Transactional
public class workshopService implements IWorkshopService{

	@Autowired
	workshopRepository workshopRep;

	@Override
	public List<Workshop> getAll() {
		return workshopRep.findAll();
	}

	@Override
	public Workshop getWorkshopById(int id) {
		return workshopRep.findById(id).get();
	}

	@Override
	public Workshop addWorkshop(Workshop w) {
		return workshopRep.save(w);
	}

	@Override
	public Workshop updateWorkshop(Workshop w) {
		return workshopRep.save(w);
	}

	@Override
	public void deleteWorkshop(int id) {
		workshopRep.deleteById(id);
	}
	
}
