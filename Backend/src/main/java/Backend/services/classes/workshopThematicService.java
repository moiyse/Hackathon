package Backend.services.classes;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.workshopThematicRepository;
import Backend.DAO.entities.workshopThematic;
import Backend.services.interfaces.IWorkshopThematicService;

@Service
@Transactional
public class workshopThematicService implements IWorkshopThematicService{

	@Autowired
	workshopThematicRepository WorkshopThematicRep;

	@Override
	public List<workshopThematic> getAll() {
		return WorkshopThematicRep.findAll();
	}

	@Override
	public workshopThematic getWorkshopThematicById(int id) {
		return WorkshopThematicRep.findById(id).get();
	}

	@Override
	public workshopThematic addWorkshopThematic(workshopThematic w) {
		return WorkshopThematicRep.save(w);
	}

	@Override
	public workshopThematic updateWorkshopThematic(workshopThematic w) {
		return WorkshopThematicRep.save(w);
	}

	@Override
	public void deleteWorkshopThematic(int id) {
		WorkshopThematicRep.deleteById(id);
	}
	
}